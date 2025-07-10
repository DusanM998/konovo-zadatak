<?php
require_once __DIR__ . '/../vendor/autoload.php';

//index.php je centralni router aplikacije. Prepoznaje HTTP rute i metode
//i poziva odgovarajuce metode iz ProductService i drugih klasa

use Src\Controllers\ProductService;
use GuzzleHttp\Client;
use Src\Controllers\ResponseController;

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

header("Content-Type: application/json");

//za obradjivanje ruta
// php proverava putanju i metodu i poziva odg f-je
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$method = $_SERVER['REQUEST_METHOD'];

$productService = new ProductService();
try {
    if ($path === '/products' && $method === 'GET') {
        $category = $_GET['categoryName'] ?? null;
        $brandName = $_GET['brandName'] ?? null;
        $search = $_GET['search'] ?? null;
        $minPrice = isset($_GET['minPrice']) ? (float)$_GET['minPrice'] : null;
        $maxPrice = isset($_GET['maxPrice']) ? (float)$_GET['maxPrice'] : null;
        $sortOption = $_GET['sort'] ?? null;

        $products = $productService->getProducts($category, $brandName, $search, $minPrice, $maxPrice, $sortOption);
        ResponseController::respond(200, $products);
    } elseif (preg_match('/\/products\/(\d+)/', $path, $matches) && $method === 'GET') {
        $id = $matches[1];
        $product = $productService->getProductById($id);
        if ($product) {
            ResponseController::respond(200, $product);
        } else {
            ResponseController::respond(404, ['error', "Product with ID: $id not found!"]);
        }
    } elseif ($path === '/login' && $method === 'POST') {
        //php://input - ulazni tok u phpu koji omogucava citanje tela POST, PUT, DELETE, itd
        // koristim ga da citam JSON podatke koje je frontend poslao
        $input = json_decode(file_get_contents("php://input"), true);
        $username = $input['username'] ?? '';
        $password = $input['password'] ?? '';

        if ($username !== 'zadatak' || $password !== 'zadatak') {
            ResponseController::respond(401, ['error' => 'Wrong username or password!']);
        }

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
                
                ResponseController::respond(200, ['token' => $body['token']]);

            } catch (\Exception $e) {
                http_response_code(500);
                echo json_encode(['error' => 'Greška prilikom dobijanja tokena.']);
            }
        } else {
            ResponseController::respond(401, ['error' => "Wrong credentials!"]);
        }
    } elseif ($path === '/products/price-bounds' && $method === 'GET') {
        $bounds = $productService->getPriceBounds();
        ResponseController::respond(200, $bounds);
    } else {
        ResponseController::respond(404, ['error' => "Not Found!: " . $path]);
    }
} catch (\Throwable $e) {
    ResponseController::respond(500, [
        'error' => 'Došlo je do interne greške.',
        'details' => $e->getMessage()
    ]);
}
