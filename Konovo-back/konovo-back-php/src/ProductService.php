<?php

namespace Src;

class ProductService
{
    private $apiClient;

    public function __construct()
    {
        $this->apiClient = new ApiClient();
    }

    private function processProduct($product)
    {
        if (strtolower($product['categoryName']) === 'monitori') {
            $product['price'] *= 1.10;
        }

        $product['description'] = preg_replace('/\bbrzina\b/i', 'performanse', $product['description']);
        return $product;
    }

    public function getProducts($category = null, $brandName = null, $search = null)
    {
        //dohvata sve proizvode sa eksternog api-ja
        $products = $this->apiClient->get('products');

        //Obradjuje svaki proizvod (poveca cenu i menja rec u opisu)
        $products = array_map([$this, 'processProduct'], $products);

        //Filtriranje po kategoriji
        if ($category) {
            $products = array_filter($products, function ($p) use ($category) {
                return strtolower($p['categoryName']) === strtolower($category);
            });
        }

        //filter po brandName
        if ($brandName) {
            $products = array_filter($products, function ($p) use ($brandName) {
                return strtolower($p['brandName']) === strtolower($brandName);
            });
        }

        //Pretraga po nazivu i opisu, ako je prosledjen search string
        if ($search) {
            $products = array_filter($products, function ($p) use ($search) {
                $searchLower = mb_strtolower($search);
                return (mb_stripos($p['naziv'], $searchLower) !== false) ||
                    (mb_stripos($p['description'], $searchLower) !== false);
            });
        }

        return array_values($products);
    }

    public function getProductById($id)
    {
        $products = $this->apiClient->get('products');
        foreach ($products as $product) {
            if ((string)$product['sif_product'] === (string)$id) {
                return $this->processProduct($product);
            }
        }
        return null;
    }
}
