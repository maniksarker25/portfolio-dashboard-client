import { Input } from "antd";
import { Controller, useFormContext } from "react-hook-form";
type TInputProps = {
  type: string;
  name: string;
  label: string;
  notRequired?: boolean;
  width?: string;
};
const PInput = ({ type, name, label, notRequired, width }: TInputProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const rules = !notRequired
    ? { required: `Please enter ${label || name}` }
    : {};

  return (
    <div style={{ marginBottom: "15px" }}>
      {label ? <p style={{ marginBottom: "5px" }}>{label}</p> : null}
      <Controller
        name={name}
        control={control}
        // rules={!required && { required: `Please enter ${label || name}` }}
        rules={rules}
        render={({ field }) => (
          <div>
            <Input
              style={{ width: width || "350px" }}
              placeholder={`Enter ${label || name}`}
              {...field}
              type={type}
              id={name}
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

export default PInput;
