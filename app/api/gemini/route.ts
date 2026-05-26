import { type NextRequest, NextResponse } from 'next/server';
import { prompts, validModes, type GeminiMode } from '@/lib/prompts';

interface GeminiRequestBody {
  mode?: string;
  formData?: Record<string, string>;
  notes?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as GeminiRequestBody;

    if (!body.mode || !validModes.includes(body.mode as GeminiMode)) {
      return NextResponse.json({ error: 'Invalid mode.' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Missing GEMINI_API_KEY on server.' }, { status: 500 });
    }

    const mode = body.mode as GeminiMode;
    const prompt = prompts[mode];

    const userInput = JSON.stringify(
      {
        mode,
        formData: body.formData || {},
        notes: body.notes || '',
      },
      null,
      2,
    );

    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ role: 'user', parts: [{ text: `System Instructions:\n${prompt}\n\nUser Input:\n${userInput}` }] }],
          generationConfig: {
            temperature: 0.3,
          },
        }),
      },
    );

    if (!geminiResponse.ok) {
      const errorText = await geminiResponse.text();
      return NextResponse.json(
        { error: `Gemini request failed: ${errorText}` },
        { status: geminiResponse.status },
      );
    }

    const data = await geminiResponse.json();
    const output = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!output) {
      return NextResponse.json({ error: 'No output returned from Gemini.' }, { status: 502 });
    }

    return NextResponse.json({ output });
  } catch {
    return NextResponse.json({ error: 'Invalid request payload.' }, { status: 400 });
  }
}
