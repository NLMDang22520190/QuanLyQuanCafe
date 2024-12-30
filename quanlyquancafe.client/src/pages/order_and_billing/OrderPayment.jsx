import { useState } from "react";
import { RoundedButton } from "../../components/buttons/RoundedButton"
import { OrderProductCard } from "../../components/card/OrderProductCard";
import { RoundedTextField } from "../../components/textfields/RoundedTextField"
import { DiningOption } from '../../constant/DiningOption'
import { SelectedOrderProductCard } from '../../components/card/SelectedOrderProductCard'
import { RoundedComboBox } from "../../components/combobox/RoundedComboBox";
import { PaymentMethod } from "../../constant/PaymentMethod";
import { Currency } from '../../constant/Currency';
import { Space, QRCode, Button } from "antd";
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';

const MIN_SIZE = 48;
const MAX_SIZE = 300;

export const OrderPayment = ({onBack}) => {
    const [diningOption, setDiningOption] = useState(DiningOption.DineIn);
    const [totalAmount, setTotalAmount] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState(PaymentMethod.Cash);
    const [currency, setCurrency] = useState()
    const [size, setSize] = useState(160);

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
            
            <div className="flex max-h-[calc(100vh-180px)]  min-h-[calc(100vh-180px)] w-full gap-x-4">
                <div className="bg-gray-800/60 w-2/3 rounded-lg flex gap-x-8 p-4">
                    <Button type="text" onClick={onBack}>Back</Button>
                    <div className="flex flex-col justify-between w-full py-14">
                        <div className="flex flex-col items-center" >

                            <>
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
                            </>
                            <p>Scan this code to initiate payment.</p>
                        </div>

                        <div className="flex gap-x-8">
                            <div className="flex flex-col w-1/2 gap-y-4">
                                <p className="text-xl">Choose Payment method:</p>
                                <RoundedButton
                                    onClick={() => setPaymentMethod(PaymentMethod.Cash)}
                                    label={PaymentMethod.Cash}
                                    style={paymentMethod != PaymentMethod.Cash ? "rounded-md bg-gray-500/10 border border-amber-500" : "rounded-md text-black hover:bg-amber-600 bg-amber-500"}
                                    paddingX="100px"
                                    height="40px"
                                />

                                <RoundedButton
                                    onClick={() => setPaymentMethod(PaymentMethod.BankTransfer)}
                                    label={PaymentMethod.BankTransfer}
                                    style={paymentMethod != PaymentMethod.BankTransfer ? "rounded-md bg-gray-500/10 border border-amber-500" : "rounded-md text-black hover:bg-amber-600 bg-amber-500"}
                                    paddingX="100px"
                                    height="40px"
                                />
                                <RoundedButton
                                    onClick={() => setPaymentMethod(PaymentMethod.Momo)}
                                    label={PaymentMethod.Momo}
                                    style={paymentMethod != PaymentMethod.Momo ? "rounded-md bg-gray-500/10 border border-amber-500" : "rounded-md text-black hover:bg-amber-600 bg-amber-500"}
                                    paddingX="100px"
                                    height="40px"
                                />
                                <RoundedButton
                                    onClick={() => setPaymentMethod(PaymentMethod.Credit)}
                                    label={PaymentMethod.Credit}
                                    style={paymentMethod != PaymentMethod.Credit ? "rounded-md bg-gray-500/10 border border-amber-500" : "rounded-md text-black hover:bg-amber-600 bg-amber-500"}
                                    paddingX="100px"
                                    height="40px"
                                />
                            </div>

                            <div className="flex flex-col w-1/2 gap-y-4">
                                <p className="text-xl">Choose Currency:</p>
                                <RoundedButton
                                    onClick={() => setCurrency(Currency.VND)}
                                    label={Currency.VND}
                                    style={currency != Currency.VND ? "rounded-md bg-gray-500/10 border border-amber-500" : "rounded-md text-black hover:bg-amber-600 bg-amber-500"}
                                    paddingX="100px"
                                    height="40px"
                                />

                                <RoundedButton
                                    onClick={() => setCurrency(Currency.USD)}
                                    label={Currency.USD}
                                    style={currency != Currency.USD ? "rounded-md bg-gray-500/10 border border-amber-500" : "rounded-md text-black hover:bg-amber-600 bg-amber-500"}
                                    paddingX="100px"
                                    height="40px"
                                />
                            </div>
                        </div>


                    </div>

                </div>
                <div className="flex flex-col bg-gray-800/60 w-1/3 rounded-lg p-4 gap-y-4">
                    <div className="flex flex-col grow">
                        <div className="flex justify-between gap-y-2">
                            <p>Total Amount:</p>
                            <p>0$</p>
                        </div>
                        <div className="flex justify-between">
                            <p>Discount:</p>
                            <p>0$</p>
                        </div>
                        <div className="flex justify-between">
                            <p>Final Amount:</p>
                            <p>0$</p>
                        </div>
                        <div className="flex justify-between">
                            <p>Payment Method:</p>
                            <p>{paymentMethod}</p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-y-4">
                        <div className="flex justify-between">
                            <p>Given money:</p>
                            <p>$0</p>
                        </div>

                        <div className="flex justify-between ">
                            <p>Change:</p>
                            <p>$0</p>
                        </div>

                        <div>
                            <Button>Submit</Button>
                        </div>
                    </div>



                </div>
            </div>
        </div>
    )
}