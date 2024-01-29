import FormSelectField, { SelectOptions } from "./FormSelectField";
import { useAcademicDepartmentsQuery } from "@/redux/api/academic/departmentApi";

type ACDeparmentFieldProps = {
  name: string;
  label: string;
};

const ACDepartmentField = ({ name, label }: ACDeparmentFieldProps) => {
  const { data, isLoading } = useAcademicDepartmentsQuery({
    limit: 100,
    page: 1,
  });

  

  const academicDepartments: any = data?.academicDepartments;
  console.log("academic dept option",academicDepartments)
  const acDepartmentOptions = academicDepartments?.map((acDepartment: any) => {
    return {
      label: acDepartment?.title,
      value: acDepartment?.id,
    };
  });

  console.log("rendered",acDepartmentOptions)

  return (
    <FormSelectField
      name={name}
      label={label}
      options={acDepartmentOptions as SelectOptions[]}
    />
  );
};

export default ACDepartmentField;
