import { useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "../../apis/productApi";

const SpecificProduct = () => {
  const { id } = useParams<{ id: string }>();

  const { data: product, isLoading, isError } = useGetProductByIdQuery(id);

  if (isLoading) {
    return (
      <div className="text-center mt-10 text-orange-600 font-semibold">
        Ucitavanje Proizvoda...
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
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <img
          src={product.imgsrc}
          alt={product.naziv}
          className="w-full h-80 object-contain mb-6 lg:w-1/3"
        />
        <div className="flex flex-col justify-between">
          <h1 className="text-3xl font-bold mb-4">{product.naziv}</h1>
          <p className="text-lg text-gray-600 mb-4">SKU: {product.sku}</p>
          <p className="text-lg text-gray-600 mb-4">
            Brend: {product.brandName}
          </p>
          <p className="text-lg text-gray-600 mb-4">
            Kategorija: {product.categoryName}
          </p>
          <p className="text-lg text-gray-600 mb-4">
            Cena: {Number(product.price).toFixed(2)} RSD
          </p>
          <p className="text-lg text-gray-600 mb-4">
            Na stanju: {product.stock}
          </p>
          <p
            className="text-lg text-gray-700"
            dangerouslySetInnerHTML={{ __html: product.description }}
          />
        </div>
      </div>
    </div>
  );
};

export default SpecificProduct;