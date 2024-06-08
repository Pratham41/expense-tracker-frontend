import React, { useState } from "react";
import { Form, Input, Modal, Select, message } from "antd";
import axios from "axios";
import Spinner from "./Spinner";

const AddEditTransaction = ({
  showAddEditTransactionModal,
  setShowAddEditTransactionModal,
  selectedItemForEdit,
  getTransactions,
  setSelectedItemForEdit,
}) => {
  const [loading, setLoading] = useState(false);

  const onFinishHandler = async (values) => {
    console.log(values);
    try {
      const user = JSON.parse(localStorage.getItem("pratham-money-user"));
      setLoading(true);
      if (selectedItemForEdit) {
        await axios.post("https://expensetracker-cqzj.onrender.com/transactions/edit-transaction", {
          payLoad: {
            ...values,
            userId: user._id,
          },
          transactionId: selectedItemForEdit._id,
        });
        getTransactions();
        message.success("Transaction Updated successfully !");
      } else {
        await axios.post("https://expensetracker-cqzj.onrender.com/transactions/add-transaction", {
          ...values,
          userId: user._id,
        });
        getTransactions();
        message.success("Transaction added successfully !");
      }
      setShowAddEditTransactionModal(false);
      setSelectedItemForEdit(null);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      message.error("Something went wrong");
    }
  };
  return (
    <Modal
      title={selectedItemForEdit ? "Edit Transaction" : "Add Transaction"}
      visible={showAddEditTransactionModal}
      onCancel={() => setShowAddEditTransactionModal(false)}
      footer={false}
    >
      {loading && <Spinner />}

      <Form
        layout="vertical"
        className="transaction-form"
        onFinish={onFinishHandler}
        initialValues={selectedItemForEdit}
      >
        <Form.Item label="Amount" name="amount">
          <Input type="text" />
        </Form.Item>

        <Form.Item label="Type" name="type">
          <Select>
            <Select.Option value="income">Income</Select.Option>
            <Select.Option value="expense">Expense</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Category" name="category">
          <Select>
            <Select.Option value="food">Food</Select.Option>
            <Select.Option value="education">Education</Select.Option>
            <Select.Option value="entertainment">Entertainment</Select.Option>
            <Select.Option value="travelling">Travelling</Select.Option>
            <Select.Option value="medical">Medical</Select.Option>
            <Select.Option value="tax">Tax</Select.Option>
            <Select.Option value="salary">Salary</Select.Option>
            <Select.Option value="extra_income">Extra Income</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Date" name="date">
          <Input type="date" />
        </Form.Item>

        <Form.Item label="Reference" name="reference">
          <Input type="text" />
        </Form.Item>

        <Form.Item label="Description" name="description">
          <Input type="text" />
        </Form.Item>

        <div className="d-flex justify-content-end">
          <button className="primary" type="submit">
            SAVE
          </button>
        </div>
      </Form>
    </Modal>
  );
};

export default AddEditTransaction;
