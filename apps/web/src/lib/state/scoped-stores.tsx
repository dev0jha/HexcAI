import { createContext, useContext, useRef } from "react";

import { Provider as JotaiProvider, useAtom } from "jotai";
import type { Atom, SetStateAction, WritableAtom } from "jotai";

/*
 * Defaults for state values
 */
type AtomDefaults<T> = {
  [K in keyof T]?: AtomValue<T[K]>;
};

/**
 * Extract the value type carried by a Jotai Atom.
 *
 * Example:
 *   Atom<string> -> string
 */
type AtomValue<A> = A extends Atom<infer V> ? V : never;

/**
 * Extract the return type of useAtom for a given atom
 */
type UseAtomReturn<A> =
  A extends WritableAtom<infer V, infer Args, infer Result>
    ? Args extends [SetStateAction<V>]
      ? [V, (update: SetStateAction<V>) => Result]
      : [V, (...args: Args) => Result]
    : A extends Atom<infer V>
      ? [V, React.Dispatch<SetStateAction<V>>]
      : never;

/**
 * Creates a **scoped atom registry**.
 *
 * This is a thin abstraction over Jotai atoms that:
 * - Keeps *related atoms together* as a logical unit
 * - Scopes those atoms to a specific component subtree
 * - Preserves Jotai's fine-grained subscriptions (one atom = one subscription)
 * - Avoids global atoms and selector indirection
 *
 * Conceptually:
 * - Atoms remain the primitive
 * - This abstraction provides *structure and scoping*, not new state semantics
 *
 * Each Provider instance creates a fresh, isolated atom registry.
 * Multiple Providers can coexist without sharing state.
 *
 * @param factory
 *   A function that creates and returns a map of atoms.
 *   It is executed exactly once per Provider instance.
 *
 * @returns An object containing:
 * - Provider: scopes the atom registry to a component tree
 * - useAtom: type-safe access to individual atoms by key
 */
export function createScopedAtoms<
  T extends Record<string, WritableAtom<any, any[], any>>,
>(factory: (defaults?: AtomDefaults<T>) => T) {
  /**
   * Context holding the atom registry.
   *
   * Important:
   * - This stores *atom instances*, not atom values
   * - Actual state lives inside Jotai
   * - Context is only used to locate the correct atom set
   */
  const StoreContext = createContext<T | null>(null);

  /**
   * Provider responsible for instantiating and scoping the atom registry.
   *
   * Guarantees:
   * - Atom registry is created once per Provider
   * - Atom identity remains stable across renders
   * - State is isolated per Provider instance
   */
  function Provider({
    children,
    defaults,
  }: React.PropsWithChildren<{ defaults?: AtomDefaults<T> }>) {
    /**
     * The atom registry must never be recreated,
     * otherwise all state would reset.
     */
    const atomsRef = useRef<T | null>(null);
    if (!atomsRef.current) {
      atomsRef.current = factory(defaults);
    }
    return (
      <JotaiProvider>
        <StoreContext.Provider value={atomsRef.current}>
          {children}
        </StoreContext.Provider>
      </JotaiProvider>
    );
  }

  /**
   * Access a specific atom from the scoped registry.
   *
   * Characteristics:
   * - Enforces Provider presence
   * - Subscribes only to the selected atom
   * - Preserves the atom's exact value and setter types
   *
   * This is intentionally key-based:
   * - The registry provides structure
   * - Atoms remain independent reactive units
   *
   * @param key
   *   The key of the atom to access from the registry
   */
  function useScopedAtom<K extends keyof T>(key: K): UseAtomReturn<T[K]> {
    const store = useContext(StoreContext);
    if (!store) {
      throw new Error("Scoped atoms used outside Provider");
    }

    return useAtom(store[key]) as UseAtomReturn<T[K]>;
  }

  /**
   * Public API surface.
   *
   * Consumers only interact with:
   * - Provider → to establish scope
   * - useAtom → to read/write atom state
   *
   * No selectors.
   * No global atoms.
   * No shared mutable state.
   */
  return {
    Provider,
    useAtom: useScopedAtom,
  };
}
