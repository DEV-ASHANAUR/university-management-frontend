import { useAcademicFacultiesQuery } from "@/redux/api/academic/facultyApi";
import FormSelectField, { SelectOptions } from "./FormSelectField";

type ACFacultyFieldProps = {
  name: string;
  label: string;
};

const ACFacultyField = ({ name, label }: ACFacultyFieldProps) => {
  const { data, isLoading } = useAcademicFacultiesQuery({
    limit: 100,
    page: 1,
  });

  const academicFaculties: any = data?.academicFaculties;
  const acFacultyOptions = academicFaculties?.map((acFaculty: any) => {
    return {
      label: acFaculty?.title,
      value: acFaculty?.id,
    };
  });

  return (
    <FormSelectField
      name={name}
      label={label}
      options={acFacultyOptions as SelectOptions[]}
    />
  );
};

export default ACFacultyField;
