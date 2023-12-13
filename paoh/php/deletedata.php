<?php
    require('conn_mac.php');
    $id = $_GET['id'];
    $mysqli->query("DELETE FROM dataset WHERE id ='$id'");

    header("location:index.php");
?>