// useIsMobile.ts
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < breakpoint);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [breakpoint]);

  return isMobile;
}

export function useShare() {
  const share = useCallback(
    async (title: string, url: string, text: string) => {
      const fullurl = url.startsWith("http") ? url : `${window.location.origin}${url}`

      if (navigator.share) {
        try {
          await navigator.share({ title, text, url: fullurl })
        } catch (err) {
          console.log("Share failed", err)
        }
      } else {
        try {
          await navigator.clipboard.writeText(fullurl);
          alert("Link copied to clipboard!");
        } catch (err) {
          console.error("Clipboard copy failed:", err);
        }

      }
    }, []
  )
  return share
}