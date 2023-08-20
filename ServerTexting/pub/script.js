function query(data, callback, id) {
    let req = new XMLHttpRequest();
    req.onload = function () {
        if (req.status == 200) {
            callback(req.responseText, false, id);
        } else {
            console.log("Shit there is error while querying" + data + ". Status is" + req.status);
            callback(null, true, id);
        }
    }
    req.open('GET', "req/" + data, true);
    req.send();
}
query("This_is_my_query,_did_you_get_it.", function (data) {
    console.log(data);
})