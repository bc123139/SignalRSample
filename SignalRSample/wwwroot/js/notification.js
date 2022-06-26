//create connection
var connectionNotification = new signalR.HubConnectionBuilder()
    .withUrl("/hubs/notification").build();


document.getElementById("sendButton").disabled = true;

document.getElementById("sendButton").addEventListener("click", function (event) {
    var message = document.getElementById("notificationInput").value;
    connectionNotification.send("SendMessage", message).then(function () {
        document.getElementById("notificationInput").value = "";
    });
    event.preventDefault();
});



//start connection
function fulfilled() {
    //do something on start
    console.log("Connection to User Hub Successful");
    document.getElementById("sendButton").disabled = false;
}

function rejected() {
    //rejected logs
}

connectionNotification.start().then(fulfilled, rejected);