import React, { useState, useEffect } from 'react';
import { Form, Input, InputNumber, Button, Upload, Select, Space, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import api from '../../features/AxiosInstance/AxiosInstance';


const { Option } = Select;
const CreateProduct = ({ onSubmit, onClose }) => {
    const [form] = Form.useForm();
    const [typeOfFoods, setTypeOfFoods] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    const [fileList, setFileList] = useState([]);
    const [isCreatingProduct, setIsCreatingProduct] = useState(false);

    const handleSubmit = async (values) => {
        setIsCreatingProduct(true);
        await uploadMenuItemImage(fileList[0].originFileObj).then(
            async (imageResponse) => {
                const imageId = imageResponse.imageId.toString();

                const product = {
                    itemName: values.itemName,
                    price: values.price,
                    typeOfFoodId: values.typeOfFoodId,
                    itemRecipes: values.itemRecipes,
                    picture: imageId,   
                    description: values.description,
                };
                if (product) {
                    await createNewProduct(product);
                    message.success('Product created successfully!');
                    form.resetFields();
                    onClose();
                }

            }
        ).catch(error => {
            message.error('There was an error uploading the image!');
        }).finally(() => {
            setIsCreatingProduct(false);
        });   
    };

    const fetchTypeOfFoods = async () => {
        try {
            const response = await fetch('https://localhost:7087/api/food-types');
            if (!response.ok) {
                message.error('Something went wrong!');
            }

            const data = await response.json();
            setTypeOfFoods(data);
        } catch (error) {
            console.log(error.message);
        }
    }

    const fetchIngredients = async () => {
        try {
            const response = await fetch('https://localhost:7087/api/ingredient');
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const data = await response.json();
            setIngredients(data);
        } catch (error) {
            console.log(error.message);
        }
    }

    const handleImageChange = (info) => {
        setFileList(info.fileList);
    }

    const createNewProduct = async (product) => {
        await api.post('api/menu-items/AddProduct', product).then(response => {
            if (response.status === 201) {
                onSubmit();
            }
        }).catch(error => {     
            console.error('There was an error!', error);
        });
    }

    const uploadMenuItemImage = async (file) => {
        const formData = new FormData();
        formData.append('file', file);

        const response = await axios.post('https://localhost:7087/api/Image/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    }

    useEffect(() => {
        fetchTypeOfFoods();
        fetchIngredients();
    }, []);

    return (
        <Form
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 34 }}
            layout="horizontal"
            onFinish={handleSubmit}
        >
            <Form.Item
                label="Image"
                name="image"
                rules={[{ required: true, message: 'Please upload an image!' }]}
            >
                <Upload
                    name="image"
                    listType="picture"
                    fileList={fileList}
                    beforeUpload={() => false}
                    onChange={handleImageChange}
                >
                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
            </Form.Item>
            <Form.Item
                label="Product Name"
                name="itemName"
                rules={[{ required: true, message: 'Please enter product name!' }]}
            >
                <Input
                    name="itemName"
                    placeholder="Enter product name"
                    prefix={
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="gray"
                            className="size-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z"
                            />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 6h.008v.008H6V6Z"
                            />
                        </svg>
                    }
                />
            </Form.Item>
            <Form.Item
                label="Price"
                name="price"
                rules={[{ required: true, message: 'Please enter product price!' }]}
            >
                <InputNumber
                    name="price"
                    placeholder="Enter product price"
                    style={{ width: '50%' }}
                    prefix={
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="gray"
                            className="size-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
                            />
                        </svg>
                    }
                />
            </Form.Item>
            <Form.Item
                label="Category"
                name="typeOfFoodId"
                rules={[{ required: true, message: 'Please select a category!' }]}
            >
                <Select
                    name="typeOfFoodId"
                    placeholder="Select a category"
                    prefix={
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="gray"
                            className="size-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m21 7.5-2.25-1.313M21 7.5v2.25m0-2.25-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3 2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75 2.25-1.313M12 21.75V19.5m0 2.25-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25"
                            />
                        </svg>
                    }
                >
                    {typeOfFoods.map((type) => (
                        <Option key={type.typeOfFoodId} value={type.typeOfFoodId}>
                            {type.typeOfFoodName}
                        </Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item label="Ingredients" name="itemRecipes">
                <Form.List name="itemRecipes">
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(({ key, name, ...restField }, index) => (
                                <Space
                                    key={key}
                                    style={{ display: 'flex', marginBottom: 8 }}
                                    align="baseline"
                                >
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'ingredientId']}
                                        rules={[{ required: true, message: 'Please select an ingredient!' }]}
                                    >
                                        <Select placeholder="Select an ingredient">
                                            {ingredients.map((ingredient) => (
                                                <Option
                                                    key={ingredient.ingredientId}
                                                    value={ingredient.ingredientId}
                                                >
                                                    {ingredient.ingredientName}
                                                </Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'quantity']}
                                        rules={[{ required: true, message: 'Please enter quantity!' }]}
                                    >
                                        <InputNumber placeholder="Quantity" />
                                    </Form.Item>
                                    <MinusCircleOutlined onClick={() => remove(name)} />
                                </Space>
                            ))}
                            <Form.Item>
                                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                    Add Ingredient
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>
            </Form.Item>
            <Form.Item label="Description" name="description">
                <Input.TextArea name="description" placeholder="(Optional) Enter descriptions" />
            </Form.Item>
            <div className="flex justify-between">
                
                    <Button loading={isCreatingProduct} type="primary" htmlType="submit">
                        Save Change
                    </Button>
    
            </div>
        </Form>
    );
};

export default CreateProduct;