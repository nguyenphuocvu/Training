"use client";

import React, { useState } from "react";
import { Button, Input } from "antd";
type Props = {
  onAddList: (name: string) => void;
  onCancel: () => void;
};
const FormAddList = ({ onAddList, onCancel }: Props) => {
  const [listName, setListName] = useState<string>("");

  const handleSubmit = () => {
    if (listName.trim()) {
      onAddList(listName);
      setListName("");
    }
  };
  return (
    <form onSubmit={handleSubmit} className="flex align-center mt-2 gap-2">
      <Input
        placeholder="Enter list name"
        style={{ width: "200px" }}
        value={listName}
        onChange={(e) => setListName(e.target.value)}
      />
      <Button type="primary" htmlType="submit">
        Add List
      </Button>

      <Button type="default" onClick={onCancel}>
        Cancel
      </Button>
    </form>
  );
};

export default FormAddList;
