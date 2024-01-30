"use client"
import Form from '@/components/Forms/Form';
import FormInput from '@/components/Forms/FormInput';
import UMBreadCrumb from '@/components/ui/UMBreadCrumb'
import { getUserInfo } from '@/services/auth.service'
import {Row,Col,Button,message} from 'antd'
import { yupResolver } from '@hookform/resolvers/yup';
import { useAddBuildingMutation } from '@/redux/api/buildingApi';
import { buildingSchema } from '../../../../../../schemas/building';

const CreateBuildingPage = () => {
  const [addBuilding] = useAddBuildingMutation();
  const {role} = getUserInfo() as any;

  const onSubmit = async(data:any)=>{
    message.loading("creating....");
    try {
      await addBuilding(data);
      message.success("Building Created successFully!");
    } catch (error:any) {
      console.log(error.message)
      message.error(error.message);
    }
  }
  return (
    <div>
      <UMBreadCrumb items={[
        {label:`${role}`,link: `/${role}`},{
          label:"building",link:`/${role}/building`
        }
      ]} />
      <h1>Create Building</h1>
      <Form submitHandler={onSubmit} resolver={yupResolver(buildingSchema)}>
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

export default CreateBuildingPage