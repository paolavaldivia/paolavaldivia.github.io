var propertiesFile = 'properties.json';
var clusteringAlgorithms = {};
var aleclustUri = '';

$(function () {
    loadClusteringMethods();

    
    var ORIGINAL_TOP = 100, ORIGINAL_LEFT = 0, ORIGINAL_WIDTH = 100, ORIGINAL_HEIGHT = 250, OFFSET = 5;
    var DOCUMENT_HEIGHT = $(document).height();
    //ORIGINAL_TOP = $(document).height() - 100;
    ORIGINAL_TOP = DOCUMENT_HEIGHT - ORIGINAL_HEIGHT;
    ORIGINAL_WIDTH = $(document).width();
    $('.top').css({ top: (ORIGINAL_TOP - OFFSET) + 'px'});
    $('.left').css({ left: (ORIGINAL_LEFT - OFFSET) + 'px' });
    $('.bottom').css({ top: (ORIGINAL_TOP + ORIGINAL_HEIGHT - OFFSET) + 'px' });
    $('.right').css({ left: (ORIGINAL_LEFT + ORIGINAL_WIDTH - OFFSET) + 'px' });

    $('.control-element').css({ height: (2 * OFFSET) + 'px', width: (2 * OFFSET) + 'px' });

    var moveMiddleControls = function (top, left, width, height) {
        ['top', 'bottom'].forEach(function (coordinate) {
            $('#' + coordinate).css({ left: (left + width / 2 - OFFSET) + 'px' });
        });

        ['left', 'right'].forEach(function (coordinate) {
            $('#' + coordinate).css({ top: (top + height / 2 - OFFSET) + 'px' });
        });
    };

    var resizeBox = function (top, left, width, height) {
        if(height > 32){
            $('#box').css({
                top: top + 'px',
                left: left + 'px',
                width: width + 'px',
                height: height + 'px'
            });
        }
    };

    var updateStatus = function (top, left, width, height) {
        $('#status-top').html(Math.round(top));
        $('#status-left').html(Math.round(left));
        $('#status-width').html(Math.round(width));
        $('#status-height').html(Math.round(height));
    };

    var updatePosition = function (top, left, width, height) {
        if(height > 32){
            resizeBox(top, left, width, height);
            moveMiddleControls(top, left, width, height);
            //updateStatus(top, left, width, height);
        }
    };

    var update = function () {
        updatePosition(
            $('#top').position().top + OFFSET,
            $('#left').position().left + OFFSET,
            $('#right').position().left - $('#left').position().left,
            $('#bottom').position().top - $('#top').position().top
        );
    };

    update();
    updatePosition(ORIGINAL_TOP, 0, ORIGINAL_WIDTH, ORIGINAL_HEIGHT);
    //$('#top').width(ORIGINAL_WIDTH).offset({'left':0});
    var activeElement;

    $('.control-element').mousedown(function (e) {
        activeElement = this;
        e.preventDefault();
        return false;
    });

    $(document).mousemove(function (e) {
        if (activeElement !== undefined) {
            if(DOCUMENT_HEIGHT - e.pageY - OFFSET > 32){
                ['top', 'bottom'].forEach(function (className) {
                    if ($(activeElement).hasClass(className)) {
                        $('.' + className).css({ top: e.pageY + 'px' });
                    }
                });

                ['left', 'right'].forEach(function (className) {
                    if ($(activeElement).hasClass(className)) {
                        $('.' + className).css({ left: e.pageX + 'px' });
                    }
                });
            }   
            update();
        }
    });

    $(document).mouseup(function () {
        activeElement = undefined;
    });
    //NON SERVE !? !?
    $('body').on('click', '#btnClusterFooter', function(){
        if($('#box').height()<35){
            $('#clusteringBox').show('slow');
            updatePosition(ORIGINAL_TOP, 0, ORIGINAL_WIDTH, ORIGINAL_HEIGHT);
            ['top'].forEach(function (className) {
                $('.' + className).css({ top: ($('#box').position().top - OFFSET) + 'px' });
            });
            $('#btnClusterFooter').appendTo('#box');
            
            $('#btnClusterFooter').css({ top: '0px' }).toggleClass('btn-outline-secondary btn-secondary');

            
        }
        else{
            $('#clusteringBox').hide('350');

            updatePosition(ORIGINAL_TOP + 65, 0, ORIGINAL_WIDTH, 35);
            ['top'].forEach(function (className) {
                $('.' + className).css({ top: (DOCUMENT_HEIGHT - 40) + 'px' });
            });
            $('#btnClusterFooter').css({ top: (DOCUMENT_HEIGHT - 82) + 'px'}).toggleClass('btn-outline-secondary btn-secondary');

            $('#btnClusterFooter').appendTo('main');

        }

        /* ['left', 'right'].forEach(function (className) {
            if ($(activeElement).hasClass(className)) {
                $('.' + className).css({ left: e.pageX + 'px' });
            }
        }); */
    });
    //FATTO
    $('body').on('click', '#consolidate-button-footer', function () {
        $('#clusteringBox').removeClass('d-none');
        $('#boxBody').empty();
        $('#consolidate-button').trigger('click');
        $('#mixedInitiativeBody').appendTo('#boxBody');
        setTimeout(function() {
            $('#box').animate({scrollTop: '250px'}, 600)
        }, 1);
    });

    $('.trigger').click(function () {
        $('.slider-box').toggleClass('close');
    });


    //FATTO
    $('body').on('click', '#Group', function(){
        if (!$('#boxBody').is(':empty')) {
            $('#mixedInitiativeBody').insertAfter('#mixedInitiative');
        }
    });


    
    
    $('body').on('change', '#slbClustering', function(){
        let description = $(this).find('option:selected').attr('title');
        let type = $(this).find('option:selected').data('type');
        let name = $(this).val();
        let tableBodyParameters = $('#tblAutomaticClusteringParameters tbody');
        $('#clustAlgoDescription').text(description);
        let clusteringMethod = clusteringAlgorithms[type][name];
        let parameters = clusteringMethod.parameters;
        let html = '';
        tableBodyParameters.empty();        //clear rows table > tbody
        if (Object.keys(parameters).length > 0 && parameters != "None"){
            for(key in parameters){
                let parameter = parameters[key];
                html += '<tr>' +
                    '<td>' + key + '</td>' +
                    '<td>' + getParameterInputForm(key, parameter.type, parameter.default) + '</td>' +
                    '<td>' + parameter.description + '</th>' +
                    '<td></td>' +
                    '</tr>';
            }
            tableBodyParameters.append(html);
        }
        else{
            tableBodyParameters.append('<tr><td class="text-center" colspan="4">No parameters required</td></tr>');
        }
    });
    $('body').on('click', '.btn-step', function () {
        let next = $(this).attr('href');
        $(this).closest('.card').find('.breadcrumb-item a').removeClass('active');
        $(this).closest('.card').find('a[href=' + next + ']').addClass('active');
        $(this).closest('.tab-pane').removeClass('active').removeClass('show');
        $(next).addClass('active').addClass('show');
    });

    $('body').on('click', '#btnAutomaticCluster', function(){
        console.log(jsonData);
        $.ajax({
            type: "OPTIONS",
            url: aleclustUri + '/clustering/em?k=3',
            //cache: false,
            dataType: 'JSON',
            crossDomain: true,
            success: function (data) {        
                $.ajax({
                    type: "POST",
                    url: aleclustUri + '/clustering/em?k=3',
                    //cache: false,
                    dataType: 'JSON',
                    crossDomain: true,
                    /* beforeSend: function (xhr) {
                        xhr.setRequestHeader("session", $auth);
                    }, */
                    success: function (data) {
                        console.log(data);
                    },
                    error: function (data) {
                        console.log(data);
                    }
                });
            }
        });
        /* var parametersParsed = <String, String>{ };
        parameterElements.forEach((InputElement a) {
        //      print({a.labels[0]: a.value});
        var label = a.labels[0].text;
        label = label.substring(0, label.length - 1);
        parametersParsed[label] = a.value; */
    })
});



