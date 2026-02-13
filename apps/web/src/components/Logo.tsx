import Link from "next/link"
import Image from "next/image"

export default function Logo() {
   return (
      <Link href="/" className="group flex items-center gap-2">
         <Image height={65} width={65} src="/logo.png" alt="HexcAI" />
      </Link>
   )
}
