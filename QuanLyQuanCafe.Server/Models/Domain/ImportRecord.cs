using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace QuanLyQuanCafe.Server.Models;
[Table("ImportRecord")]
public partial class ImportRecord
{
    [Key]   
    public int ImportRecordId { get; set; }

    [Required]
    public int IngredientId { get; set; }

    [Required]
    public DateOnly DateImport {  get; set; }

    [Required]
    public double QuantityImport { get; set; }

    [Required]
    public double ImportPrice { get; set; }

    public virtual Ingredient Ingredient { get; set; } = null!;

}
