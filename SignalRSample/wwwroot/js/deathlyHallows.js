var cloakSpan = document.getElementById("cloakCounter");
var stoneSpan = document.getElementById("stoneCounter");
var wandSpan = document.getElementById("wandCounter");
//create connection
var connectionDeathlyHallows = new signalR.HubConnectionBuilder()
    //.configureLogging(signalR.LogLevel.Information)
    .withUrl("/hubs/deathlyHallows", signalR.HttpTransportType.WebSockets).build();


//connect to methods that hub invokes aka receive notfications from hub
connectionUserCount.on("updateDealthyHallowCount", (cloak, stone, wand) => {
    cloakSpan.innerText = cloak;
    stoneSpan.innerText = stone;
    wandSpan.innerText = wand;
});


//start connection
function fulfilled() {
    //do something on start
    console.log("Connection to User Hub Successful");
    newWindowLoadedOnClient();
}

function rejected() {
    //rejected logs
}

connectionDeathlyHallows.start().then(fulfilled, rejected);