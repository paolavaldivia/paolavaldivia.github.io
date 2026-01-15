<?php
    require('conn_mac.php');
    $id = $_GET['id'];
    if (isset($_POST['submit'])) {
    	$id = $_POST['id'];
    	$name = $_POST['name'];
    	$version = $_POST['version'];
    	$description = $_POST['description'];
    	$nodes = $_POST['nodes'];
    	$thumb = $_POST['thumb'];
    	$mysqli->query("UPDATE `dataset` SET id = $id, name = '$name', version='$version', description='$description', nodes='$nodes', thumb='$thumb' WHERE id=$id");
    	header("location:index.php");
    }

    $members = $mysqli->query("SELECT * FROM `dataset` WHERE `id`=$id");
    $mem = mysqli_fetch_assoc($members);

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
<form method="post" action="editdata.php" role="form">
	<div class="modal-body">
		<div class="form-group">
			<label for="id">ID</label>
			<input type="text" class="form-control" id="id" name="id" value="<?php echo $mem['id'];?>" readonly="true"/>

		</div>
		<div class="form-group">
			<label for="name">Name</label>
			<input type="text" class="form-control" id="name" name="name" value="<?php echo $mem['name'];?>" />
		</div>
		<div class="form-group">
			<label for="version">Version</label>
				<input type="text" class="form-control" id="version" name="version" value="<?php echo $mem['version'];?>" />
		</div>
		<div class="form-group">
			<label for="nodes">Nodes</label>
			<input type="text" class="form-control" id="nodes" name="nodes" value="<?php echo $mem['nodes'];?>" readonly="true"/>

		</div>
		<div class="form-group">
			<label for="description">Description</label>
			<input type="text" class="form-control" id="description" name="description" value="<?php echo $mem['description'];?>" />

		</div>
		<div class="form-group">
			<label for="thumb">Thumb</label>
			<input type="text" class="form-control" id="thumb" name="thumb" value="<?php echo $mem['thumb'];?>" readonly="true"/>

		</div>
		</div>
		<div class="modal-footer">
			<input type="submit" class="btn btn-primary" name="submit" value="Update" />&nbsp;
			<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
		</div>
	</form>
</body>
</html>
