import { useEffect, useState } from "react";

export default function useDebounce(value: string) {
  const [v, setV] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setV(value);
    }, 300);

    return () => {
      clearTimeout(timeout);
    };
  }, [value]);

  return v;
}
