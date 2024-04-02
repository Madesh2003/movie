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
$requiredKeys = ['movieName', 'screenNumber', 'seatNumber', 'ticketDate', 'ticketTime', 'ticketPrice', 'totalAmount', 'parkingslots', 'parkingPrices', 'totalPriceofparking', 'foodItems'];
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

// Prepare and bind SQL statement for ticket information
$stmt_ticket = $conn->prepare("INSERT INTO tickets_detail (movie_name, screen_number, seat_number, ticket_date, ticket_time, ticket_price, parking_slots, parking_price, total_parking_price, food_name, food_price, food_quantity, total_amount) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"); 

// Check for errors in SQL preparation
if (!$stmt_ticket) {
    die("Prepare failed: (" . $conn->errno . ") " . $conn->error);
}

// Assign values from JSON data
$movieName = $data['movieName'];
$screenNumber = $data['screenNumber'];
$seatNumber = $data['seatNumber'];
$ticketDate = $data['ticketDate'];
$ticketTime = $data['ticketTime'];
$ticketPrice = $data['ticketPrice'];
$totalAmount = $data['totalAmount'];
$parkingslots = json_encode($data['parkingslots']); // Encode parking slots array
$parkingPrices = json_encode($data['parkingPrices']); // Encode parking prices array
$totalPriceofparking = $data['totalPriceofparking'];

// Initialize arrays to store combined data
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

$stmt_ticket->bind_param("sssssssssssss", $movieName, $screenNumber, $seatNumber, $ticketDate, $ticketTime, $ticketPrice, $parkingslots, $parkingPrices, $totalPriceofparking, $combinedFoodNameString, $combinedFoodPriceString, $combinedFoodQuantityString, $totalAmount);

// Execute the SQL statement
$stmt_ticket->execute();

// Check for errors in SQL execution
if ($stmt_ticket->errno) {
    die("Execute failed: (" . $stmt_ticket->errno . ") " . $stmt_ticket->error);
}

// Close the statement
$stmt_ticket->close();

// Close the connection
$conn->close();

// Send success response
echo "Data received and stored successfully";
?>
