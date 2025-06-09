import React, { useState } from "react";
import { Button } from "antd";
import FormAddList from "./FormAddList";
type Props = {
  onAdd: (name: string) => void;
};
const AddList = ({ onAdd }: Props) => {
  const [isAddList, setIsAddList] = useState<boolean>(false);

  const handleAddList = (name: string) => {
    onAdd(name);
    setIsAddList(false);
  };
  return (
    <div style={{ marginBottom: "16px" }}>
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
