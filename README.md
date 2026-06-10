# Workplace Operations AI Assistant

An internal AI-powered engineering operations platform designed to streamline documentation workflows including SRRs, RFIs, deficiency reports, site reports, code citation checks, and professional email generation.

Built with modern web technologies and powered by Gemini Flash for fast, cost-effective AI-assisted document drafting.

---

## Features

### AI Documentation Tools
- SRR Generator
- RFI Generator
- Deficiency Report Generator
- Site Report Generator
- Code Citation Assistant
- Email Draft Generator

### Smart Workflow Design
- Structured form inputs
- Rough-notes-to-professional-language conversion
- Mode-specific AI prompting
- Copy-to-clipboard output
- Loading and error states
- Reusable UI components
- Centralized prompt management

### Engineering-Focused AI Behavior
- Professional construction and engineering tone
- Prevents hallucinated project data
- Requests missing information where necessary
- Supports future integration with Ontario Building Code references
- Designed for human review before submission

---

# Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js App Router |
| Backend | Node.js |
| AI Provider | Gemini Flash API |
| Styling | Tailwind CSS |
| Language | TypeScript |
| Hosting | Vercel-ready |
| Environment | `.env.local` configuration |

---

# Project Structure

```bash
app/
├── api/
│   └── gemini/
│       └── route.ts
├── srr/
├── rfi/
├── deficiency/
├── site-report/
├── code-checker/
├── email/
└── page.tsx

components/
├── DashboardCard.tsx
├── OutputBox.tsx
└── ToolForm.tsx

lib/
└── prompts.ts
```

---

# Getting Started

## 1. Clone the Repository

```bash
git clone <your-repo-url>
cd <project-name>
```

---

## 2. Install Dependencies

```bash
npm install
```

---

## 3. Configure Environment Variables

Create:

```bash
.env.local
```

Add:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

Get a Gemini API key here:

https://aistudio.google.com/app/apikey

---

## 4. Start Development Server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

# AI Architecture

The application uses a mode-based prompting system.

Each page sends a specific mode to the backend API route:

```ts
{
  mode: "srr",
  notes: "...",
  formData: {...}
}
```

The backend selects a dedicated system prompt from:

```text
lib/prompts.ts
```

This keeps each tool specialized and focused.

---

# Example Workflow

```text
User enters rough site notes
→ Gemini processes structured prompt
→ AI generates professional wording
→ User reviews output
→ Copy/export into company workflow
```

---

# Example SRR Input

```text
RTU-2 installed with incorrect duct connection.
Clearance may not meet access requirements.
```

# Example Output

```text
Observation:
RTU-2 ductwork installation does not appear to match the coordinated mechanical drawing set.

Recommended Action:
Contractor to review installation and confirm compliance with approved drawings and required service clearances prior to project closeout.
```

---

# Future Improvements

- PDF upload + OCR
- Ontario Building Code retrieval system
- Vector database for code search
- Drawing review workflows
- Authentication system
- User/project management
- SharePoint integration
- Word/PDF export generation
- AI-assisted drawing markup
- Historical SRR knowledge base

---

# Safety & Review Policy

This platform is designed as:
- an AI drafting assistant
- not a replacement for engineering review

All generated outputs should be reviewed by qualified personnel before submission or issuance.

---

# Development Notes

## Current Focus
- Internal workflow acceleration
- Professional formatting consistency
- Rapid document generation
- Modular AI tool architecture

## Recommended Next Steps
- Add rate limiting
- Add authentication
- Add usage logging
- Add document templates
- Add retrieval-augmented code search

---

