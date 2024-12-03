using System;
using System.Collections.Generic;

namespace QuanLyQuanCafe.Server.Models;

public partial class ItemRecipe
{
    public int ItemId { get; set; }

    public int IngredientId { get; set; }

    public double Quantity { get; set; }

    public virtual Ingredient Ingredient { get; set; } = null!;

    public virtual MenuItem Item { get; set; } = null!;
}
