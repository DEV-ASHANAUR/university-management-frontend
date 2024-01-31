import FormSelectField, { SelectOptions } from "./FormSelectField";
import { useAcademicDepartmentsQuery } from "@/redux/api/academic/departmentApi";

type ACDeparmentFieldProps = {
  name: string;
  label: string;
  onChange: (el: any) => void;
};

const ACDepartmentFieldId = ({ name, label, onChange }: ACDeparmentFieldProps) => {
  const { data, isLoading } = useAcademicDepartmentsQuery({
    limit: 100,
    page: 1,
  });

  

  const academicDepartments: any = data?.academicDepartments;
  const acDepartmentOptions = academicDepartments?.map((acDepartment: any) => {
    return {
      label: acDepartment?.title,
      value: acDepartment?.id,
    };
  });

  return (
    <FormSelectField
      name={name}
      label={label}
      options={acDepartmentOptions as SelectOptions[]}
      handleChange={(e)=> onChange(e)}
    />
  );
};

export default ACDepartmentFieldId;
