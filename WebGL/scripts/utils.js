const Project = {
    loading: 0,
    main: undefined,
    init: function(func) {
        this.main = function() {
            if (this.loading > 0) return;
            func();
        } 
        this.main();
    }    
}


var loading = 0;
function loadImage(src, callback, width, height) {
    Project.loading++;
    let image = new Image();
    if (width) {
        image.width = width;
    }
    if (height) {
        image.height = height;
    }
    image.src = src;
    image.onload = function() {
        callback(image);
        Project.loading--;
        Project.main();
    }
    return image;
}
function asyncLoadFiles(files, callback) {
    var loadingTasks = files.length;
    var loadedResources = [];
    for (var i = 0; i < files.length; i++) {
        loadFile(files[i], function(text, error, id) {
            //console.log(success);
            loadedResources[id] = text;
            loadingTasks--;
            if (loadingTasks == 0) {
                callback(loadedResources);
            }
        }, i);
        //console.log([i])
    }
}
function loadFile(filepath, callback, id) {
    let req = new XMLHttpRequest();
    Project.loading++;
    req.onload = function() {
        if (req.status == 200) {
            callback(req.responseText, false, id);
        } else {
            console.log("File of name " + filepath + " not found. Error status: " + req.status);
            callback(null, true, id);
        }
        Project.loading--;
        Project.main();
    }
    req.open('GET', "res/" + filepath, true);
    req.send();
}