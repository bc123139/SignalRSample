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
                Clients.Users(HubConnections.OnlineUsers()).SendAsync("ReceiveUserConnected",userId,userName);  
                HubConnections.AddUserConnection(userId,Context.ConnectionId);
            }
            return base.OnConnectedAsync();
        }


        public override Task OnDisconnectedAsync(Exception? exception)
        {
            var UserId = Context.User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (HubConnections.HasUserConnection(UserId, Context.ConnectionId))
            {
                var UserConnections = HubConnections.Users[UserId];
                UserConnections.Remove(Context.ConnectionId);

                HubConnections.Users.Remove(UserId);
                if (UserConnections.Any())
                    HubConnections.Users.Add(UserId, UserConnections);
            }

            if (!string.IsNullOrEmpty(UserId))
            {
                var userName = _db.Users.FirstOrDefault(u => u.Id == UserId)?.UserName;
                Clients.Users(HubConnections.OnlineUsers()).SendAsync("ReceiveUserDisconnected", UserId, userName);
                HubConnections.AddUserConnection(UserId, Context.ConnectionId);
            }
            return base.OnDisconnectedAsync(exception);
        }

        public async Task SendAddRoomMessage(int maxRoom,int roomId, string roomName)
        {
            var userId = Context.User.FindFirstValue(ClaimTypes.NameIdentifier);
            var userName = _db.Users.FirstOrDefault(u => u.Id == userId)?.UserName;
            await Clients.All.SendAsync("ReceiveAddRoomMessage",maxRoom,roomId,roomName,userId,userName);
        }

        public async Task SendDeleteRoomMessage(int deleted, int selected, string roomName)
        {
            var UserId = Context.User.FindFirstValue(ClaimTypes.NameIdentifier);
            var userName = _db.Users.FirstOrDefault(u => u.Id == UserId)?.UserName;

            await Clients.All.SendAsync("ReceiveDeleteRoomMessage", deleted, selected, roomName, userName);
        }

        public async Task SendPublicMessage(int roomId, string message, string roomName)
        {
            var UserId = Context.User.FindFirstValue(ClaimTypes.NameIdentifier);
            var userName = _db.Users.FirstOrDefault(u => u.Id == UserId).UserName;

            await Clients.All.SendAsync("ReceivePublicMessage", roomId, UserId, userName, message, roomName);
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
