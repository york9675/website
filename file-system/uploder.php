$file_name = $_FILES['file_to_upload']['name'];
$file_temp_location = $_FILES['file_to_upload']['tmp_name'];

if (!$file_temp_location) {
  echo '錯誤: 沒有選取的檔案';
  exit();
}

if (move_uploaded_file($file_temp_location, "uploads/$file_name")){
  echo "$file_name 已上傳完畢，位於 https://www.fgbot.live/file-system/uploads/$file_name";
} else {
  echo '無法移動檔案';
}