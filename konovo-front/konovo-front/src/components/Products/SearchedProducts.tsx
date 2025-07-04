import { Link } from "react-router-dom";
import type { ProductModel } from "../../interfaces/productModel";

interface SearchedProductsProps {
  results: ProductModel[];
  isOpen: boolean;
  isLoading: boolean;
  query: string;
  onClose: () => void;
}

const SearchedProducts = ({
  results,
  isOpen,
  isLoading,
  query,
  onClose,
}: SearchedProductsProps) => {
  if (!isOpen || query.length < 2) {
    return null;
  }

  return (
    <>
      {/* Rezultati pretrage */}
      {results.length > 0 ? (
        <ul
          className="absolute top-full left-0 w-full z-50 bg-white border border-gray-300 
          rounded-b-lg shadow max-h-60 overflow-y-auto transition-all duration-200 ease-out transform origin-top"
        >
          {results.map((product) => (
            <li key={product.sif_product}>
              <Link
                to={`/product/${product.sif_product}`}
                className="flex items-center gap-3 px-4 py-2 hover:bg-orange-100 text-sm text-black"
                onClick={onClose}
              >
                <img
                  src={product.imgsrc}
                  alt={product.naziv}
                  className="w-10 h-10 object-contain border rounded"
                />
                <span>{product.naziv}</span>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        !isLoading && (
          <div
            className="absolute top-full left-0 w-full z-50 bg-white border border-gray-300 
            rounded-b-lg shadow px-4 py-2 text-sm text-gray-600 transition-all duration-200 ease-out transform origin-top"
            onBlur={onClose}
          >
            Nema rezultata.
          </div>
        )
      )}
    </>
  );
};

export default SearchedProducts;