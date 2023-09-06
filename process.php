<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];
    $email = $_POST["email"];
    $message = $_POST["message"];

    $to = "ogunbiye@gmail.com"; // Replace with your email address
    $subject = "New Contact Message from $name";
    $headers = "From: $email\r\n";

    // Send the email
    if (mail($to, $subject, $message, $headers)) {
        echo "Message sent successfully. I'll get back to you soon!";
    } else {
        echo "Oops! Something went wrong. Please try again later.";
    }
}
?>
