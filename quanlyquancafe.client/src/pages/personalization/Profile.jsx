import { useNavigate } from "react-router-dom";
import { RoundedButton } from "../../components/buttons/RoundedButton"
import { TableLayout } from "../../components/tables/TableLayout"
import { RoundedTextField } from "../../components/textfields/RoundedTextField"
import { TableDetailType } from "../../constant/TableDetailType";
import Avatar from "../../components/avatar/Avatar";
import { RoundedDatePicker } from "../../components/pickers/RoundedPicker";
import { RoundedComboBox } from "../../components/combobox/RoundedComboBox";

export const Profile = () => {

    return (
        <div className="flex flex-col gap-y-4 overflow-hidden h-full px-10 py-2">
            <div className="flex justify-between items-center">
                <h2 className="text-amber-500 font-medium text-3xl">View & Edit Profile</h2>
            </div>
            <div className="flex h-full w-full bg-amber-500 rounded-lg ">

                <div className="w-1/3  flex flex-col p-2 text-black">
                    <div className="ms-4 mt-4 ">Back</div>
                    <div className="flex flex-col items-center gap-y-2">
                        <div className="w-3/5">
                            <Avatar size="100%" />
                        </div>
                        <p>Change Profile Picture</p>
                        <p className="text-2xl">Name</p>
                        <p className="text-md p-1 bg-black text-gray-300 rounded-md">@gmail.com</p>

                        <div className="flex flex-col gap-y-2 mt-8 justify-start">
                            <div className="flex">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                </svg>
                                <p className="text-xl">Personal Information</p>

                            </div>
                            <div className="flex">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z" />
                                </svg>

                                <p className="">Login & Password</p>

                            </div>
                            <div className="flex">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z" />
                                </svg>

                                <p className="">Employee Inforation</p>

                            </div>

                        </div>
                    </div>


                </div>

                <div className="flex flex-col w-2/3 bg-gray-900 gap-y-6 rounded-lg p-4 px-8">
                    <h2 className="text-amber-500 font-medium text-xl">Personal Information</h2>
                    <div className="flex justify-around">
                    <div className="grid grid-cols-2 justify-around gap-x-20 gap-y-4">
                        <RoundedTextField textColor="gray-800" height="40px" style="border-gray-500 rounded-md" label="First Name"/>
                        <RoundedTextField height="40px" style="border-gray-500 rounded-md" label="Last Name"/>
                        <RoundedTextField height="40px" style="border-gray-500 rounded-md" label="Phone Number"/>
                        <RoundedDatePicker label="Date of Birth " style="border-gray-500 rounded-md" height="40px"/>
                        <RoundedComboBox label="Gender" style="border-gray-500 rounded-md" height="40px"/>
                        </div>
                    </div>

                    <div className="flex justify-around">
                    <div className="grid grid-cols-2 justify-around gap-x-20 gap-y-4">
                        <RoundedTextField height="40px" style="border-gray-500 rounded-md" label="Address"/>
                        <RoundedTextField height="40px" style="border-gray-500 rounded-md" label="City/Town/Village"/>
                        <RoundedTextField height="40px" style="border-gray-500 rounded-md" label="State/Province"/>
                        <RoundedTextField height="40px" style="border-gray-500 rounded-md" label="Country"/>
                        <RoundedTextField height="40px" style="border-gray-500 rounded-md" label="Postcode"/>
                        </div>
                    </div>
                    <div className="w-full flex justify-center">
                    <RoundedButton label="Edit" paddingX="100px"/>

                    </div>
                    
                               
                </div>
                

            </div>




        </div>
    )
}
