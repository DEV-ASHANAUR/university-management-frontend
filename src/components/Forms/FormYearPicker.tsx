import { DatePickerProps, DatePicker } from "antd";
import { useFormContext, Controller } from "react-hook-form";
import dayjs, { Dayjs } from "dayjs";

type UMDatePickerProps = {
  onChange?: (valOne: Dayjs | null, valTwo: string) => void;
  name: string;

  size?: "large" | "small";
  value?: string | string[] | undefined;
  label?: string;
  picker?: "year" | "time";
};

const FormYearPicker = ({
  name,
  label,
  onChange,
  size = "large",
  picker,
}: UMDatePickerProps) => {
  const { control, setValue } = useFormContext();
  const handleOnChange: DatePickerProps["onChange"] = (date, dateString) => {
    // console.log(date, dateString);
    onChange ? onChange(date, dateString) : null;
    setValue(name, dateString);
  };
  return (
    <>
      {label ? label : null}
      <br />
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <DatePicker
            value={field.value ? dayjs(field.value) : null}
            size={size}
            onChange={handleOnChange}
            picker={picker}
            style={{ width: "100%" }}
          />
        )}
      />
    </>
  );
};

export default FormYearPicker;
