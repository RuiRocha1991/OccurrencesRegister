<?php
require "../connector/Connection.php";

$_POST = json_decode(file_get_contents('php://input'), true);


$action = isset($_GET['action']) ? $_GET['action']: null;
if($action == 'getPhotosByUser' ) {
    $photo= new Photo();
    $photo->__set('user', $_POST['user']);
    $connection = new Connection();
    $service = new PhotoService($connection, $photo);
    $photos=$service->getPhotosByUser();
    echo json_encode($photos);
} elseif($action == 'update_photo'){
    $photo = new Photo();
    $photo->__set('name', $_POST['name']);
    $photo->__set('description', $_POST['description']);
    $photo->__set('is_private', $_POST['is_private']);
    $photo->__set('id_photo', $_POST['id_photo']);
    $connection = new Connection();
    $service = new PhotoService($connection, $photo);
    $service->update_photo();
    echo json_encode($photo);
} elseif($action == 'getPhotoById'){
    $photo = new Photo();
    $photo->__set('id_photo', $_POST['id_photo']);
    $connection = new Connection();
    $service = new PhotoService($connection, $photo);
    $photos=$service->getPhotoById();
    echo json_encode($photos);
}


?>