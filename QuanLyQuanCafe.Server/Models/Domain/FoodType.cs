using System;
using System.Collections.Generic;

namespace QuanLyQuanCafe.Server.Models;

public partial class FoodType
{
    public int TypeOfFoodId { get; set; }

    public string TypeOfFoodName { get; set; } = null!;

    public string? Picture { get; set; }

    public virtual ICollection<MenuItem> MenuItems { get; set; } = new List<MenuItem>();
}
