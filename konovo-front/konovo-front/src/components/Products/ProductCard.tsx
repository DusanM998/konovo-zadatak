import { Link } from "react-router-dom";
import type { ProductModel } from "../../interfaces/productModel";

interface ProductCardProps {
  product: ProductModel;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="border border-gray-300/50 bg-white rounded-lg transition p-4 flex flex-col hover:scale-102 hover:shadow-sm">
      <Link to={`/product/${product.sif_product}`}>
        <img
          src={product.imgsrc}
          alt={product.naziv}
          className="w-full h-48 object-contain mb-4 cursor-pointer"
        />
        <h2 className="text-lg font-semibold mb-2">{product.naziv}</h2>
      </Link>

      <p className="text-sm text-gray-700 mb-1">
        <b>Cena: {Number(product.price).toFixed(2)} RSD</b>
      </p>
      <p className="text-sm text-gray-600 mb-1">Brend: {product.brandName}</p>
      <p className="text-sm text-gray-600 mb-1">
        Kategorija: {product.categoryName}
      </p>
      <p className="text-sm text-gray-600 mb-1">SKU: {product.sku}</p>

      <Link
        to={`/product/${product.sif_product}`}
        className="mt-4 bg-orange-500 text-white text-center py-2 px-4
            rounded hover:scale-105 transition-transform duration-200 ease-in-out"
      >
        Pogledaj detalje
      </Link>
    </div>
  );
}
