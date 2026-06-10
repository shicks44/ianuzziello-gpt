import { DashboardCard } from "@/components/DashboardCard";
import { OperationsShell } from "@/components/operations-shell";
import { operationTools } from "@/lib/operation-tools";

export default function HomePage() {
  return (
    <OperationsShell>
      <main className="mx-auto flex min-h-svh w-full max-w-6xl flex-col px-4 py-8 md:px-8">
        <section className="flex flex-1 flex-col justify-center py-8">
          <p className="text-sm font-medium text-muted-foreground">Workplace Operations Assistant</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-semibold text-foreground md:text-5xl">
            What do you want to draft today?
          </h1>
          <p className="mt-4 max-w-2xl text-sm text-muted-foreground md:text-base">
            Choose a task to open a focused AI chat for site instructions, SRRs, RFIs,
            deficiencies, site reports, code citations, or email drafting.
          </p>

          <section className="mt-8 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {operationTools.map((tool) => (
              <DashboardCard key={tool.href} {...tool} />
            ))}
          </section>
        </section>
      </main>
    </OperationsShell>
  );
}
