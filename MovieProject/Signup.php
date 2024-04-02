<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <p>singup</p>
    <?php
    if ($_SERVER["REQUEST_METHOD"] == "POST") {

        $name = $_POST["name"];
        $email = $_POST["email"];
        $password = $_POST["password"];

        $conn = new mysqli("localhost", "root", "", "nilacinemas");

        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        $sql = "INSERT INTO users (name, email, password) VALUES ('$name', '$email', '$password')";

        if ($conn->query($sql) === TRUE) {
           
            header("Location: index.html");
            exit();
        } else {
            echo "<script>alert('Error: " . $sql . "<br>" . $conn->error . "');</script>";
            header("Location: loginpage.html");
        }

        $conn->close();
    }
    ?>
</body>
</html>
