import type { LucideIcon } from "lucide-react";
import { ArrowUpRightIcon } from "lucide-react";
import Link from "next/link";

interface DashboardCardProps {
  href: string;
  title: string;
  description: string;
  icon?: LucideIcon;
}

export function DashboardCard({ href, title, description, icon: Icon }: DashboardCardProps) {
  return (
    <Link
      href={href}
      className="group flex min-h-36 flex-col justify-between rounded-lg border border-border bg-card p-4 shadow-[var(--shadow-card)] transition hover:border-foreground/20 hover:bg-accent/70"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex size-9 items-center justify-center rounded-md border border-border bg-background text-muted-foreground">
          {Icon ? <Icon className="size-4" /> : null}
        </div>
        <ArrowUpRightIcon className="size-4 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground" />
      </div>
      <div>
        <h2 className="text-base font-semibold text-foreground">{title}</h2>
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      </div>
    </Link>
  );
}
