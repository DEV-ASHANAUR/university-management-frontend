"use client"
import Form from '@/components/Forms/Form';
import FormInput from '@/components/Forms/FormInput';
import UMBreadCrumb from '@/components/ui/UMBreadCrumb'
import { getUserInfo } from '@/services/auth.service'
import {Row,Col,Button} from 'antd'
import { departmentSchema } from '../../../../../../schemas/department';
import { yupResolver } from '@hookform/resolvers/yup';

const CreateDepartmentPage = () => {
  const {role} = getUserInfo() as any;
  const onSubmit = (data:any)=>{
    try {
      console.log(data)
    } catch (error) {
      console.log(error)
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