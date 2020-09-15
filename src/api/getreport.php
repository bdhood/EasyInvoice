<?php

include("config.php");
include("session.php");

$data = json_decode(file_get_contents('php://input'), true);

$user_id = $data['user_id'];
$start_date = $data['start_date'];
$end_date = $data['end_date'];

$stmt = $conn->query("SELECT * FROM users WHERE id='$user_id';");
$user_result = $stmt->fetchAll(PDO::FETCH_ASSOC);


if (empty($user_result)) {
    exit(0);
}
$sql = "SELECT * FROM items WHERE user_id='$user_id' AND date BETWEEN '$start_date' AND '$end_date' ORDER BY date;";
$stmt = $conn->query($sql);
$data_result = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo("{\"user_data\":" . json_encode($user_result[0]) . ",\"items\":" . json_encode($data_result) . "}");

?>
