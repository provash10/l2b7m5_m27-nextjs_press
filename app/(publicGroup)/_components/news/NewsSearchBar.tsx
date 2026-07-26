"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";

export function NewsSearchBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [value, setValue] = useState(searchParams.get("searchTerm") || "");
  const debouncedReference = useRef<ReturnType<typeof setTimeout> | (null)>(null);

  // Sync state if URL changes externally
  useEffect(() => {
    setValue(searchParams.get("searchTerm") || "");
  }, [searchParams]);

  const handleChange = (newValue: string) => {
    setValue(newValue);

    // Debounce Next.js router transition
    if (debouncedReference.current) {
      clearTimeout(debouncedReference.current);
    }

    debouncedReference.current = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (newValue) {
        params.set("searchTerm", newValue);
      } else {
        params.delete("searchTerm");
      }
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }, 500);
  };

  return (
    <div className="relative w-full max-w-sm">
      <SearchIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="Search news..."
        className="pl-9"
      />
    </div>
  );
}
