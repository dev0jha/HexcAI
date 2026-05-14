"use client"

import { ContactModal } from "@/components/recruiter/contact-modal"
import { DiscoverToolbar } from "@/components/search/discover-toolbar"
import { DevelopersList } from "@/components/discover/developers-list"
import { useDiscoverPage } from "@/hooks/screens/discover.hooks"

export function DiscoverContent() {
   const {
      searchQuery,
      techFilter,
      sortBy,
      selectedDeveloper,
      modalOpen,
      topDevelopers,
      listDevelopers,
      filteredCount,
      setSearchQuery,
      handleTechFilterChange,
      handleSortChange,
      handleContact,
      handleCloseModal,
   } = useDiscoverPage()

   return (
      <div className="min-h-screen pb-20 pt-10 text-neutral-100 font-sans selection:bg-neutral-800">
         <div className="mx-auto max-w-350 px-6 lg:px-10">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between mb-8">
               <div className="space-y-1">
                  <h1 className="text-2xl font-bold tracking-tight text-white">Top Talent</h1>
                  <p className="text-sm text-neutral-500 max-w-md">
                     Discover the highest-performing developers in the ecosystem.
                     {filteredCount > 0 && (
                        <span className="ml-2 text-neutral-400">
                           ({filteredCount} developers found)
                        </span>
                     )}
                  </p>
               </div>

               <DiscoverToolbar
                  searchValue={searchQuery}
                  onSearchChange={setSearchQuery}
                  techFilter={techFilter}
                  onTechFilterChange={handleTechFilterChange}
                  sortBy={sortBy}
                  onSortChange={handleSortChange}
               />
            </div>

            <DevelopersList
               topDevelopers={topDevelopers}
               listDevelopers={listDevelopers}
               onContact={handleContact}
            />

            <ContactModal
               developer={selectedDeveloper}
               open={modalOpen}
               onOpenChange={handleCloseModal}
            />
         </div>
      </div>
   )
}
