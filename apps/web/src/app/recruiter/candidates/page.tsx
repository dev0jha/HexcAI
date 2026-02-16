"use client"

import Link from "next/link"
import { MoreHorizontal, ExternalLink, Mail, Search, Trash2, Filter } from "lucide-react"

import Container from "@/components/core/Container"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from "@/components/ui/table"
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select"
import { SearchInputGroup } from "@/components/search/search-input-group"
import { CadidateStatusFilter, useCandidatesPage } from "@/hooks/screens/candidates.hooks"
import { Candidate } from "@/lib/queries/query.types"

export default function CandidatesPage() {
   const {
      candidates,
      filteredCandidates,
      searchQuery,
      setSearchQuery,
      statusFilter,
      setStatusFilter,
      handleRemove,
   } = useCandidatesPage()

   return (
      <Container className="py-8 max-w-7xl">
         {/* Page Header */}
         <PageHeader candidates={candidates} filteredCandidates={filteredCandidates} />

         {/* Filters Toolbar */}
         <FiltersToolbar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            setStatusFilter={setStatusFilter}
            statusFilter={statusFilter}
         />

         {/* Data Table */}
         <DataTable filteredCandidates={filteredCandidates} onRemove={handleRemove} />
      </Container>
   )
}

function PageHeader({
   candidates,
   filteredCandidates,
}: {
   candidates: Candidate[]
   filteredCandidates: Candidate[]
}) {
   function handleExportCSV() {
      const headers = [
         "Name",
         "Username",
         "Score",
         "Tech Stack",
         "Location",
         "Status",
         "Contacted Date",
      ]
      const csvContent = [
         headers.join(","),
         ...filteredCandidates.map(candidate =>
            [
               candidate.name,
               candidate.username,
               candidate.score,
               `"${candidate.techStack.join("; ")}"`,
               `"${candidate.location}"`,
               candidate.status,
               candidate.contactedDate,
            ].join(",")
         ),
      ].join("\n")

      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
      const link = document.createElement("a")
      const url = URL.createObjectURL(blob)
      link.setAttribute("href", url)
      link.setAttribute("download", `candidates-${new Date().toISOString().split("T")[0]}.csv`)
      link.style.visibility = "hidden"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
   }

   return (
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
         <div>
            <h1 className="text-2xl font-bold tracking-tight">My Candidates</h1>
            <p className="text-muted-foreground text-sm">
               Manage and track {candidates.length} developers you've contacted.
            </p>
         </div>
         <div className="flex items-center gap-2">
            <Button variant="outline" onClick={handleExportCSV}>
               <ExternalLink className="mr-2 h-4 w-4" />
               Export CSV
            </Button>
            <Button render={<Link href="/recruiter/discover" />}>
               <Search className="mr-2 h-4 w-4" />
               Find Talent
            </Button>
         </div>
      </div>
   )
}

