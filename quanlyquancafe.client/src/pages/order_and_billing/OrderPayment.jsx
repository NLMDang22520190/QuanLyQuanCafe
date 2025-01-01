import { useState } from "react";
import { Button, Space, QRCode, Input, Select, Card, InputNumber } from "antd";
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { PaymentMethod } from "../../constant/PaymentMethod";
import { Currency } from '../../constant/Currency';
import { Form } from "antd";
import { useEffect } from "react";

const { Option } = Select;

const MIN_SIZE = 48;
const MAX_SIZE = 300;

export const OrderPayment = ({ onBack, totalAmount, discountAmount, finalAmount }) => {
    const [size, setSize] = useState(160);
    const [paymentMethod, setPaymentMethod] = useState(PaymentMethod.Cash);
    const [currency, setCurrency] = useState(Currency.VND);
    const [givenMoney, setGivenMoney] = useState(0);

    const increase = () => {
        setSize((prevSize) => {
            const newSize = prevSize + 10;
            if (newSize >= MAX_SIZE) {
                return MAX_SIZE;
            }
            return newSize;
        });
    };

    const decline = () => {
        setSize((prevSize) => {
            const newSize = prevSize - 10;
            if (newSize <= MIN_SIZE) {
                return MIN_SIZE;
            }
            return newSize;
        });
    };

    const qrData = `
    000201010211
    52040000
    5303986
    5802SG
    5405100.00
    5910SampleBank
    6010Singapore
    6304ABCD
`.replace(/\s+/g, '');

    return (
        <div className="flex flex-col gap-y-4 overflow-hidden h-full">
            <div className="flex max-h-[calc(100vh-180px)] min-h-[calc(100vh-180px)] w-full gap-x-4">
                <Card className="w-2/3 rounded-lg flex flex-col gap-x-8 p-4 justify-between">
                    <div className="flex w-full justify-start ">
                        <Button type="text" onClick={onBack}>Back</Button>
                    </div>

                    <div className="flex flex-col justify-center items-center w-full grow">
                        <div className="flex flex-col items-center">
                            <Button.Group style={{ marginBottom: 16 }}>
                                <Button onClick={decline} disabled={size <= MIN_SIZE} icon={<MinusOutlined />}>
                                    Smaller
                                </Button>
                                <Button onClick={increase} disabled={size >= MAX_SIZE} icon={<PlusOutlined />}>
                                    Larger
                                </Button>
                            </Button.Group>
                            <QRCode
                                errorLevel="H"
                                size={size}
                                iconSize={size / 4}
                                value="https://ant.design/"
                                icon="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
                            />
                            <p>Scan this code to initiate payment.</p>
                        </div>
                        <div className="flex gap-x-8 w-full">
                            <div className="flex flex-col w-1/2 gap-y-4">
                                <p className="text-xl">Choose Payment method:</p>
                                <Form.Item
                                    name={"paymentMethod"}
                                    rules={[{ required: true, message: 'Please select payment method!' }]}
                                >
                                    <Select
                                        value={paymentMethod}
                                        onChange={setPaymentMethod}
                                        style={{ width: '100%' }}
                                    >
                                        <Option value={PaymentMethod.Cash}>{PaymentMethod.Cash}</Option>
                                        <Option value={PaymentMethod.BankTransfer}>{PaymentMethod.BankTransfer}</Option>
                                        <Option value={PaymentMethod.Momo}>{PaymentMethod.Momo}</Option>
                                        <Option value={PaymentMethod.Credit}>{PaymentMethod.Credit}</Option>
                                    </Select>
                                </Form.Item>
                            </div>
                            <div className="flex flex-col w-1/2 gap-y-4">
                                <p className="text-xl">Choose Currency:</p>
                                <Form.Item
                                    name={"currency"}
                                >
                                    <Select
                                        value={currency}
                                        onChange={setCurrency}
                                        style={{ width: '100%' }}
                                        rules={[{ required: true, message: 'Please select currency!' }]}
                                    >
                                        <Option value={Currency.VND}>{Currency.VND}</Option>
                                        <Option value={Currency.USD}>{Currency.USD}</Option>
                                    </Select>
                                </Form.Item>
                            </div>
                        </div>
                    </div>
                </Card>
                <Card className="flex flex-col rounded-lg w-1/3 p-4 gap-y-4 justify-between">
                    <div className="flex flex-col gap-y-2">
                        <div className="flex justify-between gap-y-2">
                            <p>Total Amount:</p>
                            <p>${totalAmount.toFixed(2)}</p>
                        </div>
                        <div className="flex justify-between">
                            <p>Discount:</p>
                            <p>${discountAmount.toFixed(2)}</p>
                        </div>
                        <div className="flex justify-between">
                            <p>Final Amount:</p>
                            <p>${finalAmount.toFixed(2)}</p>
                        </div>
                        <div className="flex justify-between">
                            <p>Payment Method:</p>
                            <p>{paymentMethod}</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-y-4 mt-[100%]">
                        <div className="flex justify-between">
                            <p>Given money:</p>
                            <InputNumber onChange={setGivenMoney} min={0} defaultValue={0} />
                        </div>
                        <div className="flex justify-between">
                            <p>Change:</p>
                            <p>${ givenMoney - finalAmount }</p>
                        </div>
                        <div className="flex justify-center">
                            <Button htmlType="submit" type="primary">Submit payment</Button>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};
