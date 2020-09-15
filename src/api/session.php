<?php

if (!isset($_SESSION['user_id']) || !isset($_SESSION['start_time'])) {
    echo "Error invalid session";
    exit(1);
}

$total_time = time() - $_SESSION['start_time'];
if ($total_time > 3600 * 24) {
    echo "Session expired";
    session_destroy();
    exit(1);
}

?>