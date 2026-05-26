import { DashboardCard } from '@/components/DashboardCard';

const tools = [
  { href: '/srr', title: 'SRR Generator', description: 'Generate professional Site/Surveillance Report Request wording.' },
  { href: '/rfi', title: 'RFI Generator', description: 'Draft clear Requests for Information for design/construction clarifications.' },
  { href: '/deficiency', title: 'Deficiency Report Generator', description: 'Create structured deficiency reports with corrective recommendations.' },
  { href: '/site-report', title: 'Site Report Generator', description: 'Prepare site visit summaries and next actions.' },
  { href: '/code-checker', title: 'Code Citation Checker', description: 'Validate and format code citation checks from provided references.' },
  { href: '/email', title: 'Email Draft Generator', description: 'Draft professional internal and client-facing emails.' },
];

export default function HomePage() {
  return (
    <main className="mx-auto max-w-6xl space-y-6 p-6">
      <section>
        <h1 className="text-3xl font-bold text-foreground">Workplace Operations Assistant</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          AI-assisted documentation tools for SRRs, RFIs, deficiencies, site reporting, code citations, and email drafting.
        </p>
      </section>
      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <DashboardCard key={tool.href} {...tool} />
        ))}
      </section>
    </main>
  );
}
