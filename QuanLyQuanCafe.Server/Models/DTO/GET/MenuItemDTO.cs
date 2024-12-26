namespace QuanLyQuanCafe.Server.Models.DTO.GET
{
	public class MenuItemDTO
	{
		public int ItemId { get; set; }               // The unique identifier for the menu item
		public string? ItemName { get; set; }          // The name of the menu item (nullable)
		public string? Description { get; set; }       // A description of the menu item (nullable)
		public int TypeOfFoodId { get; set; }          // The category or type of food for the menu item
		public decimal Price { get; set; }             // The price of the menu item
		public string? State { get; set; }             // The state of the item, such as "Available" or "Out of stock" (nullable)
		public string? Picture { get; set; }           // URL or path of the item's picture (nullable)
		public string TypeOfFood { get; set; }         // The name of the food type (category) this item belongs to
	}
}
