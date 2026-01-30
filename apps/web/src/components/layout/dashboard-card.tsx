import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function DashboardCard({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Card>) {
  return (
    <Card
      className={cn(
        "relative border-2 border-white/10 bg-[#1a1a1c]/50 p-6 text-white backdrop-blur-md sm:p-8",
        className
      )}
      {...props}
    >
      {children}
    </Card>
  );
}
