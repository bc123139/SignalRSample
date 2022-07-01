//create connection
var connectionChat = new signalR.HubConnectionBuilder()
    //.configureLogging(signalR.LogLevel.Information)
    .withUrl("/hubs/chat")
    .withAutomaticReconnect([0,1000,5000,null])
    .build();

connectionChat.on("ReceiveUserConnected", function (userId, userName) {
    addMessage(`${userName} has openned a connection`);
});

function addMessage(msg) {
    if (msg == null && msg == '') {
        return;
    }
    let ui = document.getElementById('messagesList');
    let li = document.createElement("li");
    li.innerHTML = msg;
    ui.appendChild(li);
}

//start connection
function fulfilled() {

    //do something on start
    console.log("Connection to Chat Hub Successful");
}
function rejected() {
    //rejected logs
}

connectionChat.start().then(fulfilled, rejected);
