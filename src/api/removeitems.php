<?php

include("config.php");
include("session.php");

$data = json_decode(file_get_contents('php://input'), true);
$sql = "DELETE FROM items WHERE id IN (" . implode(',', $data) . ") AND user_id='" . $_SESSION['user_id'] . "'";
$conn->prepare($sql)->execute();
return "DELETED";

?>