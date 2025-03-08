<?php

// this file serves as the default credentials.php and derives credentials from env vars

$mysqlHost =  getenv('DB_HOST');
$mysqlUser = getenv('DB_USER');
$mysqlPassword = getenv('DB_PASS');
$mysqlDB = getenv('DB_NAME');
$mysqlCollation = getenv('DB_COLLATION');
