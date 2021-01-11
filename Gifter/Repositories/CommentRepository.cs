using Gifter.Data;
using Gifter.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Gifter.Repositories
{
    public class CommentRepository : ICommentRepository
    {
        private readonly ApplicationDbContext _context;

        public CommentRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<Comment> GetAll()
        {
            return _context.Comment
                .Include(c => c.Post)
                .ThenInclude(p => p.UserProfile)
                .Include(c => c.UserProfile)
                .ToList();
        }

        public Comment GetById(int id)
        {
            return _context.Comment
                .Include(c => c.Post)
                .ThenInclude(p => p.UserProfile)
                .Include(c => c.UserProfile)
                .FirstOrDefault(p => p.Id == id);
        }

        public List<Comment> GetByPostId(int id)
        {
            return _context.Comment
                .Include(c => c.Post)
                .ThenInclude(p => p.UserProfile)
                .Include(c => c.UserProfile)
                .Where(c => c.PostId == id)
                .ToList();
        }

        public void Add(Comment comment)
        {
            _context.Add(comment);
            _context.SaveChanges();
        }

        public void Update(Comment comment)
        {
            _context.Entry(comment).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var comment = GetById(id);
            _context.Comment.Remove(comment);
            _context.SaveChanges();
        }
    }
}
