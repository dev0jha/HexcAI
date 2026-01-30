interface DashTitleShellProps {
  title: string;
  description: string;
}

export default function DashTitleShell({
  title,
  description,
}: DashTitleShellProps) {
  return (
    <div className="mb-6">
      <h1 className="line-clamp-4 text-xl font-bold text-white">{title}</h1>
      <p className="text-muted-foreground text-md mt-1">{description}</p>
    </div>
  );
}
