import { useEffect } from "react";


const useClickOutSide = (isEditing , setIsEditing) => {

  useEffect(() => {
    if(!isEditing) return;
    const handleClickOutside = (e) => {
      const formWrapper = document.querySelector("edit-form-wrapper");
      if (formWrapper && !formWrapper.contains(e.target)) {
        setIsEditing(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => [
      document.removeEventListener("mousedown", handleClickOutside),
    ];
  }, [isEditing, setIsEditing]);
};

export default useClickOutSide;
