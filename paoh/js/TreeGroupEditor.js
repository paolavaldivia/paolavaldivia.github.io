$("#tree").fancytree({
    checkbox: true,
    selectMode: 3,
    source: [
        /*url:
            "https://cdn.rawgit.com/mar10/fancytree/72e03685/demo/ajax-tree-products.json"*/
    ],
    lazyLoad: function(event, data) {
        data.result = {url: "https://cdn.rawgit.com/mar10/fancytree/72e03685/demo/ajax-sub2.json"};
    },

    activate: function(event, data) {
        $("#statusLine").text(event.type + ": " + data.node);
        $("#timeSlotReference").text("Time Reference: "+data.node.tooltip);
        selectedNode = data.node;
    },
    select: function(event, data) {
        /*$("#statusLine").text(
            event.type + ": " + data.node.isSelected() + " " + data.node
        );*/

    }
});

function renameNode() {
    var node = $.ui.fancytree.getTree("#tree").getActiveNode();
    var newNodeName = document.getElementById("renameGroupText").value;
    if (!node) return;
    node.setTitle(newNodeName);
};


function deleteNode(){
    var tree = $.ui.fancytree.getTree("#tree"),
        selNodes = tree.getSelectedNodes();

    selNodes.forEach(function(node) {
        while( node.hasChildren() ) {
            node.getFirstChild().moveTo(node.parent, "child");
        }
        node.remove();
    });
};

var timeGroup;
function getTimeReference(timeSlot){
    timeGroup = timeSlot;
    console.log(timeGroup);
}

function addGroup(...nodeList){
    getTextId(this.id);
    //var groupName = document.getElementById("insertGroupName").value;
    var groupName = document.getElementById(timeGroup).value;
    var rootNode = $.ui.fancytree.getTree("#tree").getRootNode();
    var childNode = rootNode.addChildren({
        title: groupName,
        tooltip: timeGroup,
        folder: true,
        expanded: true,
        checkbox: true
    });

    for (var i = 0; i < nodeList.length; i++) {

        childNode.addChildren({
            title: nodeList[i],
            icon: "customdoc1.gif"
        });
    }

};

function selectListMember(...memberList){

    var select = document.getElementById("memberListAdd");

    for(var i = 0; i < memberList.length; i++) {
        var opt = memberList[i];
        var el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        select.appendChild(el);
    }
};

function addSingleMember(){
    var node = $.ui.fancytree.getTree("#tree").getActiveNode();

    var e = document.getElementById("memberListAdd");
    var strUser = e.options[e.selectedIndex].text;

    node.addChildren({
        title: strUser,
        icon: "customdoc1.gif"
    });
    console.log(node);
    return node.title;
};

function clearMemberList(){
    var e = document.getElementById("memberListAdd");
    var i;
    for(i = e.options.length - 1 ; i >= 0 ; i--)
    {
        e.remove(i);
    }
};

function getTextId(e){
  e = e || window.event;
  e = e.target || e.srcElement;
  console.log("ID" + e.id);
};




