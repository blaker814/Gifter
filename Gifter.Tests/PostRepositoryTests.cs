using Gifter.Models;
using Gifter.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Xunit;

namespace Gifter.Tests
{
    public class PostRepositoryTests : EFTestFixture
    {
        public PostRepositoryTests()
        {
            AddSampleData();
        }

        [Fact]
        public void Search_Should_Match_A_Posts_Title()
        {
            var repo = new PostRepository(_context);
            var results = repo.Search("Dude", false);

            Assert.Equal(2, results.Count);
            Assert.Equal("El Duderino", results[0].Title);
            Assert.Equal("The Dude", results[1].Title);
        }

        [Fact]
        public void Search_Should_Match_A_Posts_Caption()
        {
            var repo = new PostRepository(_context);
            var results = repo.Search("it is no dream", false);

            Assert.Single(results);
            Assert.Equal("If you will it, Dude, it is no dream", results[0].Caption);
        }

        [Fact]
        public void Search_Should_Return_Empty_List_If_No_Matches()
        {
            var repo = new PostRepository(_context);
            var results = repo.Search("foobarbazcatgrill", false);

            Assert.NotNull(results);
            Assert.Empty(results);
        }

        [Fact]
        public void Search_Can_Return_Most_Recent_First()
        {
            var mostRecentTitle = "The Dude";
            var repo = new PostRepository(_context);
            var results = repo.Search("", true);

            Assert.Equal(4, results.Count);
            Assert.Equal(mostRecentTitle, results[0].Title);
        }

        [Fact]
        public void Search_Can_Return_Most_Recent_Last()
        {
            var mostRecentTitle = "The Dude";
            var repo = new PostRepository(_context);
            var results = repo.Search("", false);

            Assert.Equal(4, results.Count);
            Assert.Equal(mostRecentTitle, results[3].Title);
        }

        [Fact]
        public void User_Can_Delete_Post_With_Comment()
        {
            var postIdWithComment = 2;
            var repo = new PostRepository(_context);

            // Attempt to delete it
            repo.Delete(postIdWithComment);

            // Now attempt to get it
            var result = repo.GetById(postIdWithComment);

            Assert.Null(result);
        }


        [Fact]
        public void Get_Posts_By_Profile_Id_Returns_Posts_In_Alphabetical_Order()
        {
            var userProfileId = 2;
            var repo = new PostRepository(_context);

            // Now attempt to get it
            var results = repo.GetByUserProfileId(userProfileId);

            Assert.Equal(2, results.Count);
            Assert.Equal("Bowling", results[0].Title);
            Assert.Equal("El Duderino", results[1].Title);
        }

        [Fact]
        public void Get_Posts_By_Profile_Id_Returns_Only_That_Users_Posts()
        {
            var userProfileId = 1;
            var repo = new PostRepository(_context);

            // Now attempt to get it
            var results = repo.GetByUserProfileId(userProfileId);

            Assert.True(!results.Any(result => result.UserProfile.Name != "Walter"));
        }

        [Fact]
        public void Get_Posts_By_Profile_Id_Returns_Empty_List_When_Id_Does_Not_Exist()
        {
            var userProfileId = 1000;
            var repo = new PostRepository(_context);

            // Now attempt to get it
            var results = repo.GetByUserProfileId(userProfileId);

            Assert.Empty(results);
        }

        // Add sample data
        private void AddSampleData()
        {
            var user1 = new UserProfile()
            {
                Name = "Walter",
                Email = "walter@gmail.com",
                DateCreated = DateTime.Now - TimeSpan.FromDays(365)
                //FirebaseUserId = "TEST_FIREBASE_UID_1"
            };

            var user2 = new UserProfile()
            {
                Name = "Donny",
                Email = "donny@gmail.com",
                DateCreated = DateTime.Now - TimeSpan.FromDays(400)
                //FirebaseUserId = "TEST_FIREBASE_UID_2"
            };

            var user3 = new UserProfile()
            {
                Name = "The Dude",
                Email = "thedude@gmail.com",
                DateCreated = DateTime.Now - TimeSpan.FromDays(400)
                //FirebaseUserId = "TEST_FIREBASE_UID_3"
            };

            _context.Add(user1);
            _context.Add(user2);
            _context.Add(user3);

            var post1 = new Post()
            {
                Caption = "If you will it, Dude, it is no dream",
                Title = "The Dude",
                ImageUrl = "http://foo.gif",
                UserProfile = user1,
                DateCreated = DateTime.Now - TimeSpan.FromDays(10)
            };

            var post2 = new Post()
            {
                Caption = "If you're not into the whole brevity thing",
                Title = "El Duderino",
                ImageUrl = "http://foo.gif",
                UserProfile = user2,
                DateCreated = DateTime.Now - TimeSpan.FromDays(11),
            };

            var post3 = new Post()
            {
                Caption = "It really ties the room together",
                Title = "My Rug",
                ImageUrl = "http://foo.gif",
                UserProfile = user3,
                DateCreated = DateTime.Now - TimeSpan.FromDays(12),
            };

            var post4 = new Post()
            {
                Caption = "Yeah man",
                Title = "Bowling",
                ImageUrl = "http://foo.gif",
                UserProfile = user2,
                DateCreated = DateTime.Now - TimeSpan.FromDays(13),
            };

            var comment1 = new Comment()
            {
                Post = post2,
                Message = "This is great",
                UserProfile = user3
            };

            var comment2 = new Comment()
            {
                Post = post2,
                Message = "The post really tied the room together",
                UserProfile = user2
            };

            _context.Add(post1);
            _context.Add(post2);
            _context.Add(post3);
            _context.Add(post4);
            _context.Add(comment1);
            _context.Add(comment2);
            _context.SaveChanges();
        }
    }
}
