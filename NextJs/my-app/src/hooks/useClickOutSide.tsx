'use client';

import { useEffect } from "react";

const useClickOutSide = (
  isEditing: boolean,
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>
) => {
  useEffect(() => {
    if (!isEditing) return;

    const handleClickOutside = (e: MouseEvent) => {
      const formWrapper = document.querySelector(".edit-form-wrapper");
      if (formWrapper && !formWrapper.contains(e.target as Node)) {
        setIsEditing(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isEditing, setIsEditing]);
};

export default useClickOutSide;
