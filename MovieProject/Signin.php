<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
<script>
function redirectToLoginPage() {
    window.location.href = "loginpage.html";
}
</script>

<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST["sign-in-email"];
    $password = $_POST["sign-in-passwd"];

    // Validate user credentials from the database
    $conn = new mysqli("localhost", "root", "", "nilacinemas");
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $sql = "SELECT * FROM users WHERE email = '$email' AND password = '$password'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        header("Location: index.html");
        exit();
    } else {
        echo "<script>alert('Invalid email or password'); redirectToLoginPage();</script>";
        exit();
    }

    $conn->close();
}
?>
</body>
</html>
