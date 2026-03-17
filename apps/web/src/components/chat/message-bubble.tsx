import { cn } from "@/lib/utils"

import type { Message } from "./chat-layout"

export function MessageBubble({ message, isMine }: { message: Message; isMine: boolean }) {
   return (
      <div className={cn("flex flex-col group w-full", isMine ? "items-end" : "items-start")}>
         <div className="flex items-baseline gap-2 mb-1.5 px-1">
            <span className="text-[12px] font-medium text-neutral-400">
               {isMine ? "You" : message.senderName || "User"}
            </span>
            <span className="text-[10px] text-neutral-600 opacity-0 group-hover:opacity-100 transition-opacity">
               {new Date(message.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
               })}
            </span>
         </div>
         <div
            className={cn(
               "px-4 py-3 max-w-[85%] sm:max-w-xl w-fit shadow-sm text-[14px] leading-relaxed whitespace-pre-wrap",
               isMine
                  ? "bg-linear-to-br from-neutral-800 to-neutral-900 border border-neutral-700/60 rounded-2xl rounded-tr-sm text-neutral-200"
                  : "bg-[#111111] border border-neutral-800/80 rounded-2xl rounded-tl-sm text-neutral-300"
            )}
         >
            {message.content}
         </div>
      </div>
   )
}
