"use client"
import Form from '@/components/Forms/Form'
import FormInput from '@/components/Forms/FormInput'
import React from 'react'
import {Button} from 'antd'

const ResetPassPage = () => {
  const onSubmit = (data:any)=>{
    try {
      console.log("reset",data)
    } catch (error:any) {
      console.log(error)
    }
  }
  return (
    <div style={{display:"flex", justifyContent:"center",alignItems:"center",height:"80vh",width:"100%"}}>
      <Form submitHandler={onSubmit}>
        <h3 style={{margin:"10px 0"}}>Reset Password</h3>
        <div>
          <FormInput type='password' name="oldPassword" label='Old password' />
        </div>
        <div style={{margin:"10px 0"}}>
          <FormInput type='password' name="newPassword" label='New password' />
        </div>
        <Button htmlType="submit" type="primary">submit</Button>
      </Form>
    </div>
  )
}

export default ResetPassPage