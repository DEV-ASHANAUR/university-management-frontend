"use client"
import Form from '@/components/Forms/Form';
import FormInput from '@/components/Forms/FormInput';
import UMBreadCrumb from '@/components/ui/UMBreadCrumb'
import { getUserInfo } from '@/services/auth.service'
import {Row,Col,Button,message} from 'antd'
import { departmentSchema } from '../../../../../../schemas/department';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAddDepartmentMutation } from '@/redux/api/departmentApi';

const CreateDepartmentPage = () => {
  const [addDepartment] = useAddDepartmentMutation();
  const {role} = getUserInfo() as any;

  const onSubmit = async(data:any)=>{
    message.loading("creating....");
    try {
      await addDepartment(data);
      message.success("Department added successFully!");
    } catch (error:any) {
      console.log(error.message)
      message.error(error.message);
    }
  }
  return (
    <div>
      <UMBreadCrumb items={[
        {label:`${role}`,link: `/${role}`},{
          label:"department",link:`/${role}/department`
        }
      ]} />
      <h1>Create Department</h1>
      <Form submitHandler={onSubmit} resolver={yupResolver(departmentSchema)}>
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

export default CreateDepartmentPage