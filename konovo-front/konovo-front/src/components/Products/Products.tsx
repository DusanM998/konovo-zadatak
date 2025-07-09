import { useSearchParams } from "react-router-dom";
import {
  useGetAllProductsQuery,
  useGetPriceBoundsQuery,
} from "../../apis/productApi";
import type { ProductModel } from "../../interfaces/productModel";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaChevronDown,
  FaChevronLeft,
  FaChevronRight,
  FaChevronUp,
  FaFilter,
  FaTimes,
} from "react-icons/fa";
import ProductCard from "./ProductCard";
import MainLoader from "../../pages/common/MainLoader";
import { Range } from "react-range";

export default function Products() {
  const [searchParams] = useSearchParams();
  const categoryFromQuery = searchParams.get("categoryName");

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);

  const [isCategoryOpen, setIsCategoryOpen] = useState<boolean>(false);
  const [isBrandOpen, setIsBrandOpen] = useState<boolean>(false);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);

  const [sortOption, setSortOption] = useState<string>("name-asc");

  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);

  const PRICE_STEP = 100;
  const [isPriceOpen, setIsPriceOpen] = useState(false);
  const [priceRange, setPriceRange] = useState<number[]>([0, 10000]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);

  const { data: bounds, isLoading: boundsLoading } = useGetPriceBoundsQuery();

  console.log("Logujem price bounds: ", bounds);

  useEffect(() => {
    if (categoryFromQuery) {
      setSelectedCategory(categoryFromQuery);
    }
  }, [categoryFromQuery]);

  useEffect(() => {
    if (bounds) {
      setPriceRange([bounds.min, bounds.max]);
    }
  }, [bounds]);

  useEffect(() => {
    if (bounds && bounds.min !== undefined && bounds.max !== undefined) {
      setMinPrice(bounds.min);
      setMaxPrice(bounds.max);
      setPriceRange([bounds.min, bounds.max]);
    }
  }, [bounds]);

  const queryParams = useMemo(() => {
    const params: Record<string, string> = {};
    if (selectedCategory) {
      params.categoryName = selectedCategory;
    }
    if (selectedBrand) {
      params.brandName = selectedBrand;
    }

    if (priceRange.length === 2) {
      params.minPrice = priceRange[0].toString();
      params.maxPrice = priceRange[1].toString();
    }

    return params;
  }, [selectedCategory, selectedBrand, priceRange]);

  // API poziv sa parametrom filtriranja
  const {
    data: products,
    isLoading,
    isError,
  } = useGetAllProductsQuery(queryParams);

  const categories = useMemo(() => {
    return Array.from(
      new Set<string>(
        products
          ?.map((product: ProductModel) => product.categoryName)
          .filter(Boolean)
      )
    ).sort();
  }, [products]);

  const brands = useMemo(() => {
    return Array.from(
      new Set<string>(
        products
          ?.map((product: ProductModel) => product.brandName)
          .filter(Boolean)
      )
    ).sort();
  }, [products]);

  const handleCategoryClick = useCallback((category: string | null) => {
    setSelectedCategory(category);
  }, []);

  const handleBrandClick = useCallback((brand: string | null) => {
    setSelectedBrand(brand);
  }, []);

  const sortedProducts = useMemo(() => {
    if (!products) {
      return [];
    }
    const sorted = [...products];

    switch (sortOption) {
      case "name-asc":
        sorted.sort((a, b) =>
          a.naziv.toLowerCase().localeCompare(b.naziv.toLowerCase())
        );
        break;
      case "name-desc":
        sorted.sort((a, b) =>
          b.naziv.toLowerCase().localeCompare(a.naziv.toLowerCase())
        );
        break;
      case "price-asc":
        sorted.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
        break;
      case "price-desc":
        sorted.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
        break;
      default:
        break;
    }
    return sorted;
  }, [products, sortOption]);

  const paginatedProducts = useMemo(() => {
    if (!sortedProducts) return [];
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedProducts, currentPage, itemsPerPage]);

  const totalPages = sortedProducts
    ? Math.ceil(sortedProducts.length / itemsPerPage)
    : 1;

  if (isLoading) {
    return <MainLoader />;
  }

  if (isError) {
    return (
      <div className="text-center mt-10 text-orange-600 font-semibold">
        Greska pri ucitavanju proizvoda!
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 h-[calc(100vh-64px)] flex flex-col md:flex-row gap-6">
      {/* Sidebar */}
      <div className="md:hidden flex justify-center items-center mb-4">
        <button
          onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
          className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded"
        >
          {mobileFilterOpen ? <FaTimes /> : <FaFilter />} Filteri
        </button>
      </div>
      <aside
        className={`bg-white border border-gray-300/50 rounded-lg p-4 w-full md:w-[200px] max-w-xs 
          md:static md:block z-10 transition-all duration-300 ease-in-out 
          ${mobileFilterOpen ? "block" : "hidden"} h-[200px] overflow-y-auto 
            md:h-[calc(100vh-150px)] md:overflow-y-auto`}
      >
        <div
          className="flex justify-between items-center cursor-pointer mb-2"
          onClick={() => setIsCategoryOpen(!isCategoryOpen)}
        >
          <h3 className="text-lg font-semibold">Kategorije</h3>
          {isCategoryOpen ? <FaChevronUp /> : <FaChevronDown />}
        </div>
        {/* Izbor kategorije za filter */}
        {isCategoryOpen && (
          <ul className="space-y-2 mt-2">
            <li>
              <button
                onClick={() => handleCategoryClick(null)}
                className={`block w-full text-left rounded px-2 py-1 hover:bg-orange-100 ${
                  selectedCategory === null ? "bg-orange-200 font-semibold" : ""
                }`}
              >
                Sve kategorije
              </button>
            </li>
            {categories.map((category) => (
              <li key={category}>
                <button
                  onClick={() => handleCategoryClick(category)}
                  className={`block w-full text-left rounded px-2 py-1 hover:bg-orange-100 ${
                    selectedCategory === category
                      ? "bg-orange-200 font-semibold"
                      : ""
                  }`}
                >
                  {category}
                </button>
              </li>
            ))}
          </ul>
        )}
        <div
          className="flex justify-between items-center cursor-pointer mb-2"
          onClick={() => setIsBrandOpen(!isBrandOpen)}
        >
          <h3 className="text-lg font-semibold">Brend</h3>
          {isBrandOpen ? <FaChevronUp /> : <FaChevronDown />}
        </div>
        {/* Izbor brenda za filter po brendu*/}
        {isBrandOpen && (
          <ul className="space-y-2 mt-2">
            <li>
              <button
                onClick={() => handleBrandClick(null)}
                className={`block w-full text-left rounded px-2 py-1 hover:bg-orange-100 ${
                  selectedBrand === null ? "bg-orange-200 font-semibold" : ""
                }`}
              >
                Svi brendovi
              </button>
            </li>
            {brands.map((brand) => (
              <li key={brand}>
                <button
                  onClick={() => handleBrandClick(brand)}
                  className={`block w-full text-left rounded px-2 py-1 hover:bg-orange-100 ${
                    selectedBrand === brand ? "bg-orange-200 font-semibold" : ""
                  }`}
                >
                  {brand}
                </button>
              </li>
            ))}
          </ul>
        )}

        <div
          className="flex justify-between items-center cursor-pointer mb-2 mt-4"
          onClick={() => setIsPriceOpen(!isPriceOpen)}
        >
          <h3 className="text-lg font-semibold">Cena</h3>
          {isPriceOpen ? <FaChevronUp /> : <FaChevronDown />}
        </div>

        {isPriceOpen && (
          <div className="mt-4">
            <Range
              step={PRICE_STEP}
              min={minPrice}
              max={maxPrice}
              values={priceRange}
              onChange={(values) => setPriceRange(values)}
              renderTrack={({ props, children }) => (
                <div
                  {...props}
                  className="h-2 bg-gray-200 rounded relative"
                  style={{
                    ...props.style,
                    height: "6px",
                    background: "linear-gradient(to right, #f3f4f6, #f97316)",
                  }}
                >
                  {children}
                </div>
              )}
              renderThumb={({ props }) => (
                <div
                  {...props}
                  className="w-5 h-5 bg-orange-500 rounded-full shadow border-2 border-white"
                />
              )}
            />
            <div className="flex justify-between text-sm mt-2">
              <span>
                Od: <strong>{priceRange[0]} RSD</strong>
              </span>
              <span>
                Do: <strong>{priceRange[1]} RSD</strong>
              </span>
            </div>
          </div>
        )}
      </aside>
      <div className="flex-1 h-full overflow-y-auto pr-2 p-2">
        {/* Sortiranje */}
        <div className="flex items-center justify-between mb-4 gap-2">
          <div className="flex items-center gap-2">
            <label className="text-sm">Proizvoda po stranici:</label>
            <select
              className="border border-gray-300/50 bg-white rounded-lg px-2 py-1 text-sm"
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
            >
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value={20}>20</option>
              <option value={30}>30</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm">Sortiraj: </label>
            <select
              className="border border-gray-300/50 bg-white rounded-lg px-2 py-1 text-sm"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="name-desc">Naziv - opadajuce</option>
              <option value="name-asc">Naziv - rastuce</option>
              <option value="price-desc">Cena - opadajuce</option>
              <option value="price-asc">Cena - rastuce</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedProducts && paginatedProducts.length > 0 ? (
            paginatedProducts.map((product: ProductModel) => (
              <ProductCard key={product.sif_product} product={product} />
            ))
          ) : (
            <div className="text-center text-gray-600 col-span-full">
              Nema proizvoda za izabranu kategoriju.
            </div>
          )}
        </div>

        {/* Stranice za paginaciju */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-8 gap-2 flex-wrap">
            <button
              onClick={() => setCurrentPage(1)}
              className="px-3 py-2 cursor-pointer border rounded disabled:opacity-50"
              disabled={currentPage == 1}
            >
              <FaAngleDoubleLeft />
            </button>
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-2 border rounded disabled:opacity-50"
            >
              <FaChevronLeft />
            </button>
            {(() => {
              const maxVisiblePages = 4;
              const pageGroup = Math.floor((currentPage - 1) / maxVisiblePages);
              const startPage = pageGroup * maxVisiblePages + 1;
              const endPage = Math.min(
                startPage + maxVisiblePages - 1,
                totalPages
              );

              const pagesToShow = [];
              for (let page = startPage; page <= endPage; page++) {
                pagesToShow.push(page);
              }

              return pagesToShow.map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 border rounded ${
                    page === currentPage ? "bg-orange-500 text-white" : ""
                  }`}
                >
                  {page}
                </button>
              ));
            })()}
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-3 py-2 border rounded disabled:opacity-50"
            >
              <FaChevronRight />
            </button>
            <button
              onClick={() => setCurrentPage(totalPages)}
              className="px-3 py-2 cursor-pointer border rounded disabled:opacity-50"
              disabled={currentPage == totalPages}
            >
              <FaAngleDoubleRight />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
