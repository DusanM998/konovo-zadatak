<?php

namespace Src\Controllers;

class ResponseController
{
    public static function respond(int $statusCode, array $data) : void
    {
        http_response_code($statusCode);
        header("Content-Type: application/json");
        echo json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
        exit;
    }
}