import { useEffect, useRef } from "react";

export function useTitle(title: string) {
  const prevTitleRef = useRef(document.title);
  useEffect(() => {
    document.title = title;
    return () => {
      document.title = prevTitleRef.current;
    };
  }, [title]);
}