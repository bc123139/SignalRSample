let btn_send_message = document.getElementById("sendMessage");
//create connection
var connectionBasicChat = new signalR.HubConnectionBuilder()
    //.configureLogging(signalR.LogLevel.Information)
    .withUrl("/hubs/basicchat").build();

btn_send_message.disabled = true;

connectionBasicChat.on("MessageRecieved", function (sender, message) {
    var li = document.createElement("li");
    li.textContent = `${sender} - ${message}`;
    document.getElementById("messagesList").appendChild(li);

});


btn_send_message.addEventListener("click", function (event) {
    var sender = document.getElementById("senderEmail").value;
    var message = document.getElementById("chatMessage").value;
    var reciever = document.getElementById("receiverEmail").value;
    if (reciever.length > 0) {

        connectionBasicChat.send("SenMessageToReciever", sender, reciever, message).catch(function (err) {
            return console.error(err.toString());
        });
    }
    else {
        //send message to all of the users
        connectionBasicChat.send("SenMessageToAll", sender, message).catch(function (err) {
            return console.error(err.toString());
        });
    }
   
    event.preventDefault();
});


//start connection
function fulfilled() {

    //do something on start
    console.log("Connection to Basic Chat Hub Successful");
    btn_send_message.disabled = false;
}
function rejected() {
    //rejected logs
}

connectionBasicChat.start().then(fulfilled, rejected);
