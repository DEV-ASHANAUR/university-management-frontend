import { useAcademicFacultiesQuery } from "@/redux/api/academic/facultyApi";
import { useAcademicSemestersQuery } from "@/redux/api/academic/semesterApi";
import FormSelectField, { SelectOptions } from "./FormSelectField";

type ACSemesterFieldProps = {
  name: string;
  label: string;
};

const ACSemesterField = ({ name, label }: ACSemesterFieldProps) => {
  const { data, isLoading } = useAcademicSemestersQuery({
    limit: 100,
    page: 1,
  });

  const academicSemesters: any = data?.academicSemesters;

  const acSemesterOptions = academicSemesters?.map((acSemester: any) => {
    return {
      label: acSemester?.title + "-" + acSemester?.year,
      value: acSemester?.id,
    };
  });

  return (
    <FormSelectField
      name={name}
      label={label}
      options={acSemesterOptions as SelectOptions[]}
    />
  );
};


export default ACSemesterField;
