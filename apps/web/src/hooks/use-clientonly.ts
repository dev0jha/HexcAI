import { useSyncExternalStore } from "react"

const emptySubscribe = () => () => {}

export function useClientOnly() {
   const isHydrated = useSyncExternalStore(
      emptySubscribe,
      () => true,
      () => false
   )

   return {
      isHydrated,
   }
}
