using Microsoft.AspNetCore.SignalR;

namespace SignalRSample.Hubs
{
    public class ChatHub : Hub
    {
        public async Task SenMessageToAll(string sender, string message)
        {
            await Clients.All.SendAsync("MessageRecieved", sender, message);
        }
    }
}
