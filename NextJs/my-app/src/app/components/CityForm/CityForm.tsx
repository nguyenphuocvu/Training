import React, { useEffect } from "react";
import { Button } from "antd";
import { City } from "@/types";
import { useForm, SubmitHandler } from "react-hook-form";

type CityFormProps = {
  onSubmit: (data: City) => void;
  submitLabel: string;
  onCancel: () => void;
  initialValues?: City;
};

const CityForm = ({
  onSubmit,
  submitLabel,
  onCancel,
  initialValues,
}: CityFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<City>({ defaultValues: initialValues });

  useEffect(() => {
    if (initialValues) {
      reset(initialValues);
    }
  }, [initialValues, reset]);

  const onSubmitHandler: SubmitHandler<City> = (data) => {
    onSubmit(data);
    reset();
  };
  return (
    <form
      className="flex flex-col gap-[10px] border border-[#ddd] rounded-[12px] bg-[#fefefe] shadow-[0_2px_6px_rgba(0,0,0,0.08)] max-w-[300px] p-4"
      onSubmit={handleSubmit(onSubmitHandler)}
    >
      <input
        type="number"
        placeholder="Rank"
        className="px-[12px] py-[10px] text-[15px] border border-[#ccc] rounded-lg outline-none transition-colors duration-200 ease-in"
        {...register("rank", { required: "Rank là bắt buộc" })}
      />
      {errors.rank && <span className="error"> {errors.rank.message} </span>}
      <input
        type="text"
        placeholder="City"
        className="px-[12px] py-[10px] text-[15px] border border-[#ccc] rounded-lg outline-none transition-colors duration-200 ease-in"
        {...register("city", { required: "City là bắt buộc" })}
      />
      {errors.city && <span className="error"> {errors.city.message} </span>}
      <input
        type="text"
        placeholder="State"
        className="px-[12px] py-[10px] text-[15px] border border-[#ccc] rounded-lg outline-none transition-colors duration-200 ease-in"
        {...register("state", { required: "State là bắt buộc" })}
      />
      {errors.state && <span className="error"> {errors.state.message} </span>}
      <input
        type="number"
        placeholder="Latitude"
        step="any"
        className="px-[12px] py-[10px] text-[15px] border border-[#ccc] rounded-lg outline-none transition-colors duration-200 ease-in"
        {...register("latitude", { required: "Latitude là bắt buộc" })}
      />
      {errors.latitude && (
        <span className="error"> {errors.latitude.message} </span>
      )}
      <input
        type="number"
        placeholder="Longitude"
        step="any"
        className="px-[12px] py-[10px] text-[15px] border border-[#ccc] rounded-lg outline-none transition-colors duration-200 ease-in"
        {...register("longitude", { required: "Longitude là bắt buộc" })}
      />
      {errors.longitude && (
        <span className="error"> {errors.longitude.message} </span>
      )}

      <div className="flex gap-2.5">
        <Button type="primary" htmlType="submit">
          {submitLabel}
        </Button>
        <Button type="default" onClick={onCancel}>
          Huỷ
        </Button>
      </div>
    </form>
  );
};

export default CityForm;
