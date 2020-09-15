<?php

include("config.php");
$data = json_decode(file_get_contents('php://input'), true);

$email = strtolower($data['email']);
$pass = $data['password'];

$pass = hash("sha256", $pass . '|' . $email . '|' . $static_salt);

$stmt = $conn->query("SELECT * FROM users WHERE \"email\"='$email';");

$result = $stmt->fetchAll(PDO::FETCH_ASSOC);

if (empty($result)) {
    echo "INVALID";
    exit(0);
}

if ($result[0]['password_hash'] == $pass) {
    $_SESSION['user_id'] = $result[0]['id'];
    $_SESSION['start_time'] = time();
    echo("{\"user_id\":\"" . strval($_SESSION['user_id']) . "\",\"start_time\":\"" . strval($_SESSION['start_time']) . "\",\"user_name\":\"" . $result[0]['name'] . "\"}");
}
else {
    session_destroy();
    echo "INVALID";
}
exit(0);