<?php

include('config.php');

$data = json_decode(file_get_contents('php://input'), true);

$email = strtolower($data['email']);
$name = $data['name'];
$phone = $data['phone'];
$address = $data['address'];
$company_name = $data['company_name'];
$company_address = $data['company_address'];
$pass = $data['password'];
$pass = hash("sha256", $pass . '|' . $email . '|' . $static_salt);

$stmt = $conn->query("SELECT * FROM users WHERE \"email\"='$email';");

$result = $stmt->fetchAll(PDO::FETCH_ASSOC);

if (!empty($result)) {
    echo "USERNAME_TAKEN";
    exit(1);
}

$sql = "INSERT INTO users (email, \"name\", phone, \"address\", company_name, company_address, password_hash) VALUES ('$email', '$name', '$phone', '$address', '$company_name', '$company_address', '$pass');";
$conn->prepare($sql)->execute();
echo "CREATED";
exit(0);
?>