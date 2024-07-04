import { DatePicker } from "antd";
import { Controller, useFormContext } from "react-hook-form";

type TDatePickerProps = {
  name: string;
  label: string;
};

const PDatePicker = ({ name, label }: TDatePickerProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div style={{ marginBottom: "15px" }}>
      {label && <p style={{ marginBottom: "5px" }}>{label}</p>}
      <Controller
        name={name}
        control={control}
        rules={{ required: `Please select ${label || name}` }}
        render={({ field }) => (
          <div>
            <DatePicker
              style={{ width: "350px" }}
              {...field}
              placeholder={`Select ${label || name}`}
            />
            {errors[name] && (
              <p style={{ color: "red" }}>
                {(errors[name]?.message as string) || "This field is required"}
              </p>
            )}
          </div>
        )}
      />
    </div>
  );
};

export default PDatePicker;
