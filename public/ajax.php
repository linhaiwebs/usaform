<?php
header('Content-Type: text/plain');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');

// Example redirect URL - replace with your actual logic
$redirectUrl = 'https://example.com/smartmoney-rank-access';

// You can process the email here if needed
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = isset($_POST['email']) ? $_POST['email'] : '';

    // Log or save email to database
    // Add your custom logic here

    // Return the redirect URL
    echo $redirectUrl;
} else {
    http_response_code(405);
    echo 'Method Not Allowed';
}
?>
