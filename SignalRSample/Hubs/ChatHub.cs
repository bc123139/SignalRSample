using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using SignalRSample.Data;

namespace SignalRSample.Hubs
{
    public class ChatHub : Hub
    {
        private readonly ApplicationDbContext _db;
        public ChatHub(ApplicationDbContext db) 
        {
            _db = db;
        }
        public async Task SenMessageToAll(string sender, string message)
        {
            await Clients.All.SendAsync("MessageRecieved", sender, message);
        }

        [Authorize]
        public async Task SenMessageToReciever(string sender,string reciever, string message)
        {
            var userId = _db.Users.FirstOrDefault(x => x.Email.ToLower() == reciever.ToLower())?.Id;
            if (!string.IsNullOrEmpty(userId))
            {
                await Clients.User(userId).SendAsync("MessageRecieved", sender, message);
            }
        }
    }
}
