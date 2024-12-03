using System;
using System.Collections.Generic;

namespace QuanLyQuanCafe.Server.Models;

public partial class Ingredient
{
    public int IngredientId { get; set; }

    public string IngredientName { get; set; } = null!;

    public string Unit { get; set; } = null!;

    public double QuantityInStock { get; set; }

    public DateOnly DateImported { get; set; }

    public DateOnly ExpiryDate { get; set; }

    public int ImporterId { get; set; }

    public double ImportPrice { get; set; }

    public virtual ICollection<ItemRecipe> ItemRecipes { get; set; } = new List<ItemRecipe>();
}
