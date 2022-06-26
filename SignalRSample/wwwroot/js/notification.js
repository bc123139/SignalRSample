//create connection
var connectionNotification = new signalR.HubConnectionBuilder()
    .withUrl("/hubs/notification").build();


document.getElementById("sendButton").disabled = true;

connectionNotification.on("LoadNotification", function (messages, counter) {
    document.getElementById("messageList").innerHTML = "";
    var notificationCounter = document.getElementById("notificationCounter");
    notificationCounter.innerHTML = "<span>(" + counter + ")<span>";
    for (i = messages.length - 1; i >= 0; i--) {
        var li = document.createElement("li");
        li.textContent = "Notification - " + messages[i];
        document.getElementById("messageList").appendChild(li);
    }
});

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
    connectionNotification.send("LoadMessages");
}

function rejected() {
    //rejected logs
}

connectionNotification.start().then(fulfilled, rejected);