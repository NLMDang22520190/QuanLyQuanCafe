import React, { useState, useEffect } from "react";
import { RoundedButton } from "../../components/buttons/RoundedButton";
import { RoundedTextField } from "../../components/textfields/RoundedTextField";
import { RoundedComboBox } from "../../components/combobox/RoundedComboBox";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const AddMaterials = () => {
    const navigate = useNavigate();

    const [currentDateTime, setCurrentDateTime] = useState(""); 
    const [materialName, setMaterialName] = useState(""); 
    const [unit, setUnit] = useState(""); 
    const [quantity, setQuantity] = useState(0); 
    const [price, setPrice] = useState(0); 
    const [totalPrice, setTotalPrice] = useState(0); 

    useEffect(() => {
        const now = new Date();
        const formattedDateTime = now.toISOString().split("T")[0]; 
        setCurrentDateTime(formattedDateTime);
    }, []);

    useEffect(() => {
        setTotalPrice(price * quantity);
    }, [price, quantity]);

    const handleSave = async () => {
        console.log("Tên mặt hàng:", materialName);
        console.log("Đơn vị tính:", unit);
        console.log("Số lượng:", quantity);
        console.log("Giá:", price);

        if (!materialName || !unit || quantity <= 0 || price <= 0) {
            alert("Vui lòng nhập đầy đủ thông tin bắt buộc.");
            return;
        }

        const newMaterial = {
            newRecord: {
                ingredientId: 0, 
                dateImport: currentDateTime,
                quantityImport: quantity,
                importPrice: price,
            },
            ingredientName: materialName, 
            unit: unit, 
        };

        console.log("Payload gửi đi:", newMaterial);

        try {
            const response = await axios.post("https://localhost:7087/api/import-record", newMaterial);

            if (response.status === 201) {
                alert("Nhập nguyên liệu thành công!");
                navigate("/inventory");
            }
        } catch (error) {
            console.error("Lỗi khi lưu nguyên liệu:", error.response?.data || error.message);
            alert(error.response?.data?.error || "Không thể lưu nguyên liệu. Vui lòng thử lại.");
        }
    };

    return (
        <div className="flex flex-col md:flex-row p-6 bg-gray-800 h-screen gap-8 text-gray-200">
            <div className="w-full md:w-1/3 flex flex-col items-center gap-4">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 border-4 border-yellow-500">
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/147/147144.png"
                            alt="Default Profile"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <p className="text-lg text-yellow-500 font-semibold">Name Admin</p>
                </div>
            </div>

            <div className="w-full md:w-2/3 bg-gray-900 p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-6 text-yellow-500">Nhập nguyên liệu</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">   
                    <RoundedTextField
                        label="Tên mặt hàng (*)"
                        value={materialName}
                        onValueChange={(newValue) => setMaterialName(newValue)}
                        textColor="text-gray-200"
                        bgColor="bg-gray-800"
                    />

               
                    <RoundedTextField
                        label="Ngày nhập"
                        value={currentDateTime}
                        readOnly={true}
                        textColor="text-gray-200"
                        style="border-gray-700 rounded-md"
                        width="100%"
                        height="40px"
                    />

           
                    <RoundedComboBox
                        placeholder="--Chọn đơn vị--"
                        label="Đơn vị tính (*)"
                        options={[
                            { value: "kg", label: "Kilogram" },
                            { value: "pcs", label: "Piece" },
                            { value: "ltr", label: "Liter" },
                        ]}
                        value={unit}
                        onValueChange={(value) => setUnit(value)}
                        textColor="text-gray-200"
                        bgColor="bg-gray-800"
                    />
                </div>

           
                <div className="mt-6">
                    <h3 className="font-semibold text-lg text-yellow-500">Giá nguyên liệu</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                        {/* Giá */}
                        <RoundedTextField
                            placeholder="Giá (*)"
                            label="Giá (*)"
                            value={price}
                            onValueChange={(newValue) => setPrice(Number(newValue) || 0)}
                            textColor="text-gray-200"
                            bgColor="bg-gray-800"
                        />
             
                        <RoundedTextField
                            placeholder="Số lượng (*)"
                            label="Số lượng (*)"
                            value={quantity}
                            onValueChange={(newValue) => setQuantity(Number(newValue) || 0)}
                            textColor="text-gray-200"
                            bgColor="bg-gray-800"
                        />
           
                        <RoundedTextField
                            placeholder="0 đ"
                            label="Thành tiền (*)"
                            value={totalPrice.toLocaleString("vi-VN", {
                                style: "currency",
                                currency: "VND",
                            })}
                            readOnly
                            textColor="text-gray-200"
                            bgColor="bg-gray-800"
                        />
                    </div>
                </div>

       
                <div className="flex justify-between items-center mt-8">
                    <RoundedButton
                        label="Quay lại"
                        onClick={() => navigate("/inventory")}
                        className="bg-gray-600 hover:bg-gray-700 text-gray-200 px-6 py-2 rounded-md"
                    />
                    <RoundedButton
                        label="Lưu lại"
                        onClick={handleSave}
                        className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-2 rounded-md"
                    />
                </div>
            </div>
        </div>
    );
};
