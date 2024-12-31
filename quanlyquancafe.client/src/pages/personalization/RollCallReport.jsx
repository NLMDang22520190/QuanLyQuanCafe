import React from "react";
import { Modal, Table } from "antd";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import instance from "../../features/AxiosInstance/AxiosInstance";
import { use } from "react";
const RollCallReport = ({ visible, onClose, monthData }) => {
  const [rollCallData,setRollCallData] =useState( []);

  const userId = useSelector((state) => state.auth.user);
  const year = monthData ? new Date(monthData.month).getFullYear() : null;
  const month = monthData
    ? String(new Date(monthData.month).getMonth() + 1).padStart(2, "0")
    : null;
  const [pageIndex, setPageIndex]=useState(1);
  const [totalRecords,setTotalRecords]=useState(0);
  useEffect(()=>{
    fetchRollcallReport();
  },[pageIndex,[month,year]])
  const pageSize=5;
  const fetchRollcallReport= async ()=>{
    try{
      console.log(userId,month,year);
      if (!userId || !month || !year) {
        console.error("User ID, month, and year must be provided.");
        return;
      }
      const response=instance.get("/api/rollcall-report", {
        params: { userId, month, year, pageIndex, pageSize },
      });
      if(response.status===200||response.status===201)
      {
        console.log(response.data.data);
        setRollCallData(response.data.data);
      }
    
    }
    catch (error) {
      if (error.response) {
        console.error("Error fetching roll call report:", error.response.data.message);
      } else {
        console.error("An error occurred:", error.message);
      }
      return null;
    }
  
  }
  
  const rollCallColumns = [
    {
      title: "Shift",
      dataIndex: "shiftName",
      key: "shiftName",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Check-in",
      dataIndex: "checkin",
      key: "checkin",
    },
    {
      title: "Check-out",
      dataIndex: "checkout",
      key: "checkout",
    },
  ];

  return (
    <Modal
    title="Roll Call Report"
      open={visible}
      onCancel={onClose}
      footer={null}
    >
      <Table
        title={() => <span className="custom-table-title">Roll Call for {monthData?.month}</span>}
        columns={rollCallColumns}
        dataSource={rollCallData}
        pagination={{
          current: pageIndex,
          pageSize: 5,
          total: totalRecords,
          onChange: (page) => setPageIndex(page),
        }}
        rowKey="attendanceId"
      />
    </Modal>
  );
};

export default RollCallReport;