function loadClusteringMethods(){
    readTextFile(propertiesFile, function (text) {
        var data = JSON.parse(text);
        aleclustUri = data.aleclustAddress;
        createClusteringMenu(aleclustUri);
    });
}


function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

function createClusteringMenu(url) {
    $.ajax({
        type: "GET",
        url: url,
        cache: false,
        success: function (data) {
            clusteringAlgorithms = data.algorithms;
            let element = document.getElementById('slbClustering');
            for (algorithm_group_name in clusteringAlgorithms){
                // algorithm_group)
                let optGroupElement = document.createElement("optgroup");
                optGroupElement.label = algorithm_group_name;
                optGroupElement.title = algorithm_group_name;
                element.append(optGroupElement);
                
                let algorithm_group = clusteringAlgorithms[algorithm_group_name];
                for (name in algorithm_group) {
                    let algorithm_information = algorithm_group[name];

                    let optElement = document.createElement("option");

                    optElement.text = name;
                    optElement.setAttribute('data-type', algorithm_group_name);
                    optElement.value = name;
                    optElement.title = algorithm_information["description"];

                    optGroupElement.append(optElement);
                }
            }

            /* element.addEventListener('change', function(e) {
                var selectedClusteringMethod = element.value;
                
                callback(
                    selectedClusteringMethod, _dataAlgorithms[selectedClusteringMethod]);
                element.blur(); 
            }); */
        },
        error: function (err) {
            console.log(err);
        }
    });
}

function loadJsonSource(){
    
}

function getParameterInputForm(key, type, defaultValue){
    let html = '';
    switch(type){
        case 'int':
            html = '<input type="number" class="form-control clustering-parameter" id="parameter-' + key + '" value="' + defaultValue + '" step="1">';
            break;
        case 'float':
            html = '<input type="number" class="form-control clustering-parameter" id="parameter-' + key + '" value="' + defaultValue + '" step="0.01">';
            break;
        case 'str':
            html = '<input type="text" class="form-control clustering-parameter" id="parameter-' + key + '" value="' + defaultValue + '">';
            break;
        case 'bool':
            html = '<select class="form-control clustering-parameter" id="parameter-' + key + '">' +
                '<option value="1" ' + (defaultValue == true ? 'selected' : '') + '>true</option>' +
                '<option value="0" ' + (defaultValue == false ? 'selected' : '') + '>false</option>' +
            '</select>';
            break;
    }
    return html;
}