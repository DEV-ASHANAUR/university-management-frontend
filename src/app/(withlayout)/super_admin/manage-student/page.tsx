"use client"
import ActionBar from '@/components/ui/ActionBar';
import UMBreadCrumb from '@/components/ui/UMBreadCrumb'
import { getUserInfo } from '@/services/auth.service'
import Link from 'next/link';
import {Button} from 'antd'

const ManageStudentPage = () => {
  const {role} = getUserInfo() as any;
  return (
    <div>
      <UMBreadCrumb items={[{
        label:`${role}`,
        link:`${role}`
      }]} />
      <ActionBar title="Student List">
        <Link href="/super_admin/manage-student/create">
          <Button type="primary">Create</Button>
        </Link>
      </ActionBar>
    </div>
  )
}

export default ManageStudentPage