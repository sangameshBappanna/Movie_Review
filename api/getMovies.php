<?php 
$respons = array();
$ch = curl_init();
$root = 'https://api.themoviedb.org/3/';
$key = 'c16db6e67e9ad5d6247827beebf22086';
$page = $_POST['page'];
if(isset($_POST['type'])){
    $type = $_POST['type'];
    $url = $root."movie/top_rated?api_key=$key&page=$page";
    if($type == 'topRated'){
        $url = $root."movie/top_rated?api_key=$key&page=$page";
    }
    if($type == 'upcoming'){
        $url = $root."movie/upcoming?api_key=$key&page=$page";
    }
}
if(isset($_POST['searchField'])){
    $search = $_POST['searchField'];
    $url = $root."search/movie?api_key=$key&query=$search&page=$page";
}

curl_setopt($ch, CURLOPT_URL, $url);
// curl_setopt($ch, CURLOPT_POST, 1);
// curl_setopt($ch, CURLOPT_POSTFIELDS, POST DATA);

$result = curl_exec($ch);

curl_close($ch);
// echo $url;
$respons = $result;
// $respons['result'] = $result;
// $respons['message'] = "";
return json_encode($respons);
die();