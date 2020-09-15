<?php

include("config.php");
include("session.php");

$data = json_decode(file_get_contents('php://input'), true);

$user_id = $data['user_id'];

$stmt = $conn->query("SELECT * FROM items WHERE \"user_id\"='$user_id' ORDER BY date DESC;");

$result = $stmt->fetchAll(PDO::FETCH_ASSOC);

if (empty($result)) {
    echo "[]";
    exit(0);
}

for ($i = 0; $i < count($result); $i++) {
    unset($result[$i]['user_id']);
}
echo(json_encode($result));
exit(0);
?>