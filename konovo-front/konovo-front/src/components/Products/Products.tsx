import { useSearchParams } from "react-router-dom";
import { useGetAllProductsQuery } from "../../apis/productApi";
import type { ProductModel } from "../../interfaces/productModel";
import { useCallback, useEffect, useMemo, useState } from "react";
import { FaAngleDoubleLeft, FaAngleDoubleRight, FaChevronDown, FaChevronUp } from "react-icons/fa";
import ProductCard from "./ProductCard";

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

  useEffect(() => {
    if (categoryFromQuery) {
      setSelectedCategory(categoryFromQuery);
    }
  }, [categoryFromQuery]);

  const queryParams = useMemo(() => {
    const params: Record<string, string> = {};
    if (selectedCategory) {
      params.categoryName = selectedCategory;
    }
    if (selectedBrand) {
      params.brandName = selectedBrand;
    }
    return params;
  }, [selectedCategory, selectedBrand]);

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
    return (
      <div className="text-center mt-10 text-orange-600 font-semibold">
        Ucitavanje proizvoda...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center mt-10 text-orange-600 font-semibold">
        Greska pri ucitavanju proizvoda!
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6">
      {/* Sidebar */}
      <aside className="border rounded-lg shadow p-4 h-fit">
        <div
          className="flex justify-between items-center cursor-pointer mb-2"
          onClick={() => setIsCategoryOpen(!isCategoryOpen)}
        >
          <h3 className="text-lg font-semibold">Kategorije</h3>
          {isCategoryOpen ? <FaChevronUp /> : <FaChevronDown />}
        </div>
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
      </aside>
      <div>
        <div className="flex items-center justify-between mb-4 gap-2">
          <div className="flex items-center gap-2">
            <label className="text-sm">Proizvoda po stranici:</label>
            <select 
              className="border rounded px-2 py-1 text-sm"
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
              className="border rounded px-2 py-1 text-sm"
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

        {/* Pagination controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-8 gap-2 flex-wrap">
            <button
              onClick={() => setCurrentPage(1)}
              className="px-3 py-2 cursor-pointer border rounded disabled:opacity-50"
              disabled={currentPage == 1}
            >
              <FaAngleDoubleLeft  />
            </button>
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Prethodna
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
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Sledeca
            </button>
            <button
              onClick={() => setCurrentPage(totalPages)}
              className="px-3 py-2 cursor-pointer border rounded disabled:opacity-50"
              disabled={currentPage == totalPages}
            >
              <FaAngleDoubleRight  />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
