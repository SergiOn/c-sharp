using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DatingApp.API.Helpers;
using DatingApp.API.Models;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.API.Data {

    public class DatingRepository : IDatingRepository {

        private readonly DataContext context;

        public DatingRepository(DataContext context) {
            this.context = context;
        }

        public void Add<T>(T entity) where T : class {
            context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class {
            context.Remove(entity);
        }

        public async Task<User> GetUser(int id) {
            var user = await context.Users.FirstOrDefaultAsync(u => u.Id == id);
            return user;
        }

        public async Task<PagedList<User>> GetUsers(UserParams userParams) {
            // var users = await context.Users.ToListAsync();
            var minDateOfBirth = DateTime.Today.AddYears(-userParams.MaxAge - 1);
            var maxDateOfBirth = DateTime.Today.AddYears(-userParams.MinAge);
            var orderByCreated = userParams.OrderBy == "created";
            
            var users = context.Users
                .Where(u => u.Id != userParams.UserId)
                .Where(u => u.Gender == userParams.Gender)
                // .AsEnumerable()
                .Where(u => u.DateOfBirth >= minDateOfBirth && u.DateOfBirth <= maxDateOfBirth)
                .OrderByDescending(u => orderByCreated ? u.Created : u.LastActive)
                .AsQueryable();

            // if (userParams.Likers) {
            //     var userLikers = await GetUserLikes(userParams.UserId, userParams.Likers);
            //     users = users.Where(u => userLikers.Contains(u.Id));
            // }
            // if (userParams.Likees) {
            //     var userLikees = await GetUserLikes(userParams.UserId, userParams.Likers);
            //     users = users.Where(u => userLikees.Contains(u.Id));
            // }

            if (userParams.Likers || userParams.Likees) {
                var userLikes = await GetUserLikes(userParams.UserId, userParams.Likers);
                users = users.Where(u => userLikes.Contains(u.Id));
            }

            return await PagedList<User>.CreateAsync(users, userParams.PageNumber, userParams.PageSize);
        }

        private async Task<IEnumerable<int>> GetUserLikes(int id, bool likers) {
            var user = await context.Users
                .FirstOrDefaultAsync(u => u.Id == id);

            if (likers) {
                return user.Likers.Where(u => u.LikeeId == id).Select(i => i.LikerId);
            } else {
                return user.Likees.Where(u => u.LikerId == id).Select(i => i.LikeeId);
            }
        }

        public async Task<Photo> GetPhoto(int id) {
            var photo = await context.Photos.FirstOrDefaultAsync(p => p.Id == id);
            return photo;
        }

        public async Task<Photo> GetMainPhotoForUser(int userId) {
            return await context.Photos.Where(u => u.UserId == userId)
                .FirstOrDefaultAsync(p => p.IsMain);
        }

        public async Task<Like> GetLike(int userId, int recipientId) {
            return await context.Likes
                .FirstOrDefaultAsync(u => u.LikerId == userId && u.LikeeId == recipientId);
        }

        public async Task<Message> GetMessage(int id) {
            return await context.Messages.FirstOrDefaultAsync(m => m.Id == id);
        }

        public async Task<PagedList<Message>> GetMessagesForUser(MessageParams messageParams) {
            var messages = context.Messages
                .OrderByDescending(d => d.MessageSent)
                .AsQueryable();

            // switch (messageParams.MessageContainer) {
            //     case "Inbox":
            //         messages = messages.Where(u => u.RecipientId == messageParams.UserId && !u.RecipientDeleted);
            //         break;
            //     case "Outbox":
            //         messages = messages.Where(u => u.SenderId == messageParams.UserId && !u.SenderDeleted);
            //         break;
            //     default:
            //         messages = messages.Where(u => u.RecipientId == messageParams.UserId && !u.RecipientDeleted && !u.IsRead);
            //         break;
            // }

            messages = messageParams.MessageContainer switch {
                "Inbox" => messages.Where(u => u.RecipientId == messageParams.UserId && !u.RecipientDeleted),
                "Outbox" => messages.Where(u => u.SenderId == messageParams.UserId && !u.SenderDeleted),
                _ => messages.Where(u => u.RecipientId == messageParams.UserId && !u.RecipientDeleted && !u.IsRead)
            };

            return await PagedList<Message>.CreateAsync(messages, messageParams.PageNumber, messageParams.PageSize);
        }

        public async Task<IEnumerable<Message>> GetMessageThread(int userId, int recipientId) {
            var messages = await context.Messages
                .Where(m => m.RecipientId == userId && !m.RecipientDeleted && m.SenderId == recipientId
                            || m.RecipientId == recipientId && m.SenderId == userId && !m.SenderDeleted)
                .OrderByDescending(d => d.MessageSent)
                .ToListAsync();

            return messages;
        }

        public async Task<bool> SaveAll() {
            return await context.SaveChangesAsync() > 0;
        }

    }

}
