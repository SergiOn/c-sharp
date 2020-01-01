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
            var user = await context.Users.Include(p => p.Photos).FirstOrDefaultAsync(u => u.Id == id);
            // var user = await context.Users.FirstOrDefaultAsync(u => u.Id == id);
            return user;
        }

        public async Task<PagedList<User>> GetUsers(UserParams userParams) {
            // var users = await context.Users.ToListAsync();
            var minDateOfBirth = DateTime.Today.AddYears(-userParams.MaxAge - 1);
            var maxDateOfBirth = DateTime.Today.AddYears(-userParams.MinAge);
            var orderByCreated = userParams.OrderBy == "created";
            
            var users = context.Users
                .Include(p => p.Photos)
                .Where(u => u.Id != userParams.UserId)
                .Where(u => u.Gender == userParams.Gender)
                // .AsEnumerable()
                .Where(u => u.DateOfBirth >= minDateOfBirth && u.DateOfBirth <= maxDateOfBirth)
                .OrderByDescending(u => orderByCreated ? u.Created : u.LastActive);
                // .AsQueryable();

            return await PagedList<User>.CreateAsync(users, userParams.PageNumber, userParams.PageSize);
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

        public async Task<bool> SaveAll() {
            return await context.SaveChangesAsync() > 0;
        }

    }

}
