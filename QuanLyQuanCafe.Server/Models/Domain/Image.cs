using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace QuanLyQuanCafe.Server.Models;
[Table("Image")]

public partial class Image
{
    [Key]
    public int ImageId { get; set; }

    public string ImageName { get; set; }  
    
    public string ImageData { get; set; }
} 


