import { useState } from "react";
import CityForm from "./CityForm";

const CityItem = ({ city, onDelete, onSave  }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...city });

  const handleSave = () => {
    onSave(formData);
    setIsEditing(false);
  };

  return (
    <li className="city-item" draggable="true">
      {!isEditing ? (
        <>
          <input type="text" className="edit-city" value={city.city} disabled />
          <button
            type="button"
            className="edit-btn"
            onClick={() => setIsEditing(true)}
          >
            Chỉnh sửa
          </button>
          <button
            type="button"
            className="delete-btn"
            onClick={() => onDelete(city.rank)}
          >
            Xóa
          </button>
        </>
      ) : (
        <CityForm
          city={formData}
          setCity={setFormData}
          onSubmit={handleSave}
          submitLabel="Lưu"
        />
        // <div className="edit-form">
        //   <label>Tên thành phố:</label>
        //   <input
        //     type="text"
        //     name="city"
        //     value={formData.city}
        //     onChange={handleChange}
        //   />
        //   <label>Bang:</label>
        //   <input
        //     type="text"
        //     name="state"
        //     value={formData.state}
        //     onChange={handleChange}
        //   />
        //   <label>Vĩ độ:</label>
        //   <input
        //     type="text"
        //     name="latitude"
        //     value={formData.latitude}
        //     onChange={handleChange}
        //   />
        //   <label>Kinh độ:</label>
        //   <input
        //     type="text"
        //     name="longitude"
        //     value={formData.longitude}
        //     onChange={handleChange}
        //   />
        //   <button type="button" className="save-btn" onClick={handleSave}>
        //     Lưu
        //   </button>
        // </div>
      )}
    </li>
  );
};

export default CityItem;
