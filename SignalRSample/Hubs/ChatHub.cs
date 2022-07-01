using Microsoft.AspNetCore.SignalR;
using SignalRSample.Data;
using System.Security.Claims;

namespace SignalRSample.Hubs
{
    public class ChatHub : Hub
    {
        private readonly ApplicationDbContext _db;
        public ChatHub(ApplicationDbContext db) 
        {
            _db = db;
        }

        public override Task OnConnectedAsync()
        {
            var userId = Context.User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (!string.IsNullOrEmpty(userId))
            {
                var userName=_db.Users.FirstOrDefault(x=>x.Id == userId)?.UserName;
                Clients.Users(HubConnections.OnlineUsers()).SendAsync("ReceiveUserConnected",userId,userName,HubConnections.HasUser(userId));  
                HubConnections.AddUserConnection(userId,Context.ConnectionId);
            }
            return base.OnConnectedAsync();
        }
        //public async Task SenMessageToAll(string sender, string message)
        //{
        //    await Clients.All.SendAsync("MessageRecieved", sender, message);
        //}

        //[Authorize]
        //public async Task SenMessageToReciever(string sender,string reciever, string message)
        //{
        //    var userId = _db.Users.FirstOrDefault(x => x.Email.ToLower() == reciever.ToLower())?.Id;
        //    if (!string.IsNullOrEmpty(userId))
        //    {
        //        await Clients.User(userId).SendAsync("MessageRecieved", sender, message);
        //    }
        //}
    }
}
