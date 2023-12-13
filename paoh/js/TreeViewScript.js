var treeId;
var activeList;
var timeSlotList;
var newName;
var oldName;
//I will use this function to hide the other group
function setTimeSlotList(year) {
    timeSlotList.push(year);
}

//And this for reset
function resetTimeSlotList(){
    timeSlotList = [];
}

function setTreeId(relativeTime){
    treeId = "#tree"+relativeTime;
}

function createTreeForTs(){
    $(treeId).fancytree({
        extensions: ["edit","dnd","multi"],
        checkbox: true,
        icons: false,
        selectMode: 3,
        source: [

        ],
        multi:{
            mode:"sameParent",
        },
        edit: {

            triggerStart: ["dblclick", "enter", "mac+enter"],
            beforeEdit: function(event, data){
                if(data.node.data[0] == undefined){
                    return false;
                }
            },
            edit: function(event, data){
                if(data.node.isFolder() && data.node.getChildren() != null){
                    data.node.getChildren().forEach(children =>{
                        children.setFocus(false);
                        children.setActive(false);
                        children.setSelected(false);
                    });
                }
                // Editor was opened (available as data.input)
            },
            beforeClose: function(event, data){
                // Return false to prevent cancel/save (data.input is available)
                if( data.originalEvent.type === "mousedown" ) {
                    // We could prevent the mouse click from generating a blur event
                    // (which would then again close the editor) and return `false` to keep
                    // the editor open:
//                  data.originalEvent.preventDefault();
//                  return false;
                    // Or go on with closing the editor, but discard any changes:
//                  data.save = false;
                }
            },
            save: function(event, data){
                oldName = data.node.title;
                // Save data.input.val() or return false to keep editor open
                //console.log("save...", this, data);
                // Simulate to start a slow ajax request...
                setTimeout(function(){
                    $(data.node.span).removeClass("pending");
                    // Let's pretend the server returned a slightly modified
                    // title:
                    data.node.setTitle(data.node.title);
                    newName = data.node.title;
                    document.dispatchEvent(customEvent);
                }, 500);
                // We return true, so ext-edit will set the current user input
                // as title

                return true;
            },
            close: function(event, data){
                // Editor was removed
                if( data.save ) {
                    // Since we started an async request, mark the node as preliminary
                    $(data.node.span).addClass("pending");
                }
            }
        },
        dnd:{

            autoExpandMS: 400,
            focusOnClick: true,
            preventVoidMoves: true, // Prevent dropping nodes 'before self', etc.
            preventRecursiveMoves: true, // Prevent dropping nodes on own descendants
            preventForeignNodes: true,
            dragStart: function(node, data) {
                /** This function MUST be defined to enable dragging for the tree.
                 *  Return false to cancel dragging of node.
                 */
                if(node.data[0] != undefined){
                    return false;
                }
                else{
                    treeId = node.parent.data[0];
                    return true;
                }
            },
            dragEnter: function(node, data) {
                /** data.otherNode may be null for non-fancytree droppables.
                 *  Return false to disallow dropping on node. In this case
                 *  dragOver and dragLeave are not called.
                 *  Return 'over', 'before, or 'after' to force a hitMode.
                 *  Return ['before', 'after'] to restrict available hitModes.
                 *  Any other return value will calc the hitMode from the cursor position.
                 */
                //treeId = data.node.data[0];
                if(node.data[0] == treeId){
                    return true;
                }else{
                    return false;
                }

                if(node.parentNode.isRoot()){
                    return false;
                }
                // Prevent dropping a parent below another parent (only sort
                // nodes under the same parent)
                /*           if(node.parent !== data.otherNode.parent){
                            return false;
                          }
                          // Don't allow dropping *over* a node (would create a child)
                          return ["before", "after"];
                */

            },
            dragDrop: function(node, data) {
                /** This function MUST be defined to enable dropping of items on
                 *  the tree.
                 */
                if (node.getLevel() == 1 && (data.hitMode == 'after' || data.hitMode == 'before')) {
                    //console.log('dropped into first level');
                }else{
                    data.otherNode.moveTo(node, data.hitMode);
                }

            }

        },

        activate: function(event, data) {
            $("#statusLine").text(event.type + ": " + data.node);
            $("#timeSlotReference").text("Time Reference: "+data.node.data[0]);

            var tree = $.ui.fancytree.getTree(treeId);
            var root = tree.getRootNode();
            var nodes = root.children;


            /*nodes.forEach(function(node){
                if(node.isFolder() && node.isActive()){
                    node.span.style.fontWeight = "900";
                }
                if(node.isFolder() && node.isActive() == false){
                    node.span.style.fontWeight = "100";
                }
            });*/



            if(data.node.isFolder() && data.node.getChildren() != null){
                data.node.getChildren().forEach(children =>{
                    children.setFocus(false);
                    children.setActive(false);
                    children.setSelected(false);
                });
            }
            },

        select: function(event, data) {

            /*$("#statusLine").text(
                event.type + ": " + data.node.isSelected() + " " + data.node
            );*/

        },
        renderNode: function(event, data) {
            // Optionally tweak data.node.span
            data.node.span.setAttribute("id", data.node.title+treeId);

            if(data.node.parent.parent == null){
                //console.log(data.node.span);
                //$(data.node.span).text(data.node.title);
                //data.node.span.style.backgroundColor = "red";
            }


        },
        click: function(event, data){
            //console.log(data);

            if(data.node.data[0] != undefined){
                //var year = data.node.tooltip.substr(data.node.tooltip.length - 4);
                treeId = data.node.data[0];
                var year = data.node.data[0].slice(5);
                //console.log(data.node.tooltip);
                timeSlotList.forEach(function (slot) {
                    if(year == slot){
                        document.getElementById("list"+year).style.display = "block";
                    }
                    else{
                        document.getElementById("list"+slot).style.display = "none";
                    }

                });
                activeList = document.getElementById(year);
            }
            if(data.node.data[0] == undefined){
                var parentNode = data.node.parent;
                //var year = parentNode.tooltip.substr(parentNode.tooltip.length - 4);
                //var year = data.node.tooltip.substr(data.node.tooltip.length - 4);
                var year = parentNode.data[0].slice(5);
                treeId = data.node.parent.data[0];
                //console.log(treeId);
                document.getElementById("list"+year).style.display = "none";
            }
        }

    });


};

