<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];
    $email = $_POST["email"];
    $message = $_POST["message"];

    // Set up the PHPMailer instance
    $mail = new PHPMailer(true); // Passing `true` enables exceptions

    try {
        // Server settings
        $mail->isSMTP(); // Set mailer to use SMTP
        $mail->Host = 'smtp.example.com'; // Replace with your SMTP server address
        $mail->SMTPAuth = true; // Enable SMTP authentication
        $mail->Username = 'your_smtp_username'; // Replace with your SMTP username
        $mail->Password = 'your_smtp_password'; // Replace with your SMTP password
        $mail->SMTPSecure = 'tls'; // Enable TLS encryption, `ssl` also accepted
        $mail->Port = 587; // TCP port to connect to, typically 587 for TLS

        // Recipients
        $mail->setFrom($email, $name);
        $mail->addAddress('ogunbiye@gmail.com'); // Replace with the recipient's email address

        // Content
        $mail->isHTML(false); // Set email format to plain text
        $mail->Subject = "New Form Submission from $name";
        $mail->Body = "Name: $name\nEmail: $email\n\n$message";

        // Send the email
        $mail->send();
        echo "Thank you! Your message has been sent.";
    } catch (Exception $e) {
        echo "Oops! Something went wrong. Please try again later. Error: {$mail->ErrorInfo}";
    }
}
?>
