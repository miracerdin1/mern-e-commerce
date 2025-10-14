import ProductFilter from "@/pages/shopping-view/filter.tsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";
import { Button } from "@/components/ui/button.tsx";
import { ArrowUpDownIcon } from "lucide-react";
import { sortOptions } from "@/config";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllFilteredProducts } from "@/store/shop/products-slice";
import { AppDispatch } from "@/store/store.ts";
import ShoppingProductTile from "@/components/shopping-view/product-tile.tsx";
import { useSearchParams } from "react-router-dom";

function createSearchParamsHelper(filterParams) {
  const queryParams = [];

  for (const [key, value] of Object.entries(filterParams)) {
    if (Array.isArray(value) && value.length > 0) {
      const paramValue = value.join(",");

      queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
    }
  }
  return queryParams.join("&");
}

function ShoppingListing() {
  const dispatch = useDispatch<AppDispatch>();
  const { productList } = useSelector((state) => state.shopProducts);
  const [filters, setFilters] = useState({});
  const [sortBy, setSortBy] = useState("");
  const [searcParams, setSearchParams] = useSearchParams();

  function handleSort(value: string) {
    setSortBy(value);
  }

  function handleFilter(getSectionId: string, getCurrentOption: string) {
    console.log(
      "getSectionId, getCurrentOption",
      getSectionId,
      getCurrentOption,
    );
    let copyFilters: any = { ...filters };
    const indexOfCurrentOption = Object.keys(copyFilters).indexOf(getSectionId);

    if (indexOfCurrentOption === -1) {
      copyFilters = {
        ...copyFilters,
        [getSectionId]: [getCurrentOption],
      };
    } else {
      const indexOfCurrentOption =
        copyFilters[getSectionId].indexOf(getCurrentOption);
      if (indexOfCurrentOption === -1) {
        copyFilters[getSectionId].push(getCurrentOption);
      } else {
        copyFilters[getSectionId].splice(indexOfCurrentOption, 1);
      }
    }

    setFilters(copyFilters);
    sessionStorage.setItem("filters", JSON.stringify(copyFilters));
    console.log("filters", filters);
  }

  useEffect(() => {
    if (filters && !!Object.keys(filters).length) {
      const createQueryString = createSearchParamsHelper(filters);
      setSearchParams(new URLSearchParams(createQueryString));
    }
  }, [filters]);

  useEffect(() => {
    const stored = sessionStorage.getItem("filters");
    if (stored) {
      try {
        setFilters(JSON.parse(stored));
      } catch (e) {
        console.error("sessionStorage filters parse error:", e);
        setFilters({});
      }
    } else {
      setFilters({});
    }
    setSortBy("price-lowtohigh");
  }, []);

  useEffect(() => {
    if (filters !== null && sortBy !== null)
      dispatch(
        fetchAllFilteredProducts({ filterParams: filters, sortParams: sortBy }),
      );
  }, [dispatch, sortBy, filters]);

  console.log("productList", productList);

  return (
    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-4 md:p-6">
      <ProductFilter filters={filters} handleFilter={handleFilter} />
      <div className="bg-background w-full rounded-lg shadow-sm">
        <div className="p-4 border-b flex items-center justify-between ">
          <h2 className="text-lg font-extrabold m">All Products</h2>
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground">{productList.length}</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <ArrowUpDownIcon className="w-4 h-4" />
                  <span>Sort By</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuRadioGroup
                  value={sortBy}
                  onValueChange={handleSort}
                >
                  {sortOptions.map((sortItem) => (
                    <DropdownMenuRadioItem
                      value={sortItem.id}
                      key={sortItem.id}
                    >
                      {sortItem.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="grid grid-col-1 sm:grid-col-2 md:grid-cols-3 lg:grid-col-4 gap-4">
          {productList?.length
            ? productList.map((product, index) => (
                <ShoppingProductTile
                  key={`${product.name}-${index}`}
                  product={product}
                />
              ))
            : null}
        </div>
      </div>
    </div>
  );
}

export default ShoppingListing;
