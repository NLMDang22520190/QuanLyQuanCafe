import { useState } from "react";

import {   theme,ConfigProvider } from 'antd';
import ChangePassword from "./ChangePassword";
import Employee from "./Employee";
import Personal from "./Personal";
export const Profile = () => {
    const [currentTab, setCurrentTab] = useState(0);
    const categories = [
        { name: "Personal Infomration" },
        { name: "Employee Information" }
      ];
      const handleTabChange = (index) => {
        setCurrentTab(index);
      };
    return (
        <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#ffc107",
            colorPrimaryText: "#ffffff",
            colorPrimaryHover: "#0000000",
            borderRadius: 8,
          },
          algorithm: theme.darkAlgorithm,
        }}
      >
        <div className="flex flex-col gap-y-4 overflow-hidden h-full">
          {/* Header Section */}
          <div className="flex items-center flex gap-x-10">
            <h2 className="text-amber-500 font-medium text-3xl">Settings</h2>
  
            {/* Tab Navigation */}
            <div className="border-black-200 rounded-lg bg-black-600/30 flex gap-x-4">
              <ul
                className="flex gap-x-6 -mb-px text-sm text-center max-w-full overflow-x-auto"
                role="tablist"
              >
                {categories.map((tab, index) => (
                  <li key={tab.name} role="presentation">
                    <button
                      onClick={() => handleTabChange(index)}
                      className={`inline-block p-4 border-b-2 rounded-t-lg ${
                        currentTab === index ? "border-amber-500 text-amber-500" : ""
                      }`}
                    >
                      {tab.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
  
          {/* Table Content */}
          {currentTab === 0 && (
            <div>
                <Personal/>
                <ChangePassword/>

            </div>
          )}
          {currentTab === 1 && (
            <Employee/>
          )}

        </div>
        </ConfigProvider>
    )
}
