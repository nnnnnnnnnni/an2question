import React from "react";
import { Form, FormProps, Input, Select, Button } from "antd";
import { SearchOutlined, PlusOutlined, UndoOutlined } from "@ant-design/icons";
const { Option } = Select;

const levels = ["初级", "中级", "高级"];
const levelOptions = levels.map((key, i) => {
  return (
    <Option value={key} key={i}>
      {key}
    </Option>
  );
});
const difficultys = ["简单", "普通", "困难"];
const difficultyOptions = difficultys.map((key, i) => {
  return (
    <Option value={key} key={i}>
      {key}
    </Option>
  );
});
const statuss = ["未发布", "已发布", "未使用", "已使用"];
const statusOptions = statuss.map((key, i) => {
  return (
    <Option value={key} key={i}>
      {key}
    </Option>
  );
});

interface IProps {
  inputChange?: Function;
  lvChange?: Function;
  diffChange?: Function;
  statusChange?: Function;
  resetClick?: Function;
  searchClikc?: Function;
  addClick?: Function;
}

export default function From(props: IProps) {
  const layout: FormProps = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
    layout: "inline",
  };

  const inputChange = () => {};
  const lvChange = () => {};
  const diffChange = () => {};
  const statusChange = () => {};
  const resetClick = () => {};
  const searchClikc = () => {};
  const addClick = () => {};

  return (
    <Form {...layout}>
      <Form.Item label="标题" name="title">
        <Input placeholder="输入标题" onChange={inputChange} />
      </Form.Item>
      <Form.Item label="等级" name="level">
        <Select allowClear style={{ width: 100 }} placeholder="选择等级" onChange={lvChange}>
          {levelOptions}
        </Select>
      </Form.Item>
      <Form.Item label="难度" name="difficulty">
        <Select allowClear style={{ width: 100 }} placeholder="选择难度" onChange={diffChange}>
          {difficultyOptions}
        </Select>
      </Form.Item>
      <Form.Item label="状态" name="status">
        <Select allowClear style={{ width: 100 }} placeholder="选择状态" onChange={statusChange}>
          {statusOptions}
        </Select>
      </Form.Item>
      <Form.Item>
        <Button type="primary" icon={<UndoOutlined />} shape="circle" onClick={resetClick} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" icon={<SearchOutlined />} shape="circle" onClick={searchClikc} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" icon={<PlusOutlined />} shape="circle" onClick={addClick} />
      </Form.Item>
    </Form>
  );
}