function FiltersToolbar({
   searchQuery,
   setSearchQuery,
   statusFilter,
   setStatusFilter,
}: {
   searchQuery: string
   setSearchQuery: (value: string) => void
   statusFilter: CadidateStatusFilter
   setStatusFilter: (value: CadidateStatusFilter) => void
}) {
   return (
      <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-between">
         <SearchInputGroup
            placeholder="Search candidates..."
            value={searchQuery}
            onChange={setSearchQuery}
            className="py-5 rounded-lg px-3 w-full sm:max-w-4xl"
         />
         <Select value={statusFilter} onValueChange={value => value && setStatusFilter(value)}>
            <SelectTrigger className="w-full sm:w-45">
               <Filter className="mr-2 h-4 w-4 text-muted-foreground" />
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

function DataTable({
   filteredCandidates,
   onRemove,
}: {
   filteredCandidates: Candidate[]
   onRemove: (id: string) => void
}) {
   return (
      <div className="border rounded-md shadow-sm bg-neutral-900/80">
         <Table>
            <TableHeader>
               <TableRow className="bg-neutral-900/50 text-xs">
                  <TableHead className="w-75 uppercase font-bold">Candidate</TableHead>
                  <TableHead className="uppercase font-bold">Score</TableHead>
                  <TableHead className="uppercase font-bold">Status</TableHead>
                  <TableHead className="hidden md:table-cell uppercase font-bold">
                     Tech Stack
                  </TableHead>
                  <TableHead className="hidden md:table-cell uppercase font-bold">
                     Location
                  </TableHead>
                  <TableHead className="text-right uppercase font-bold">Actions</TableHead>
               </TableRow>
            </TableHeader>

            <TableBody>
               {filteredCandidates.length > 0 ? (
                  filteredCandidates.map(candidate => (
                     <TableRow key={candidate.id}>
                        {/* Candidate Name & Avatar */}
                        <TableCell>
                           <div className="flex items-center gap-3">
                              <Avatar className="h-9 w-9 border">
                                 <AvatarImage src={candidate.avatar!} alt={candidate.name} />
                                 <AvatarFallback>
                                    {candidate.name.substring(0, 2).toUpperCase()}
                                 </AvatarFallback>
                              </Avatar>
                              <div className="flex flex-col">
                                 <span className="font-medium text-sm text-foreground">
                                    {candidate.name}
                                 </span>
                                 <span className="text-xs text-muted-foreground">
                                    @{candidate.username}
                                 </span>
                              </div>
                           </div>
                        </TableCell>

                        {/* Score */}
                        <TableCell>
                           <div
                              className={`font-semibold text-sm ${
                                 candidate.score >= 90
                                    ? "text-emerald-600"
                                    : candidate.score >= 80
                                      ? "text-amber-600"
                                      : "text-muted-foreground"
                              }`}
                           >
                              {candidate.score}
                           </div>
                        </TableCell>

                        {/* Status */}
                        <TableCell>{getStatusBadge(candidate.status)}</TableCell>

                        {/* Tech Stack (Truncated) */}
                        <TableCell className="hidden md:table-cell max-w-50">
                           <div className="flex flex-wrap gap-1">
                              {candidate.techStack.slice(0, 2).map(tech => (
                                 <Badge
                                    key={tech}
                                    variant="secondary"
                                    className="px-1.5 py-0 text-[10px] font-normal"
                                 >
                                    {tech}
                                 </Badge>
                              ))}
                              {candidate.techStack.length > 2 && (
                                 <span className="text-xs text-muted-foreground pl-1">
                                    +{candidate.techStack.length - 2}
                                 </span>
                              )}
                           </div>
                        </TableCell>

                        {/* Location & Date */}
                        <TableCell className="hidden md:table-cell">
                           <div className="flex flex-col">
                              <span className="text-sm text-foreground">{candidate.location}</span>
                              <span className="text-xs text-muted-foreground">
                                 {new Date(candidate.contactedDate!).toLocaleDateString()}
                              </span>
                           </div>
                        </TableCell>

                        {/* Actions Dropdown */}
                        <TableCell className="text-right">
                           <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                 <Button variant="ghost" className="h-8 w-8 p-0">
                                    <span className="sr-only">Open menu</span>
                                    <MoreHorizontal className="h-4 w-4" />
                                 </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                 <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                 <Link href={`/profile/${candidate.name}`}>
                                    <DropdownMenuItem>
                                       <ExternalLink className="mr-2 h-4 w-4" />
                                       View Profile
                                    </DropdownMenuItem>
                                 </Link>
                                 <DropdownMenuItem>
                                    <Mail className="mr-2 h-4 w-4" />
                                    Message
                                 </DropdownMenuItem>
                                 <DropdownMenuSeparator />
                                 <DropdownMenuItem
                                    onClick={() => onRemove(candidate.id)}
                                    className="text-destructive focus:text-destructive"
                                 >
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Remove Candidate
                                 </DropdownMenuItem>
                              </DropdownMenuContent>
                           </DropdownMenu>
                        </TableCell>
                     </TableRow>
                  ))
               ) : (
                  <TableRow>
                     <TableCell colSpan={6} className="h-24 text-center">
                        No results found.
                     </TableCell>
                  </TableRow>
               )}
            </TableBody>
         </Table>
      </div>
   )
}

const getStatusBadge = (status: string) => {
   switch (status) {
      case "interested":
         return (
            <Badge className="bg-emerald-500/15 text-emerald-600 hover:bg-emerald-500/25 border-emerald-200/30 border-2 p-1 text-xs">
               Interested
            </Badge>
         )
      case "pending":
         return (
            <Badge variant="secondary" className="text-muted-foreground">
               Pending
            </Badge>
         )
      case "not-interested":
         return (
            <Badge variant="outline" className="text-muted-foreground">
               Passed
            </Badge>
         )
      default:
         return <Badge variant="outline">{status}</Badge>
   }
}
