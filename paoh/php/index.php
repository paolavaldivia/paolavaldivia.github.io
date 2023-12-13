<?php
    require('conn_mac.php');
    $result = $mysqli->query("SELECT * FROM `dataset`");
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Test php dataset</title>
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>


<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="memberModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                <h4 class="modal-title" id="memberModalLabel">Edit Dataset Detail</h4>
            </div>
            <div class="dash">

            </div>

        </div>
    </div>
</div>


<div class="modal fade" id="insertModal" tabindex="-1" role="dialog" aria-labelledby="memberModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                <h4 class="modal-title" id="memberModalLabel">Insert Dataset Detail</h4>
            </div>
            <div class="dash">

            </div>

        </div>
    </div>
</div>

<div id="myModal" class="modal">

    <!-- Modal content -->
    <div class="modal-content">
        <span class="close">&times;</span>
        <p>Exported Dataset!</p>
    </div>

</div>

<div class="container">
    <div class="row">
        <div class="col-lg-12">
            <h1 class="page-header">Dataset Details</h1> <button class="btn btn-small btn-primary" data-toggle="modal" data-target="#insertModal">Insert new dataset</button>
             <br>
             <br>
                 <a href="write_dataset.php"  class="btn btn-small btn-primary">Export Dataset</a>
                    <?php
                    if(file_exists("Dataset.json")==1){
                        echo"<button type=\"button\"class=\"btnbtn-outline-primary\">".
                            "<svg width=\"1em\"height=\"1em\"viewBox=\"001616\"class=\"bibi-binoculars-fill\"fill=\"currentColo\"xmlns=\"http://www.w3.org/2000/svg\">".
                            "<path d=\"M4.5 1A1.5 1.5 0 0 0 3 2.5V3h4v-.5A1.5 1.5 0 0 0 5.5 1h-1zM7 4v1h2V4h4v.882a.5.5 0 0 0 .276.447l.895.447A1.5 1.5 0 0 1 15 7.118V13H9v-1.5a.5.5 0 0 1 .146-.354l.854-.853V9.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v.793l.854.853A.5.5 0 0 1 7 11.5V13H1V7.118a1.5 1.5 0 0 1 .83-1.342l.894-.447A.5.5 0 0 0 3 4.882V4h4zM1 14v.5A1.5 1.5 0 0 0 2.5 16h3A1.5 1.5 0 0 0 7 14.5V14H1zm8 0v.5a1.5 1.5 0 0 0 1.5 1.5h3a1.5 1.5 0 0 0 1.5-1.5V14H9zm4-11H9v-.5A1.5 1.5 0 0 1 10.5 1h1A1.5 1.5 0 0 1 13 2.5V3z\"/></svg></button>";
                    }
                    ?>
                <br>
                <br>
        </div>
        <!-- /.col-lg-12 -->
    </div>
    <div class="row">
        <div id="member" class="col-lg-12">
            <table class="table table-striped table-bordered">
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Version</th>
                    <th>Description</th>
                    <th>Nodes</th>
                    <th>Thumbnail</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                    <?php
                         while ($mem = mysqli_fetch_assoc($result)):
                            echo '<tr>';
                               echo '<td>'.$mem['id'].'</td>';
                               echo '<td>'.$mem['name'].'</td>';
                               echo '<td>'.$mem['version'].'</td>';
                               echo '<td>'.$mem['description'].'</td>';
                               echo '<td>'.$mem['nodes'].'</td>';
                               echo '<td>'.$mem['thumb'].'</td>';
                               echo '<td>
                                        <a class="btn btn-small btn-primary"
                                           data-toggle="modal"
                                           data-target="#exampleModal"
                                           data-whatever="'.$mem['id'].' ">Edit</a>
                                     </td>';
                             echo '<td>
                                   <a href="deletedata.php?id='.$mem['id'].'"  class="btn btn-danger btn-sm rounded-0">Delete</a>
                                   </td>';
                            echo '</tr>';
                            // encode array to json
               
                         endwhile;
                         /* free result set */
                         $result->close();
                    ?>
                </tbody>
            </table>
        </div>
    </div>
</div>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
<script>

    $('#exampleModal').on('show.bs.modal', function (event) {
          var button = $(event.relatedTarget) // Button that triggered the modal
          var recipient = button.data('whatever') // Extract info from data-* attributes
          var modal = $(this);
          var dataString = 'id=' + recipient;

            $.ajax({
                type: "GET",
                url: "editdata.php",
                data: dataString,
                cache: false,
                success: function (data) {
                    console.log(data);
                    modal.find('.dash').html(data);
                },
                error: function(err) {
                    console.log(err);
                }
            });
    })
    $('#insertModal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget) // Button that triggered the modal
        var recipient = button.data('whatever') // Extract info from data-* attributes
        var modal = $(this);
        var dataString = 'id=' + recipient;

        $.ajax({
            type: "GET",
            url: "insertdata.php",
            data: dataString,
            cache: false,
            success: function (data) {
                console.log(data);
                modal.find('.dash').html(data);
            },
            error: function(err) {
                console.log(err);
            }
        });
    })


</script>
</body>
</html>
