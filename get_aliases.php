<?php
header('Content-Type: application/json');

$aliases = file('alias.txt', FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
echo json_encode($aliases);