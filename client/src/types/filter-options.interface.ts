export interface FilterOption {
  id: string;
  value?: string;
  label: string;
}

export interface FilterOptions {
  category: FilterOption[];
  brand: FilterOption[];
}
