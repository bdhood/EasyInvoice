<?php

include('config.php');
include('session.php');

$data = json_decode(file_get_contents('php://input'), true);

$date = $data['date'];
$desc = $data['desc'];
$qty = $data['qty'];
$rate = $data['rate'];
$user_id = $_SESSION['user_id'];

$sql = "INSERT INTO public.items
(\"date\", description, quanity, unit_price, user_id)
VALUES ('$date', '$desc', '$qty', '$rate', '$user_id');";
$conn->prepare($sql)->execute();
echo "CREATED";
exit(0);
?>