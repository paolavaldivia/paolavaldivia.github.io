function alertMessage(text) {
    alert(text)
}

window.logger = (flutter_value) => {
   console.log({ js_context: this, flutter_value });
}

function loadingOverlay(show){
    if(show){
        $.LoadingOverlay('show');
    }
    else{
        $.LoadingOverlay('hide');
    }
}

function windowOpen(url){
    window.open(url, '', "width=" + screen.availWidth + ",height=" + screen.availHeight);
}