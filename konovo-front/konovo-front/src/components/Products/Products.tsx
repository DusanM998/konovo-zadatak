import { Link, useSearchParams } from "react-router-dom";
import { useGetAllProductsQuery } from "../../apis/productApi";
import type { ProductModel } from "../../interfaces/productModel";
import { useCallback, useEffect, useMemo, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import ProductCard from "./ProductCard";

export default function Products() {
  const [searchParams] = useSearchParams();
  const categoryFromQuery = searchParams.get("categoryName");

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);

  const [isCategoryOpen, setIsCategoryOpen] = useState<boolean>(false);
  const [isBrandOpen, setIsBrandOpen] = useState<boolean>(false);

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products && products.length > 0 ? (
          products?.map((product: ProductModel) => (
            <ProductCard key={product.sif_product} product={product} />
          ))
        ) : (
          <div className="text-center text-gray-600 col-span-full">
            Nema proizvoda za izabranu kategoriju.
          </div>
        )}
      </div>
    </div>
  );
}
