//create connection
var connectionUserCount = new SignalR.HubConnectionBuilder.withUrl("/hubs/usersCount").Build();

//connect to methods that hub invokes aka receive notfications from hub
connectionUserCount.on("upateTotlViews", (value) => {
    var newCountSpan = document.getElementById("totalViewsCounter");
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
}

function rejected() {
    //rejected logs
}

connectionUserCount.start().then(fulfilled, rejected);