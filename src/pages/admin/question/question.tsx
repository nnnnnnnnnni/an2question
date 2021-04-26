import React from "react";
import Form from "../../../components/admin/question/form";
import List from "../../../components/admin/question/list";

export default function Question() {
  return (
    <div className='admin-content'>
      <div className="admin-form">
        <Form />
      </div>
      <div className="admin-list">
        <List />
      </div>
    </div>
  );
}
