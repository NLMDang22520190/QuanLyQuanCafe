import { useState } from "react";
import { RoundedButton } from "../../components/buttons/RoundedButton"
import { RoundedTextField } from "../../components/textfields/RoundedTextField"
import { RoundedComboBox } from "../../components/combobox/RoundedComboBox";
import Avatar from "../../components/avatar/Avatar";
import { Navigate } from "react-router-dom";

export const AddMaterials = () => {
    
    const [imagePreview, setImagePreview] = useState(null);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setImagePreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="flex flex-col md:flex-row p-6 bg-gray-800 h-screen gap-8 text-gray-200">
               {/* Left Section */}
               <div className="w-full md:w-1/3 flex flex-col items-center gap-4">
                {/* Static Profile Image */}
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

            {/* Right Section */}
            <div className="w-full md:w-2/3 bg-gray-900 p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-6 text-yellow-500">Nhập nguyên liệu</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Tên mặt hàng */}
                    <RoundedTextField
                        placeholder="VD: Thịt bò"
                        label="Tên mặt hàng (*)"
                        textColor="text-gray-200"
                        bgColor="bg-gray-800"
                    />

                    {/* Loại mặt hàng */}
                    <RoundedComboBox
                        placeholder="--Chọn loại--"
                        label="Loại mặt hàng (*)"
                        options={[
                            { value: "seafood", label: "Hải sản" },
                            { value: "meat", label: "Thịt" },
                            { value: "vegetables", label: "Rau củ" },
                        ]}
                        textColor="text-gray-200"
                        bgColor="bg-gray-800"
                    />

                    {/* Đơn vị tính */}
                    <RoundedComboBox
                        placeholder="--Chọn đơn vị--"
                        label="Đơn vị tính (*)"
                        options={[
                            { value: "kg", label: "Kilogram" },
                            { value: "pcs", label: "Piece" },
                            { value: "ltr", label: "Liter" },
                        ]}
                        textColor="text-gray-200"
                        bgColor="bg-gray-800"
                    />

                    {/* Ghi chú */}
                    <RoundedTextField
                        placeholder="VD: Được tùy chọn"
                        label="Ghi chú"
                        textColor="text-gray-200"
                        bgColor="bg-gray-800"
                    />
                </div>

                {/* Giá mặt hàng */}
                <div className="mt-6">
                    <h3 className="font-semibold text-lg text-yellow-500">Giá nguyên liệu</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                        <RoundedTextField
                            placeholder="Giá (*)"
                            label="Giá (*)"
                            textColor="text-gray-200"
                            bgColor="bg-gray-800"
                        />
                        <RoundedTextField
                            placeholder="0"
                            label="Số lượng (*)"
                            textColor="text-gray-200"
                            bgColor="bg-gray-800"
                        />
                        <RoundedTextField
                            placeholder="0 đ"
                            label="Thành tiền (*)"
                            textColor="text-gray-200"
                            bgColor="bg-gray-800"
                        />
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex justify-between items-center mt-8">
                    <RoundedButton
                        label="Quay lại"
                        onClick={() => Navigate("/dashboard")}
                        className="bg-gray-600 hover:bg-gray-700 text-gray-200 px-6 py-2 rounded-md"
                    />
                    <RoundedButton
                        label="Lưu lại"
                        onClick={() => alert("Lưu lại!")}
                        className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-2 rounded-md"
                    />
                </div>
            </div>
        </div>
    );
};
