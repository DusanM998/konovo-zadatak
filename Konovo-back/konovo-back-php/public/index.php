<?php
require_once __DIR__ . '/../vendor/autoload.php';

use Src\Controllers\ProductService;
use GuzzleHttp\Client;

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

header("Content-Type: application/json");

$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$method = $_SERVER['REQUEST_METHOD'];

$productService = new ProductService();

if ($path === '/products' && $method === 'GET') {
    $category = $_GET['categoryName'] ?? null;
    $brandName = $_GET['brandName'] ?? null;
    $search = $_GET['search'] ?? null;
    $products = $productService->getProducts($category, $brandName, $search);
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

} elseif ($path === '/login' && $method === 'POST') {
    $input = json_decode(file_get_contents("php://input"), true);
    $username = $input['username'] ?? '';
    $password = $input['password'] ?? '';

    // Provera kredencijala (dummy auth)
    if ($username === 'zadatak' && $password === 'zadatak') {
        $client = new Client([
            'base_uri' => 'https://zadatak.konovo.rs/',
            'headers' => ['Accept' => 'application/json'],
            'verify' => false
        ]);

        try {
            $response = $client->post('login', [
                'json' => ['username' => $username, 'password' => $password]
            ]);
            $body = json_decode($response->getBody(), true);
            echo json_encode(['token' => $body['token']]);
        } catch (\Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Greška prilikom dobijanja tokena.']);
        }
    } else {
        http_response_code(401);
        echo json_encode(['error' => 'Neispravni kredencijali']);
    }

} else {
    http_response_code(404);
    echo json_encode(['error' => 'Not Found']);
}
