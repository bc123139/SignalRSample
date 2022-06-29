var dataTable;
//create connection
var connectionOrder = new signalR.HubConnectionBuilder()
    //.configureLogging(signalR.LogLevel.Information)
    .withUrl("/hubs/order").build();

$(document).ready(function () {
    loadDataTable();
});

connectionOrder.on("newOrder", () => {
    dataTable.ajax.reload();
    toastr.success("New order recieved");
});


function loadDataTable() {

    dataTable = $('#tblData').DataTable({
        "ajax": {
            "url": "/Home/GetAllOrder"
        },
        "columns": [
            { "data": "id", "width": "5%" },
            { "data": "name", "width": "15%" },
            { "data": "itemName", "width": "15%" },
            { "data": "count", "width": "15%" },
            {
                "data": "id",
                "render": function (data) {
                    return `
                        <div class="w-75 btn-group" role="group">
                        <a href=""
                        class="btn btn-primary mx-2"> <i class="bi bi-pencil-square"></i> </a>
                      
					</div>
                        `
                },
                "width": "5%"
            }
        ]
    });
}


//start connection
function fulfilled() {

    //do something on start
    console.log("Connection to Order Hub Successful");
}
function rejected() {
    //rejected logs
}

connectionOrder.start().then(fulfilled, rejected);