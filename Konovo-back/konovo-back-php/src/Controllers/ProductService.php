<?php

namespace Src\Controllers;

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

    public function getProducts($category = null, $brandName = null, $search = null,
        $minPrice = null, $maxPrice = null)
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

        if ($minPrice !== null || $maxPrice !== null) {
            $products = array_filter($products, function ($p) use ($minPrice, $maxPrice) {
                $price = $p['price'];
                if ($minPrice !== null && $price < $minPrice) return false;
                if ($maxPrice !== null && $price > $maxPrice) return false;
                return true;
            });
        }

        return array_values($products);
    }

    /*public function getProductsByPriceRange(float $minPrice, float $maxPrice): array
    {
        $products = $this->apiClient->get('products');

        $products = array_map([$this, 'processProduct'], $products);

        $filtered = array_filter($products, function ($product) use ($minPrice, $maxPrice) {
            return $product['price'] >= $minPrice && $product['price'] <= $maxPrice;
        });

        return array_values($filtered);
    }*/

    public function getPriceBounds(): array
    {
        $products = $this->apiClient->get('products');

        $products = array_map([$this, 'processProduct'], $products);
        $prices = array_column($products, 'price');

        if (empty($prices)) {
            return ['min' => 0, 'max' => 0];
        }

        return [
            'min' => floor(min($prices)),
            'max' => ceil(max($prices)),
        ];
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
