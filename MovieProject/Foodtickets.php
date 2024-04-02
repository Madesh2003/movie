<?php
// Retrieve POST data
$postData = file_get_contents("php://input");
file_put_contents("raw_post_data.log", $postData);

// Decode JSON data
$data = json_decode($postData, true);

// Check if JSON decoding failed
if ($data === null) {
    http_response_code(400);
    echo "Invalid JSON data received";
    exit;
}

// Check for required keys in JSON data
$requiredKeys = ['foodItems'];
foreach ($requiredKeys as $key) {
    if (!array_key_exists($key, $data)) {
        http_response_code(400);
        echo "Missing key '$key' in JSON data";
        exit;
    }
}

// Database connection parameters
$servername = "localhost";
$username = "root";
$password = "";
$database = "nilacinemas";

// Create a connection
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Prepare and bind SQL statement for food details
$stmt_food = $conn->prepare("INSERT INTO food_details (foodname, price, quantity, subtotal) VALUES (?, ?, ?, ?)"); 

// Check for errors in SQL preparation
if (!$stmt_food) {
    die("Prepare failed: (" . $conn->errno . ") " . $conn->error);
}

// Assign food items data
$combinedFoodNames = [];
$combinedFoodPrices = [];
$combinedFoodQuantities = [];
$combinedFoodSubtotals = [];

// Assign food items data
$foodItems = $data['foodItems'];

// Combine food items data
foreach ($foodItems as $foodItem) {
    $foodName = $foodItem['foodname'];
    $foodPrice = $foodItem['price'];
    $foodQuantity = $foodItem['quantity'];
    $foodSubtotal = $foodItem['subtotal'];
    
    // Check if the food name already exists in the combined data
    $index = array_search($foodName, $combinedFoodNames);
    if ($index !== false) {
        // Update quantity, price, and subtotal if the food name already exists
        $combinedFoodQuantities[$index] += $foodQuantity;
        // No need to update price as it should be the same
        // No need to update subtotal as it should be the sum of all subtotals for the same food item
        $combinedFoodSubtotals[$index] += $foodSubtotal;
    } else {
        // Add new food item to the combined data
        $combinedFoodNames[] = $foodName;
        $combinedFoodPrices[] = $foodPrice;
        $combinedFoodQuantities[] = $foodQuantity;
        $combinedFoodSubtotals[] = $foodSubtotal;
    }
}

// Combine food names
$combinedFoodNameString = implode(",", $combinedFoodNames);

// Combine food prices
$combinedFoodPriceString = implode(",", $combinedFoodPrices);

// Combine food quantities
$combinedFoodQuantityString = implode(",", $combinedFoodQuantities);

// Combine food quantities
$combinedFoodSubtotal = implode(",", $combinedFoodSubtotals);
// Bind combined food details and execute the SQL statement
$stmt_food->bind_param("ssss", $combinedFoodNameString, $combinedFoodPriceString, $combinedFoodQuantityString, $combinedFoodSubtotal);

$stmt_food->execute();

// Check for errors in SQL execution
if ($stmt_food->errno) {
    die("Execute failed: (" . $stmt_food->errno . ") " . $stmt_food->error);
}

// Close the statement
$stmt_food->close();

// Close the connection
$conn->close();

// Send success response
echo "Food data received and stored successfully";
?>
