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
        //pretvara naziv kategorije u mala slova, da bih bez obzira da li je kategorija u bazi unesena malim ili velikim slovom
        //poredio taj string sa 'monitori' stringom, i zatim za sve te filtriranje proizvode povecavam cenu za 10%
        if (strtolower($product['categoryName']) === 'monitori') {
            $product['price'] *= 1.10;
        }

        //preg_replace - trazi celovitu rec 'brzina' (granice reci \b na pocetku i kraju)
        //i - modifikator dozvoljava da bude case sensitive
        //na kraju svaku takvu pojavu menja u performanse
        $product['description'] = preg_replace('/\bbrzina\b/i', 'performanse', $product['description']);
        return $product;
    }

    public function getProducts(
        $category = null,
        $brandName = null,
        $search = null,
        $minPrice = null,
        $maxPrice = null,
        $sortOption = null
    ) {
        //dohvata sve proizvode sa eksternog api-ja
        $products = $this->apiClient->get('products');

        //Obradjuje svaki proizvod (poveca cenu i menja rec u opisu)
        //tj. prolazi kroz svaki proizvod i vraca novi niz obradjenih proizvoda
        $products = array_map([$this, 'processProduct'], $products);

        //Filtriranje po kategoriji
        if ($category) {
            //array_filter zadrava samo one proizvode za koji if vrati true
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
                //da bih imao ispravan lowercase na srpskom
                $searchLower = mb_strtolower($search);
                //mb_stripos trazi poziciju podniza bez obzira na velika/mala slova i vraca true ako ga ima
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

        if ($sortOption) {
            usort($products, function ($a, $b) use ($sortOption) {
                switch ($sortOption) {
                    case 'name-asc':
                        return strcmp(mb_strtolower($a['naziv']), mb_strtolower($b['naziv']));
                    case 'name-desc':
                        return strcmp(mb_strtolower($b['naziv']), mb_strtolower($a['naziv']));
                    case 'price-asc':
                        return ($a['price'] ?? 0) <=> ($b['price'] ?? 0);
                    case 'price-desc':
                        return ($b['price'] ?? 0) <=> ($a['price'] ?? 0);
                    default:
                        return 0;
                }
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
