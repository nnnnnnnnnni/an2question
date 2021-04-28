import React from 'react'
import BackCom from "../../../components/back";
import AddFormCom from "../../../components/admin/question/add_form";
import './question.css'

export default function () {
  return (
    <div className='admin-content'>
      <div className='admin-form'>
        <BackCom />
      </div>
      <div className='admin-list admin-center'>
        <AddFormCom />
      </div>
    </div>
  )
}