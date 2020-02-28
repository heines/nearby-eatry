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
  if(isset($_GET['dst'])) {
    $dst = $_GET['dst'];
  }
  $url = "https://maps.googleapis.com/maps/api/distancematrix/json?key=$key&mode=walking&origins=$lat,$lng&destinations=$dst";
  $data = file_get_contents($url);
  echo $data;
?>
