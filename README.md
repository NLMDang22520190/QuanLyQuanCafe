# Coffee Shop Management System

A comprehensive web-based application designed to streamline operations for coffee shops, including employee management, order processing, inventory tracking, and customer interactions.

## 1. Team Members

| No. | Student ID   | Full Name               | 
|-----|--------------|-------------------------|
| 1   | 22520190     | **Nguyen Luu Minh Dang (Leader)**    | 
| 2   | 21522808     | Vo Minh Vu              | 
| 3   | 22520020     | Nguyen Duy An           | 
| 4   | 22520187     | Bui Khanh Dang          | 
| 5   | 22520090     | Mai Thanh Bach          | 

## 2. Purpose and Reasons for Choosing the Topic

### Purpose
- Automate coffee shop operations: employee shifts, order management, inventory, and payroll.
- Replace manual processes with a digital solution to reduce errors and improve efficiency.
- Provide real-time analytics for business decisions.

### Reasons
- Growing demand for digital solutions in F&B management.
- Manual processes are time-consuming and prone to errors.
- Need for centralized data management across multiple locations.

## 3. Key Features

- **User Management**: Role-based access (Admin, Staff, Customer).
- **Shift Management**: Create shifts, assign staff, and track attendance.
- **Order Processing**: Handle in-store and online orders with multiple payment methods.
- **Inventory Management**: Track ingredients, set low-stock alerts, and manage suppliers.
- **Menu Management**: Add/update dishes, set promotions, and track availability.
- **Payroll System**: Automatically calculate salaries based on hours worked.
- **Reporting**: Generate sales, inventory, and employee performance reports.

## 4. Technologies Used

- **Frontend**: ReactJS, Redux, Material-UI
- **Backend**: ASP.NET Core, REST API
- **Database**: SQL Server, Entity Framework Core
- **Authentication**: JWT, ASP.NET Identity
- **Tools**: Visual Studio 2022, Swagger, Figma (UI Design)
- **Libraries**: AutoMapper

## 5. System Architecture
| ![](./ReadmeAssets/Architech.png) |
| :---------------------------: |
| _Overall Architecture_ |

- **Frontend**: Responsive UI built with ReactJS.
- **Backend**: Modular ASP.NET Core API handling business logic.
- **Database**: SQL Server for relational data storage.

## 6. User Guide

### **Customer:**

<details>
  <summary>Landing Page</summary>

| ![](./ReadmeAssets/User_Landing.png) |
| :----------------------------------: |
| _Landing Page Screen_ |

</details>

<details>
  <summary>Menu Page</summary>

| ![](./ReadmeAssets/User_Menu.png) |
| :----------------------------------: |
| _Menu Screen_ |

1. Select Product Type.
2. Select Product.

</details>

<details>
  <summary>Add to Cart Modal</summary>

| ![](./ReadmeAssets/User_AddToCart.png) |
| :----------------------------------: |
| _Add to Cart Screen_ |

1. Update Product Quantity.
2. Add Product To Cart.

</details>

<details>
  <summary>Order History Page</summary>

| ![](./ReadmeAssets/User_OrderHistory_List.png) |
| :----------------------------------: |
| _Order History List Screen_ |

1. View Order Details.

</details>

<details>
  <summary>Order Details Modal</summary>

| ![](./ReadmeAssets/User_OrderHistory_Details.png) |
| :----------------------------------: |
| _Order History Details Screen_ |

</details>

<details>
  <summary>Personal Information Page</summary>

| ![](./ReadmeAssets/User_PersonalInfo.png) |
| :----------------------------------: |
| _Personal Information Screen_ |

1. Enter Personal Information.
2. Update Information.
3. Logout.
4. Enter Password Information.
5. Update Password.

</details>

<details>
  <summary>Cart Page</summary>

| ![](./ReadmeAssets/User_Cart.png) |
| :----------------------------------: |
| _Cart Screen_ |

1. Update Product Quantity.
2. Remove Product From Cart.
3. Proceed To Checkout Page.

</details>

<details>
  <summary>Checkout Page</summary>

| ![](./ReadmeAssets/User_Checkout.png) |
| :----------------------------------: |
| _Checkout Screen_ |

1. Enter Checkout Information.
2. Select Payment Method.
3. Apply Promotion To Order.
4. Order.

</details>

### **Admin - Staff:**
<details>
  <summary>Dashboard Page</summary>

| ![](./ReadmeAssets/Admin_Dashboard_1.png) | ![](./ReadmeAssets/Admin_Dashboard_2.png) |
| :--------------------------------------: | :--------------------------------------: |
| _Admin Dashboard 1_ | _Admin Dashboard 2_ |

1. Dashboard Page.
2. Users Page.
3. Order & Billing Page.
4. Menu Page.
5. Inventory Page.
6. Promotion Page.
7. Schedule Page.
8. Settings Page.
9. Logout.

</details>

<details>
  <summary>Users Page</summary>
   

  <details>
  <summary>User List</summary>

| ![](./ReadmeAssets/Admin_User_List.png) |
| :----------------------------------: |
| _User List Screen_ |

1. Update User Role.
2. Activate/Deactivate User.
3. View User Orders.

  </details>

  <details>
  <summary>User Order History</summary>

