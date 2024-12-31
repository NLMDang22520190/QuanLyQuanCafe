﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using QuanLyQuanCafe.Server.Repositories;
using System.Drawing;

namespace QuanLyQuanCafe.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImageController : ControllerBase
    {

        private readonly IImageRepository _imageRepository;

        public ImageController(IImageRepository imageRepository)
        {
            _imageRepository = imageRepository;
        }

        [HttpPost("upload")]
        public async Task<IActionResult> UploadImage(IFormFile file)
        {
            if (file == null || file.Length == 0)
            {
                return BadRequest("No file uploaded.");
            }

            try
            {
                using (var memoryStream = new MemoryStream())
                {
                    await file.CopyToAsync(memoryStream);

               
                    var base64Data = Convert.ToBase64String(memoryStream.ToArray());

                 
                    var newImage = new Models.Image
                    {
                        ImageName = file.FileName,
                        ImageData = base64Data 
                    };

                  
                    await _imageRepository.CreateAsync(newImage);
                    return Ok(new { ImageId = newImage.ImageId, ImageUrl = $"/api/image/{newImage.ImageId}" });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }




        [HttpGet("{id}")]
        public async Task<IActionResult> GetImage(int id)
        {
      
            var image = await _imageRepository.GetByIdAsync(img => img.ImageId == id);
            if (image == null)
                return NotFound("Image not found");

           
            var imageBytes = Convert.FromBase64String(image.ImageData);

        
            return File(imageBytes, "image/jpeg");
        }


        [HttpGet]
        public async Task<IActionResult> GetAllImages()
        {
            var images = await _imageRepository.GetAllAsync();
            return Ok(images.Select(img => new { img.ImageId, img.ImageName }));
        }

        [HttpGet("byIds")]
        public async Task<IActionResult> GetImagesByIds([FromQuery] List<int> ids)
        {
            if (ids == null || !ids.Any())
            {
            return BadRequest("No IDs provided.");
            }

            var images = await _imageRepository.GetImagesByIdsAsync(ids);

            foreach (var id in ids)
            {
            if (id <= 0)
            {
                return BadRequest("Invalid ID provided.");
            }
            }
            if (images == null || !images.Any())
            {
            return NotFound("No images found for the provided IDs.");
            }

            return Ok(images.Select(img => new { img.ImageId, img.ImageName, img.ImageData }));
        }

    }
}