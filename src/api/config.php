<?php 

session_start();

$servername = $_ENV['POSTGRES_ADDRESS'];
$database = $_ENV['POSTGRES_DB'];
$username = $_ENV['POSTGRES_USER'];
$password = $_ENV['POSTGRES_PASSWORD'];

$static_salt = "5f58b855e850d04ed5f10e4129955e9d483a39cc";

$conn = new PDO("pgsql:host=$servername;dbname=$database", $username, $password);
$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

?>