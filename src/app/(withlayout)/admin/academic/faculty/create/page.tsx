
"use client"
import Form from '@/components/Forms/Form';
import FormInput from '@/components/Forms/FormInput';
import UMBreadCrumb from '@/components/ui/UMBreadCrumb'
import { getUserInfo } from '@/services/auth.service'
import {Row,Col,Button,message} from 'antd'
import { yupResolver } from '@hookform/resolvers/yup';
import { useAddDepartmentMutation } from '@/redux/api/departmentApi';
import { academicFacultySchema } from '../../../../../../../schemas/academic-faculty';
import { useAddAcademicFacultyMutation } from '@/redux/api/academic/facultyApi';

const CreateACFacultyPage = () => {
  const [addAcademicFaculty] = useAddAcademicFacultyMutation();
  const {role} = getUserInfo() as any;

  const onSubmit = async(data:any)=>{
    message.loading("creating....");
    try {
      const result:any = await addAcademicFaculty(data);
      if(result?.data){
        message.success("Academic Faculty create successFully!");
      }
      if(result?.error?.status){
          message.error(result.error.error)
      }
     
    } catch (error:any) {
      console.log(error.message)
      message.error(error.message);
    }
  }
  return (
    <div>
      <UMBreadCrumb items={[
        {label:`${role}`,link: `/${role}`},{
          label:"academic-faculty",link:`/${role}/academic/faculty`
        }
      ]} />
      <h1>Create Academic Faculty</h1>
      <Form submitHandler={onSubmit} resolver={yupResolver(academicFacultySchema)}>
        <Row gutter={{xs: 24, xl: 8, lg: 8, md: 24}}>
            <Col span={8} style={{margin:"10px 0"}}>
              <FormInput type='text' name="title" label='Title' />
            </Col>
        </Row>
        <Button htmlType="submit" type="primary">Create</Button>
      </Form>
    </div>
  )
}

export default CreateACFacultyPage