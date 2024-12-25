using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace QuanLyQuanCafe.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImageController : ControllerBase
    {

        [HttpGet("{imageName}")]
        public IActionResult GetImage(string imageName)
        {
           
            var folderPath = Path.Combine(Directory.GetCurrentDirectory(), "Image");

          
            var filePath = Path.Combine(folderPath, imageName);

            if (!System.IO.File.Exists(filePath))
            {
                return NotFound("Image not found.");
            }

      
            var fileBytes = System.IO.File.ReadAllBytes(filePath);
            var contentType = GetContentType(filePath); 
            return File(fileBytes, contentType);
        }



        [HttpPut("{imageName}")]
        public async Task<IActionResult> UpdateImage(string imageName, IFormFile file)
        {
            if (file == null || file.Length == 0)
            {
                return BadRequest("File is required.");
            }

            try
            {
               
                var fileExtension = Path.GetExtension(file.FileName);
                if (string.IsNullOrEmpty(fileExtension))
                {
                    return BadRequest("Invalid file format. File must have an extension.");
                }

                var fileNameWithExtension = $"{imageName}{fileExtension}";

               
                var folderPath = Path.Combine(Directory.GetCurrentDirectory(), "Image");

              
                Directory.CreateDirectory(folderPath);

              
                var newFilePath = Path.Combine(folderPath, fileNameWithExtension);

              
                using (var stream = new FileStream(newFilePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }

                return Ok(new { message = "Image updated successfully.", fileName = fileNameWithExtension });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error saving file: {ex.Message}");
                return StatusCode(500, "Internal server error while saving the file.");
            }
        }




        private string GetContentType(string filePath)
        {
            var provider = new Microsoft.AspNetCore.StaticFiles.FileExtensionContentTypeProvider();
            if (!provider.TryGetContentType(filePath, out var contentType))
            {
                contentType = "application/octet-stream";
            }
            return contentType;
        }

    }
}
