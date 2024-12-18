using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace QuanLyQuanCafe.Server.Models;
[Table("Ingredient")]
public partial class Ingredient

{
    [Key]
    public int IngredientId { get; set; }

    [Required]
    public string IngredientName { get; set; } = null!;

    [Required]
    public string Unit { get; set; } = null!;

    [Required]
    public double QuantityInStock { get; set; }

    [Required]
    public int ImporterId { get; set; }

    [Required]
    public double ImportPrice { get; set; }

    public virtual ICollection<ItemRecipe> ItemRecipes { get; set; } = new List<ItemRecipe>();
}
