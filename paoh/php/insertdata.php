<?php
    require('conn_mac.php');

    if (isset($_POST['submit'])) {
    	$name = $_POST['name'];
    	$version = $_POST['version'];
    	$description = $_POST['description'];
	    $nodes = $_POST['nodes'];

	    if(!isset($_FILES["thumb"]["name"])){
            $thumb = '/'.$_POST['name'];
        }else{
            $thumb = '/'.$_FILES["thumb"]["name"];
        }
    	$mysqli->query("INSERT INTO dataset(name,version,description,nodes,thumb) VALUES ('$name','$version','$description','$nodes','$thumb') ");
        $target_dir = "thumb/";
        $target_file = $target_dir . basename($_FILES["thumb"]["name"]);
        $uploadOk = 1;
        $imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
        if(isset($_POST["submit"])) {
            $check = getimagesize($_FILES["thumb"]["tmp_name"]);
            if($check !== false) {
                // echo "File is an image - " . $check["mime"] . ".";
                $uploadOk = 1;
            }
        }

        if (file_exists($target_file)) {
            $uploadOk = 0;
        }

        // Check file size
        if ($_FILES["fileToUpload"]["size"] > 500000) {
            $uploadOk = 0;
        }

        if ($uploadOk == 0) {

        } else {
            if (move_uploaded_file($_FILES["thumb"]["tmp_name"], $target_file)) {
                 echo "The file ". htmlspecialchars( basename( $_FILES["fileToUpload"]["name"])). " has been uploaded.";
                header("location:index.php");
            } else {
                 echo "Sorry, there was an error uploading your file.";
            }
        }


    }


?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dataset Details</title>

    <!-- Bootstrap Core CSS -->
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
<form method="post" action="insertdata.php" role="form" enctype="multipart/form-data">
	<div class="modal-body">
		<div class="form-group">
			<label for="id">ID</label>
			<input type="text" class="form-control" id="id" name="id" value="AUTO" readonly="true"/>

		</div>
		<div class="form-group">
			<label for="name">Name</label>
			<input type="text" class="form-control" id="name" name="name" value="" required/>
		</div>
		<div class="form-group">
			<label for="version">Version</label>
				<input type="text" class="form-control" id="version" name="version" value="" required/>
		</div>
		<div class="form-group">
			<label for="nodes">Nodes</label>
			<input type="text" class="form-control" id="nodes" name="nodes" value="" required/>

		</div>
		<div class="form-group">
			<label for="description">Description</label>
			<input type="text" class="form-control" id="description" name="description" value="" required/>

		</div>
		<div class="form-group" >
                <label for="thumb">Thumb</label>
                <input type="file" name="thumb" id="thumb" class="form-control" accept="image/png, image/jpeg, image/jpg" required/>
		</div>

		</div>
		<div class="modal-footer">
			<input type="submit" class="btn btn-primary" name="submit" value="Insert" />&nbsp;
			<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
		</div>
	</form>
</body>
</html>
