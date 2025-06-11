"use client";
import AddList from "../AddCityForm/AddList";
import Link from "next/link";
import useCityRedux from "@/hooks/useCityRedux"

const CityList = () => {

  const {groups , addList} = useCityRedux();

  const handleAddList = (name: string) => {
    addList(name)
  };

  return (
    <div className="p-5 bg-gray-100 min-h-screen">
      <AddList onAdd={handleAddList} />
      <div className="flex flex-wrap gap-5 mt-5">
        {groups.map((name, index) => (
          <Link
            href={`/list/${encodeURIComponent(name)}`}
            key={index}
            className="w-full sm:w-[300px]"
          >
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-5 w-full sm:w-[300px] flex flex-col"
            >
              <h2 className="text-xl font-bold mb-3 text-gray-800">{name}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CityList;
