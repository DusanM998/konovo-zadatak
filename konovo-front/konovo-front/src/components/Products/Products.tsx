import { Link, useSearchParams } from "react-router-dom";
import { useGetAllProductsQuery } from "../../apis/productApi";
import type { ProductModel } from "../../interfaces/productModel";
import { useEffect, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isCategoryOpen, setIsCategoryOpen] = useState<boolean>(false);
  const [isCenaOpen, setIsCenaOpen] = useState<boolean>(false);
  const [searchParams] = useSearchParams();
  const categoryFromQuery = searchParams.get("categoryName");

  useEffect(() => {
    setSelectedCategory(categoryFromQuery);
  }, [categoryFromQuery]);

  // API poziv sa parametrom filtriranja
  const {
    data: products,
    isLoading,
    isError,
  } = useGetAllProductsQuery(
    selectedCategory ? { categoryName: selectedCategory } : {}
  );

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

  // Generisem kategorije iz svih proizvoda
  const categories = Array.from(
    new Set<string>(
      products
        ?.map((product: ProductModel) => product.categoryName)
        .filter(Boolean)
    )
  ).sort();

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

        {/*<div
          className="flex justify-between items-center cursor-pointer mb-2"
          onClick={() => setIsCenaOpen(!isCenaOpen)}
        >
          <h3 className="text-lg font-semibold">Cena</h3>
          {isCenaOpen ? <FaChevronUp /> : <FaChevronDown />}
        </div>*/}
        {isCategoryOpen && (
          <ul className="space-y-2 mt-2">
            <li>
              <button
                onClick={() => setSelectedCategory(null)}
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
                  onClick={() => setSelectedCategory(category)}
                  className={`block w-full text-left rounded px-2 py-1 hover:bg-orange-100 ${
                    selectedCategory === category ? "bg-orange-200 font-semibold" : ""
                  }`}
                >
                  {category}
                </button>
              </li>
            ))}
          </ul>
        )}
      </aside>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products && products.length > 0 ? (
          products.map((product: ProductModel) => (
            <div
              key={product.sif_product}
              className="border rounded-lg shadow hover:shadow-md transition p-4 flex flex-col"
            >
              <img
                src={product.imgsrc}
                alt={product.naziv}
                className="w-full h-48 object-contain mb-4"
              />
              <h2 className="text-lg font-semibold mb-2">{product.naziv}</h2>
              <p className="text-sm text-gray-600 mb-1">SKU: {product.sku}</p>
              <p className="text-sm text-gray-600 mb-1">
                Kategorija: {product.categoryName}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                Brend: {product.brandName}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                Cena: {Number(product.price).toFixed(2)} RSD
              </p>
              <p className="text-sm text-gray-600 mb-1">
                Na stanju: {product.stock}
              </p>
              <p
                className="text-sm text-gray-700 mt-2"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
              <Link
                to={`/product/${product.sif_product}`}
                className="mt-4 text-orange-500 hover:text-orange-700"
              >
                Pogledaj detalje
              </Link>
            </div>
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
