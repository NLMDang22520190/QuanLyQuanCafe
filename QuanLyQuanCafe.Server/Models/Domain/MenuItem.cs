using System;
using System.Collections.Generic;

namespace QuanLyQuanCafe.Server.Models;

public partial class MenuItem
{
    public int ItemId { get; set; }

    public string ItemName { get; set; } = null!;

    public string? Description { get; set; }

    public int TypeOfFoodId { get; set; }

    public double Price { get; set; }

    public string? State { get; set; }

    public string? Picture { get; set; }

    public virtual ICollection<CartDetail> CartDetails { get; set; } = new List<CartDetail>();

    public virtual ICollection<ItemRecipe> ItemRecipes { get; set; } = new List<ItemRecipe>();

    public virtual ICollection<OrderDetail> OrderDetails { get; set; } = new List<OrderDetail>();

    public virtual FoodType TypeOfFood { get; set; } = null!;
}
