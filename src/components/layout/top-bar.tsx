type TopBarProps = {
  title: string;
  subtitle?: string;
  trailing?: React.ReactNode;
};

export function TopBar({ title, subtitle, trailing }: TopBarProps) {
  return (
    <header className="sticky top-0 z-20 border-b border-border/80 bg-card/90 px-4 py-3 backdrop-blur">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {subtitle ?? "Weekly Edition"}
          </p>
          <h1 className="text-base font-semibold text-foreground">{title}</h1>
        </div>
        {trailing}
      </div>
    </header>
  );
}
