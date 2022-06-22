//create connection
var connectionUserCount = new signalR.HubConnectionBuilder().withUrl("/hubs/usersCount").build();

//connect to methods that hub invokes aka receive notfications from hub
connectionUserCount.on("upateTotalViews", (value) => {
    var newCountSpan = document.getElementById("totalViewsCounter");
    newCountSpan.innerText = value.toString();
});

connectionUserCount.on("upateTotalUsers", (value) => {
    var newCountSpan = document.getElementById("totalUsersCounter");
    newCountSpan.innerText = value.toString();
});

//invoke hub methods aka send notification to hub
function newWindowLoadedOnClient() {
    connectionUserCount.send("NewWindowLoaded");
}

//start connection
function fulfilled() {
    //do something on start
    console.log("Connection to User Hub Successful");
    newWindowLoadedOnClient();
}

function rejected() {
    //rejected logs
}

connectionUserCount.start().then(fulfilled, rejected);



//Create SignalR Hub
//Add method to Hub
//Add client side SignalR
//Connect to SignalR Hub from client js
//Call SignalR Hub method
//SignalR Hub invoke method in client js to notify clients
//Client recieve updates from SignalR hub and perform actions