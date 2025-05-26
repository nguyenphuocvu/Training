import React, { useState } from 'react';
import FormAddList from './FormAddList';
import { Button } from 'antd';

const AddList = ({ onAdd }) => {
  const [isAddList, setIsAddList] = useState(false);

  const handleAddList = (name) => {
    onAdd(name);            
    setIsAddList(false);   
  };

  return (
    <div style={{ marginBottom: '16px' }}>
      <Button type="primary" onClick={() => setIsAddList(!isAddList)}>
        +
      </Button>

      {isAddList && (
        <FormAddList
          onAddList={handleAddList}
          onCancel={() => setIsAddList(false)}
        />
      )}
    </div>
  );
};

export default AddList;


