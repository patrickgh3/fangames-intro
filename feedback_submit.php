<?php
// Sends feedback email to Patrick and returns result text

// Grab parameters, provide default contact if empty
$feedback = $_POST['feedback'];
$contact = $_POST['contact'];
if ($contact == '') {
    $contact = '(none)';
}

// Return error if feedback empty
if ($feedback == '') {
    header('HTTP/1.1 400 Bad Request');
    echo 'Feedback textbox was empty!';
    die();
}

// Send email via Postmark
require_once('./vendor/autoload.php');
use Postmark\PostmarkClient;
$client = new PostmarkClient("ba7fe0a5-12da-4767-a4da-22f0771c7567");

$from = 'automated@cwpat.me';
$to = 'patrickjtraynor@gmail.com';
$subject = 'Fangames intro feedback ' . date('Y-m-d');
$content = "<html><body>Feedback: $feedback"
        . "<br><br>Contact: $contact</body></html>";
$sendResult = $client->sendEmail($from, $to, $subject, $content);

// Check if email sent successfully or not
if ($sendResult) {
    echo "Submitted. Thanks!";
}
else {
    header('HTTP/1.1 500 Internal Server Error');
}
?>
