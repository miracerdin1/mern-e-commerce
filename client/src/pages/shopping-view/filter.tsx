import { filterOptions } from "@/config";
import { Fragment } from "react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { FilterOptions } from "@/types/filter-options.interface.ts";

function ProductFilter({
  filters,
  handleFilter,
}: {
  filters: Partial<Record<keyof FilterOptions, string[]>>;
  handleFilter: (key: keyof FilterOptions, id: string) => void;
}) {
  return (
    <div className="bg-background rounded-lg shadow-sm">
      <div className="p-4 border-b">
        <h2 className="text-lg font-extrabold">Filters</h2>
      </div>
      <div className="p-4 space-y-4">
        {(Object.keys(filterOptions) as (keyof FilterOptions)[]).map(
          (keyItem) => (
            <Fragment key={keyItem}>
              <div>
                <h3 className="text-base font-bold">{keyItem}</h3>
                <div className="grid gap-2 mt-2">
                  {filterOptions[keyItem].map((option, index) => (
                    <Label
                      key={option.value || option.label || index}
                      className="flex items-center gap-2 font-medium"
                    >
                      <Checkbox
                        checked={
                          filters &&
                          !!Object.keys(filters).length &&
                          filters[keyItem] &&
                          Boolean(filters[keyItem]?.indexOf(option.id) > -1)
                        }
                        onCheckedChange={() => handleFilter(keyItem, option.id)}
                      />
                      {option.label}
                    </Label>
                  ))}
                </div>
              </div>
              <Separator />
            </Fragment>
          ),
        )}
      </div>
    </div>
  );
}

export default ProductFilter;
