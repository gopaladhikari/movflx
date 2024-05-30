"use client";

import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { useEffect } from "react";

export default function TopLoadingBar() {
  useEffect(() => {
    function contextHandler(e: MouseEvent) {
      e.preventDefault();
    }
    document.addEventListener("contextmenu", contextHandler);
    return () => {
      document.removeEventListener("contextmenu", contextHandler);
    };
  }, []);

  return (
    <ProgressBar
      height="4px"
      color="#e4d804"
      options={{ showSpinner: false }}
      shallowRouting
    />
  );
}
