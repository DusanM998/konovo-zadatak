export interface ProductModel {
  naziv: string;
  sku: string;
  ean: string | null;
  price: number;
  vat: string;
  stock: string;
  description: string;
  imgsrc: string;
  sif_productcategory: string; 
  sif_productbrand: string; 
  sif_product: string;
  categoryName: string;
  brandName: string;
}
