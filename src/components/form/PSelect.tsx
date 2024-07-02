import { Select } from "antd";
import { Controller, useFormContext } from "react-hook-form";

const { Option } = Select;

type TSelectProps = {
  name: string;
  label: string;
  options: { value: string; label: string }[];
};

const PSelect = ({ name, label, options }: TSelectProps) => {
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
            <Select
              style={{ width: "350px" }}
              {...field}
              showSearch
              placeholder={`Select ${label || name}`}
              optionFilterProp="children"
              filterOption={(input, option) =>
                option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {options.map((opt) => (
                <Option key={opt.value} value={opt.value}>
                  {opt.label}
                </Option>
              ))}
            </Select>
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

export default PSelect;
