import { createStore } from "zustand/vanilla"
import { createContext, use, useRef } from "react"
import { useStore } from "zustand"

import type { StoreApi } from "zustand/vanilla"

/**
 * Store initializer signature.
 *
 * This mirrors Zustand's internal initializer shape but is made explicit
 * so the abstraction remains fully type-safe and self-documenting.
 *
 * - `set` mutates state
 * - `get` reads current state
 *
 * The function must return the complete state shape.
 */
type Intializer<T> = (set: StoreApi<T>["setState"], get: StoreApi<T>["getState"]) => T

/**
 * Creates a component-scoped Zustand store with:
 *
 * - Full type safety
 * - Zero prop-drilling
 * - No global state leakage
 * - Built-in initial state hydration
 *
 * The store instance is created once per Provider tree and
 * lives for the lifetime of that subtree.
 *
 * @param initialState - Partial initial values merged over the base state
 * @param initializer - Zustand-style state creator
 *
 * @returns An object containing:
 * - Provider: React component that owns the store instance
 * - useStore: Hook for selecting state slices
 */
export function createScopedStore<TState>(
  initialState: Partial<TState>,
  initializer: Intializer<TState>
) {
  /**
   * React Context holding the Zustand store instance.
   *
   * We store the *StoreApi*, not the state itself.
   * This enables selector-based subscriptions and avoids re-renders.
   */
  const StoreContext = createContext<StoreApi<TState> | null>(null)

  /**
   * Provider component responsible for:
   *
   * - Creating the store exactly once
   * - Scoping it to a component subtree
   * - Preventing re-creation on re-render
   */
  function Provider({ children }: { children: React.ReactNode }) {
    /**
     * `useRef` ensures the store instance is stable across renders.
     * This is critical — recreating the store would reset all state.
     */
    const storeRef = useRef<StoreApi<TState> | null>(null)

    if (!storeRef.current) {
      /**
       * Create the Zustand store.
       *
       * 1. Build the base state via the initializer
       * 2. Merge the provided initial state over it
       *
       * Initial state wins over defaults but does not replace actions.
       */
      storeRef.current = createStore<TState>((set, get) => {
        const base = initializer(set, get)
        return { ...base, ...initialState }
      })
    }

    return <StoreContext.Provider value={storeRef.current}>{children}</StoreContext.Provider>
  }

  /**
   * Hook for consuming the scoped store.
   *
   * This enforces:
   * - Provider presence
   * - Selector-based subscriptions
   * - Minimal re-renders
   *
   * @param selector - Function selecting a slice of state
   */
  function useScopedStore<TSelected>(selector: (state: TState) => TSelected): TSelected {
    /**
     * `use(StoreContext)` reads from context in React 19.
     * Replace with `useContext` if targeting stable React.
     */
    const store = use(StoreContext)

    if (!store) {
      throw new Error("ScopedStore used outside its Provider")
    }

    return useStore(store, selector)
  }

  /**
   * Public API.
   *
   * The consumer only sees:
   * - Provider
   * - useStore
   *
   * No Zustand imports required at call sites.
   */
  return {
    Provider,
    useStore: useScopedStore,
  }
}
