import React from "react";
import { Modal, Table } from "antd";

const RollCallReport = ({ visible, onClose, monthData }) => {
  const rollCallColumns = [
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
  const rollCallData = [
    { key: 1, date: "01/01/2024", checkin: "09:00 AM", checkout: "05:00 PM" },
    { key: 2, date: "02/01/2024", checkin: "09:15 AM", checkout: "05:10 PM" },
    { key: 3, date: "03/01/2024", checkin: "09:05 AM", checkout: "04:50 PM" },
  ];

  return (
    <Modal
    title="Roll Call Report"
      open={visible}
      onCancel={onClose}
      footer={null}
    >
      <Table
        title={() => <span className="custom-table-title">Roll Call for {monthData?.month}, {monthData?.year}</span>}
        columns={rollCallColumns}
        dataSource={rollCallData}
        pagination={1}
      />
    </Modal>
  );
};

export default RollCallReport;
