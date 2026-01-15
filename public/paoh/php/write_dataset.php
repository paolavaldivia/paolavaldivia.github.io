<?php
    require('conn_mac.php');
    header('Content-Type: application/json');
    $result = $mysqli->query("SELECT * FROM `dataset`");
    $response["Dataset"] = array();
     while ($mem = mysqli_fetch_assoc($result)):
            $risp = array();
            $risp["id"] = $mem['id'];
            $risp["name"] = $mem['name'];
            $risp["version"] = $mem['version'];
            $risp["description"] = $mem['description'];
            $risp["nodes"] = $mem['nodes'];
            $risp["thumb"] = $mem['thumb'];
            array_push($response["Dataset"], $risp);
            //write json to file

             endwhile;
             /* free result set */
             $print = json_encode($response);
              if (file_put_contents("Dataset.json",$print)){
                                             //ok
                                            header("location:index.php");
                                             }

?>