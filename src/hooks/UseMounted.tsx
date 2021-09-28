import { useRef, useEffect } from "react";

export const UseMounted = () => {
  const isMounted = useRef(true);
  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);
  return isMounted;
};
