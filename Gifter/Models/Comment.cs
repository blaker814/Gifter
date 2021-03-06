﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Gifter.Models
{
    public class Comment
    {
        public int Id { get; set; }

        [Required]
        public int UserProfileId { get; set; }

        [Required]
        public int PostId { get; set; }

        [Required]
        [StringLength(255)]
        public string Message { get; set; }

        public Post Post { get; set; }

        public UserProfile UserProfile { get; set; }
    }
}
