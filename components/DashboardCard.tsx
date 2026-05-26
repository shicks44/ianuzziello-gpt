import Link from 'next/link';

interface DashboardCardProps {
  href: string;
  title: string;
  description: string;
}

export function DashboardCard({ href, title, description }: DashboardCardProps) {
  return (
    <Link
      href={href}
      className="block rounded-lg border border-border bg-card p-5 transition hover:bg-accent"
    >
      <h2 className="text-lg font-semibold text-foreground">{title}</h2>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
    </Link>
  );
}
