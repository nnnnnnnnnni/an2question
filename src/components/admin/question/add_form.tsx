import React, { useState } from "react";
import { Form, FormProps, Input, Select, Button, Radio } from "antd";
import TextArea from "antd/lib/input/TextArea";

export default () => {
  const layout: FormProps = {
    labelCol: { span: 4 },
    wrapperCol: { span: 18, offset: 2 },
    size: 'middle'
  };
  const [type, setType] = useState(1)
  return (
    <div className='question-add-form'>
      <Form {...layout}>
        <Form.Item label="题型">
          <Radio.Group defaultValue={type} style={{ display: 'flex', justifyContent: 'space-between' }} onChange={(e) => {
            setType(e.target.value)
          }}>
            <Radio value={1}>单选</Radio>
            <Radio value={2}>多选</Radio>
            <Radio value={3}>填空</Radio>
            <Radio value={4}>代码</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label='标题'>
          <Input placeholder='请输入标题' />
        </Form.Item>
        <Form.Item label='描述'>
          <TextArea placeholder='请输入描述' rows={5} />
        </Form.Item>
        <Form.Item label='选项'>
          <div className='question-add-options'>
            <div className='question-add-option'>
              
            </div>
          </div>
        </Form.Item>
        <Form.Item wrapperCol={{ span: 18, offset: 6 }}>
          <Button type='primary'>确定</Button>
        </Form.Item>
      </Form>
    </div>
  )
}