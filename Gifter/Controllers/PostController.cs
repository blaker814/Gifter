using Microsoft.AspNetCore.Mvc;
using Gifter.Data;
using Gifter.Repositories;
using Gifter.Models;
using System;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace Gifter.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }

        private readonly IPostRepository _postRepository;
        private readonly IUserProfileRepository _userProfileRepository;
        public PostController(IPostRepository postRepository, IUserProfileRepository userProfileRepo)
        {
            _postRepository = postRepository;
            _userProfileRepository = userProfileRepo;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_postRepository.GetAll());
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var post = _postRepository.GetById(id);
            if (post == null)
            {
                return NotFound();
            }
            return Ok(post);
        }

        [HttpGet("getbyuser/{id}")]
        public IActionResult GetByUser(int id)
        {
            return Ok(_postRepository.GetByUserProfileId(id));
        }

        [HttpGet("search")]
        public IActionResult Search(string q, bool sortDesc)
        {
            if (q == null)
            {
                return Ok(_postRepository.GetAll());
            }

            return Ok(_postRepository.Search(q, sortDesc));
        }

        [HttpGet("hottest")]
        public IActionResult Filter(DateTime since, bool sortDesc)
        {
            return Ok(_postRepository.Filter(since, sortDesc));
        }

        [HttpPost]
        public IActionResult Post(Post post)
        {
            var user = GetCurrentUserProfile();
            post.UserProfileId = user.Id;
            post.DateCreated = DateTime.Now;
            _postRepository.Add(post);
            return Ok(post);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Post post)
        {
            if (id != post.Id)
            {
                return BadRequest();
            }

            _postRepository.Update(post);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _postRepository.Delete(id);
            return NoContent();
        }
    }
}
