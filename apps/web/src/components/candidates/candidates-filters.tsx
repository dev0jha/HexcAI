import { Filter } from "lucide-react"
import { SearchInputGroup } from "@/components/search/search-input-group"
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select"

interface CandidatesFiltersProps {
   searchQuery: string
   onSearchChange: (value: string) => void
   statusFilter: string
   onStatusChange: (value: string | null) => void
}

export function CandidatesFilters({
   searchQuery,
   onSearchChange,
   statusFilter,
   onStatusChange,
}: CandidatesFiltersProps) {
   return (
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
         <div className="relative flex-1">
            <Filter className="absolute left-3 top-1/2 h-4 w-4 text-muted-foreground" />
            <SearchInputGroup
               placeholder="Search by name or tech stack..."
               value={searchQuery}
               onChange={onSearchChange}
               className="pl-9 w-full sm:max-w-sm"
            />
         </div>
         <Select
            value={statusFilter}
            onValueChange={(value: string | undefined) =>
               value ? onStatusChange(value) : onStatusChange("")
            }
         >
            <SelectTrigger className="w-full sm:w-45">
               <SelectValue />
            </SelectTrigger>
            <SelectContent>
               <SelectItem value="all">All Statuses</SelectItem>
               <SelectItem value="pending">Pending</SelectItem>
               <SelectItem value="interested">Interested</SelectItem>
               <SelectItem value="not-interested">Not Interested</SelectItem>
            </SelectContent>
         </Select>
      </div>
   )
}
