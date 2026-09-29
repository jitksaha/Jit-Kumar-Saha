<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["error" => "Method not allowed"]);
    exit;
}

// Read API key from environment or local server file
$apiKey = getenv('OPENROUTER_API_KEY');
if (!$apiKey && file_exists(__DIR__ . '/.env')) {
    $env = parse_ini_file(__DIR__ . '/.env');
    $apiKey = $env['OPENROUTER_API_KEY'] ?? null;
}

if (!$apiKey) {
    http_response_code(500);
    echo json_encode(["error" => "Server configuration error: OpenRouter API key not configured on server"]);
    exit;
}

$rawInput = file_get_contents("php://input");
$input = json_decode($rawInput, true);
$prompt = $input['prompt'] ?? '';
$system = $input['system'] ?? 'You are an executive technology consultant. Write crisp, high-impact enterprise problem summaries and project scopes in 2-4 sentences with clear business value and technical direction.';

if (empty($prompt)) {
    http_response_code(400);
    echo json_encode(["error" => "Prompt is required"]);
    exit;
}

$payload = json_encode([
    "model" => "openai/gpt-4o-mini",
    "messages" => [
        ["role" => "system", "content" => $system],
        ["role" => "user", "content" => $prompt]
    ],
    "max_tokens" => 350,
    "temperature" => 0.7
]);

$ch = curl_init("https://openrouter.ai/api/v1/chat/completions");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Authorization: Bearer " . $apiKey,
    "Content-Type: application/json",
    "HTTP-Referer: https://jitksaha.com",
    "X-Title: Jit Kumar Saha Portfolio AI Writer"
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($httpCode !== 200) {
    http_response_code($httpCode ?: 500);
    echo $response ?: json_encode(["error" => "OpenRouter API call failed"]);
    exit;
}

$resData = json_decode($response, true);
$resultText = $resData['choices'][0]['message']['content'] ?? '';

echo json_encode(["result" => $resultText]);