| ![](./ReadmeAssets/Admin_User_OrderHistory.png) |
| :----------------------------------: |
| _User Order History Screen_ |

  </details>


  <details>
  <summary>Employee List</summary>

| ![](./ReadmeAssets/Admin_User_Employee_List.png) |
| :----------------------------------: |
| _Employee List Screen_ |

1. View Employee Details.
2. Remove Staff Role.
3. View Former Employee Details.

  </details>


  <details>
  <summary>Employee Details</summary>

| ![](./ReadmeAssets/Admin_User_Employee_Details.png) |
| :----------------------------------: |
| _Employee Details Screen_ |

1. Enter Hourly Wage Information.
2. Add New Hourly Wage.

  </details>

</details>

<details>
  <summary>Order & Billing Page</summary>

  <details>
  <summary>Order List</summary>

| ![](./ReadmeAssets/Admin_Order_List.png) |
| :----------------------------------: |
| _Order List Screen_ |

1. Search Order.
2. Export Order List To CSV.
3. Create New Order.
4. View Order Details.

</details>

<details>
  <summary>Order Details</summary>

| ![](./ReadmeAssets/Admin_Order_Details.png) |
| :----------------------------------: |
| _Order Details Screen_ |

1. Update Order Status.

</details>

<details>
  <summary>Create New Order</summary>

| ![](./ReadmeAssets/Admin_Order_CreateNew.png) |
| :----------------------------------: |
| _Create New Order Screen_ |

1. Search Product Name.
2. Select Product Type.
3. Select Product.
4. Change Product Quantity.
5. Remove Product From Order.
6. Enter Promotion For Order.
7. Apply Selected Promotion For Order.
8. Place Order.

</details>

<details>
  <summary>Create New Order - Payment</summary>

| ![](./ReadmeAssets/Admin_Order_CreateNew_Payment.png) |
| :----------------------------------: |
| _Create New Order Payment Screen_ |

1. Select Payment Method.
2. Money Customer Has Already Given.
3. Submit Payment.

</details>

<details>
  <summary>Create New Order - Print Invoice</summary>

| ![](./ReadmeAssets/Admin_Order_CreateNew_PrintInvoice.png) |
| :----------------------------------: |
| _Print Invoice Screen_ |

1. Print Order.
2. Done

</details>


</details>

<details>
  <summary>Menu Page</summary>

<details>
  <summary>Product List</summary>

| ![](./ReadmeAssets/Admin_Product_List.png) |
| :----------------------------------: |
| _Product List Screen_ |

1. Select Product Type.
2. Search Product Type.
3. Export Menu.
4. Add New Product Type.
5. Add New Product.
6. View Product Details.

</details>

<details>
  <summary>Create New Product & Product Details</summary>

| ![](./ReadmeAssets/Admin_Product_CreateNew.png) | ![](./ReadmeAssets/Admin_Product_Details.png) |
| :--------------------------------------------: | :----------------------------------------: |
| _Create New Product_ | _Product Details_ |

1. Enter/Edit Product Information.
2. Save Product.

</details>


</details>

<details>
  <summary>Inventory Page</summary>

| ![](./ReadmeAssets/Admin_Ingre_ImportHistory.png) | ![](./ReadmeAssets/Admin_Ingre_List.png) |
| :----------------------------------------------: | :--------------------------------------: |
| _Ingredient Import History_ | _Ingredient List_ |

1. View Current Ingredient List.
2. View Import Records.
3. Search Ingredient.
4. Export Ingredient Report.
5. Add New Ingredient.

</details>

<details>
  <summary>Promotion Page</summary>

<details>
  <summary>Promotion List</summary>

| ![](./ReadmeAssets/Admin_Promotion_List.png) |
| :----------------------------------: |
| _Promotion List Screen_ |

1. Search Promotion.
2. Export Promotion Report.
3. Create New Promotion.
4. View Promotion Details.

</details>

<details>
  <summary>Create New Promotion & Edit Promotion</summary>

| ![](./ReadmeAssets/Admin_Promotion_CreateNew.png) | ![](./ReadmeAssets/Admin_Promotion_Edit.png) |
| :----------------------------------------------: | :--------------------------------------: |
| _Create New Promotion_ | _Edit Promotion_ |

1. Enter Promotion Information.
2. Save Promotion.

</details>

</details>

<details>
  <summary>Schedule Page </summary>

<details>
  <summary>Shift List</summary>

| ![](./ReadmeAssets/Admin_Shift_List.png) |
| :----------------------------------: |
| _Shift List Screen_ |

1. Create New Shift.
2. Edit Selected Shift.
3. Assign Selected Shift.
4. Remove Selected Shift.

</details>

<details>
  <summary>Create New Shift</summary>

| ![](./ReadmeAssets/Admin_Shift_CreateNew.png) |
| :----------------------------------: |
| _Create New Shift Screen_ |

1. Enter Shift Information.
2. Save Shift.
3. Cancel

</details>

<details>
  <summary>Shift Assignments</summary>

| ![](./ReadmeAssets/Admin_Shift_Assignments.png) |
| :----------------------------------: |
| _Shift Assignments Screen_ |

1. Select Staff To Assign Shift.
2. Select Start Date.
3. Select End Date.
4. Add Assignment To Staff.
5. View Month Assignment.
6. Update End Date For Staff.

</details>

</details>












