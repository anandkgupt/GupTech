import { useState, useEffect } from "react";

export function useRouter() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    // Listen to standard browser PopState events (back/forward keys)
    window.addEventListener("popstate", handleLocationChange);
    
    // Listen to our custom navigation event inside the same tab
    window.addEventListener("pushstate", handleLocationChange);
    window.addEventListener("replacestate", handleLocationChange);

    return () => {
      window.removeEventListener("popstate", handleLocationChange);
      window.removeEventListener("pushstate", handleLocationChange);
      window.removeEventListener("replacestate", handleLocationChange);
    };
  }, []);

  const navigate = (to: string) => {
    // Preserve existing search params when navigating to keep selection state active
    const search = window.location.search;
    const finalPath = `${to}${search}`;
    
    window.history.pushState(null, "", finalPath);
    window.dispatchEvent(new Event("pushstate"));
  };

  return { currentPath, navigate };
}
