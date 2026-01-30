import { useEffect, useState } from "react";

export function useClientOnly() {
  /*
   * this is to prevent the hydration mismatch error in Next.js
   * **/
  const [isHyderated, setIsHyderated] = useState<boolean>(false);
  useEffect(() => {
    setIsHyderated(true);
  }, []);

  return {
    isHyderated,
  };
}