function getActiveList(){
    return activeList;
}

function changeColorFromLegend(groupName){
    var rootNode = $.ui.fancytree.getTree(treeId).getRootNode();
    rootNode.visit(function(n){
        if(n.title == groupName){
            n.span.style.backgroundColor = colorGroup;
        }
    });

}

function deleteNode(){
    //console.log(treeId);
    var groupList = [];
    var nodeNameToList = [];
    var tree = $.ui.fancytree.getTree(treeId),
        selNodes = tree.getSelectedNodes();


    selNodes.forEach(function(node){
        if(node.data[0] == treeId){
            groupList.push(node.title);
            node.remove;
        }
        else{
            nodeNameToList.push(node.title);
            node.remove();
        }
    });

    try{selNodes.forEach(function(node) {
            try{
                node.remove();
            }catch(e){

            }
    });
    }catch (e) {

    }
    finally {

        return [nodeNameToList, treeId, groupList];
    }
};

function addGroup(){
    //Pass an array to the data of node. The first element will be the time
    var extraData = [treeId];
    var rootNode = $.ui.fancytree.getTree(treeId).getRootNode();
    //console.log($.ui.fancytree.getTree(treeId));
    //Group name increase
    var groupIndex = 1;
    rootNode.visit(function(n){
        var parentNode = n.parent;
        if(parentNode.parent == null){
            groupIndex = groupIndex+1;
        }
    });

    var groupName = "Group"+groupIndex;
    var childNode = rootNode.addChildren({
        title: groupName,
        //tooltip: treeId,
        folder: true,
        expanded: true,
        checkbox: true,
        data: extraData
    });
    childNode.setActive(true);

    return groupName;
};

function changeColorOfNewGroup(){
    var node = $.ui.fancytree.getTree(treeId).getActiveNode();
    node.span.style.backgroundColor = colorGroup;
};

function addGroupInEachTs(groupName){
    var extraData = [treeId];
    var rootNode = $.ui.fancytree.getTree(treeId).getRootNode();
    //console.log($.ui.fancytree.getTree(treeId));
    //Group name increase

    var childNode = rootNode.addChildren({
        title: groupName,
        //tooltip: treeId,
        folder: true,
        expanded: true,
        checkbox: true,
        data: extraData
    });
    childNode.span.style.backgroundColor = colorGroup;
    //childNode.setActive(true);
    return groupName;
}
var colorGroup;

function setColor(color){
    colorGroup = color;
}

function createGroupAlreadyExisting(...parameter){
    var groupName = parameter[0];
    //Pass an array to the data of node. The first element will be the time
    var extraData = [treeId];
    if(! $.ui.fancytree.getTree(treeId)) return;
    var rootNode = $.ui.fancytree.getTree(treeId).getRootNode();

    var childNode = rootNode.addChildren({
        title: groupName,
        //tooltip: treeId,
        folder: true,
        expanded: true,
        checkbox: true,
        data: extraData
    });
    //console.log(parameter[parameter.length]);
    childNode.span.style.backgroundColor = colorGroup;

    for(var i=1; i<parameter.length; i++){
        childNode.addChildren({
            title: parameter[i],
            icon: "customdoc1.gif"
        });
    }

}

function getAlreadyPresentMember() {
    if(! $.ui.fancytree.getTree(treeId)) return ;
    var rootNode = $.ui.fancytree.getTree(treeId).getRootNode();
    var alreadyPrMem = [];
    rootNode.visit(function(n){
        var parentNode = n.parent;
        if(parentNode.parent != null){
            alreadyPrMem.push(n.title);
        }
    });

    return alreadyPrMem;
}

function getGroupToModify(){
    var oldAndNewName = [];
    oldAndNewName.push(oldName, newName);
    return oldAndNewName;
}

function addSingleMember(selectedMember){
    var node = $.ui.fancytree.getTree(treeId).getActiveNode();

    node.addChildren({
        title: selectedMember,
        icon: "customdoc1.gif"
    });


    return node.title;
};

var customEvent = new CustomEvent("groupRename",{detail:{
        name:"rename"
    }});

var data  =[];
function saveToCsv(theString){
    data.push(theString);
}

function downloadCsv(fileName){
    fileName = fileName+".csv";
    var csvContent = '';
    data .forEach(function(rowArray, index) {
        csvContent += index < data.length ? rowArray + '\n' : rowArray;
    });
    var download = function(content, fileName, mimeType) {
        var a = document.createElement('a');
        mimeType = mimeType || 'application/octet-stream';

        if (navigator.msSaveBlob) { // IE10
            navigator.msSaveBlob(new Blob([content], {
                type: mimeType
            }), fileName);
        } else if (URL && 'download' in a) { //html5 A[download]
            a.href = URL.createObjectURL(new Blob([content], {
                type: mimeType
            }));
            a.setAttribute('download', fileName);
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        } else {
            location.href = 'data:application/octet-stream,' + encodeURIComponent(content); // only this mime type is supported
        }
    }

    console.log(csvContent);
    download(csvContent, fileName, 'text/csv;encoding:utf-8');
}

