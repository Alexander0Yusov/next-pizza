import React, { useRef } from "react";
import { Filters } from "./use-filters";
import { useRouter } from "next/navigation";
import qs from "qs";

export const useQueryFilters = (filters: Filters) => {
  const router = useRouter();
  const isMounted = useRef(false);

  React.useEffect(() => {
    if (isMounted) {
      const params = {
        ...filters.prices,
        pizzaTypes: Array.from(filters.pizzaTypes),
        sizes: Array.from(filters.sizes),
        ingredients: Array.from(filters.selectedIngredients),
      };
      const query = qs.stringify(params, { arrayFormat: "comma" });

      router.push(`?${query}`, { scroll: false });
    }

    isMounted.current = true;
  }, [filters, router]);
};
