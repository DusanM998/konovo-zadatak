<?php
require_once __DIR__ . '/../vendor/autoload.php';

use Src\ProductService;

header("Content-Type: application/json");

$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$method = $_SERVER['REQUEST_METHOD'];

$productService = new ProductService();

if ($path === '/products' && $method === 'GET') {
    $category = $_GET['categoryName'] ?? null;
    $search = $_GET['search'] ?? null;
    $products = $productService->getProducts($category, $search);
    echo json_encode($products, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);

} elseif (preg_match('/\/products\/(\d+)/', $path, $matches) && $method === 'GET') {
    $id = $matches[1];
    $product = $productService->getProductById($id);
    if ($product) {
        echo json_encode($product, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    } else {
        http_response_code(404);
        echo json_encode(['error' => 'Product not found']);
    }
} else {
    http_response_code(404);
    echo json_encode(['error' => 'Not Found']);
}
