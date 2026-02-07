import { Badge } from "@/components/ui/badge"
import { UserRole } from "@/db/schema/enums"

const RoleBadge = ({ role = "candidate" }: { role?: UserRole }) => {
   return (
      <Badge variant="outline" className="p-4 text-sm capitalize border-dashed">
         <span>{role}</span>
      </Badge>
   )
}

export default RoleBadge
