<?php

namespace Src;

use GuzzleHttp\Client;

class ApiClient
{
    private $client;
    private $token;

    public function __construct()
    {
        $this->client = new \GuzzleHttp\Client([
            'base_uri' => 'https://zadatak.konovo.rs/',
            'headers' => ['Accept' => 'application/json'],
            'verify' => false, 
        ]);
        $this->authenticate();
    }

    private function authenticate()
    {
        $response = $this->client->post('login', [
            'json' => [
                'username' => $_ENV['API_USERNAME'] ?? 'zadatak',
                'password' => $_ENV['API_PASSWORD'] ?? 'zadatak',
            ]
        ]);

        $data = json_decode($response->getBody(), true);
        $this->token = $data['token'];

        //var_dump($this->token); // <--- Debug
    }

    public function get($uri)
    {
        $response = $this->client->get($uri, [
            'headers' => [
                'Authorization' => 'Bearer ' . $this->token
            ]
        ]);
        return json_decode($response->getBody(), true);
    }
}
