<?php

$fileFullName = $_FILES['user-file']['name'];
$fileTmpName = $_FILES['user-file']['tmp_name'];
$file_uploads = On
$upload_max_filesize = 1G ;
$post_max_size = 4G ;
$memory_limit = 64G;
$fileName = pathinfo($fileFullName, PATHINFO_FILENAME);
$fileExt = pathinfo($fileFullName, PATHINFO_EXTENSION);
$fileUniqueName = time() . "-" . $fileName . "." . $fileExt;

$operation = move_uploaded_file($fileTmpName, 'files/' . $fileUniqueName);

if ($operation) {
    echo "0";
}