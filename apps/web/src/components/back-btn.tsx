import { IconArrowLeft } from "@tabler/icons-react"
import Link from "next/link"

export default function BackBtn() {
   return (
      <Link
         href="/"
         className="absolute top-8 left-8 z-20 flex items-center gap-2 text-zinc-400 hover:text-white transition-colors duration-200"
      >
         <IconArrowLeft className="h-4 w-4" />
         <span className="text-sm">Back to Home</span>
      </Link>
   )
}
