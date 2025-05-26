import React, { useState } from 'react';
import { Button, Input } from 'antd';

const FormAddList = ({ onAddList, onCancel }) => {
  const [listName, setListName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (listName.trim()) {
      onAddList(listName);
      setListName('');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        marginTop: '8px',
        display: 'flex',
        gap: '8px',
        alignItems: 'center',
      }}
    >
      <Input
        value={listName}
        onChange={(e) => setListName(e.target.value)}
        placeholder="Enter list name"
        style={{ width: 200 }}
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
