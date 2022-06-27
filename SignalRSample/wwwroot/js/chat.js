let btn_send_message = document.getElementById("sendMessage");
//create connection
var connectionChat = new signalR.HubConnectionBuilder()
    //.configureLogging(signalR.LogLevel.Information)
    .withUrl("/hubs/chat").build();

btn_send_message.disabled = true;

connectionChat.on("MessageRecieved", function (sender, message) {
    var li = document.createElement("li");
    li.textContent = `${sender} - ${message}`;
    document.getElementById("messagesList").appendChild(li);

});


btn_send_message.addEventListener("click", function (event) {
    var sender = document.getElementById("senderEmail").value;
    var message = document.getElementById("chatMessage").value;
    //send message to all of the users
    connectionChat.send("SenMessageToAll", sender, message).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});


//start connection
function fulfilled() {

    //do something on start
    console.log("Connection to Chat Hub Successful");
    btn_send_message.disabled = false;
}
function rejected() {
    //rejected logs
}

connectionChat.start().then(fulfilled, rejected);
