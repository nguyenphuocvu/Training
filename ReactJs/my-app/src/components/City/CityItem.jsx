import { useEffect , useState } from "react";
import CityForm from "./CityForm";
import { Button, Input } from "antd";
const CityItem = ({ city, onDelete, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...city });

  useEffect(() => {
    if (!isEditing) {
      setFormData({ ...city });
    }
  }, [isEditing, city]);

  const handleSave = () => {
    onSave(formData);
    setIsEditing(false);
  };
   
  const handleCancel = () => {
    setIsEditing(false); 
  };
  return (
    <li className="city-item" draggable="true">
      {!isEditing ? (
        <>
       
          <Input className="edit-city" value={city.city} />
          <Button type="default" onClick={() => setIsEditing(true)}>
            Chỉnh sửa
          </Button>
          <Button type="default" onClick={() => onDelete(city.rank)}>
            Xóa
          </Button>
        </>
      ) : (
        <CityForm
          city={formData}
          setCity={setFormData}
          onSubmit={handleSave}
          submitLabel="Lưu"
          onCancel={handleCancel}
        />
      )}
    </li>
  );
};

export default CityItem;
