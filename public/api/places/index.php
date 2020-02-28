<?php
  if(isset($_GET['key'])) {
    $key = $_GET['key'];
  }
  if(isset($_GET['lat'])) {
    $lat = $_GET['lat'];
  }
  if(isset($_GET['lng'])) {
    $lng = $_GET['lng'];
  }
  $url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=$key&location=$lat,$lng&rankby=distance&language=ja&type=restaurant";
  $data = file_get_contents($url);
  echo $data;
?>
