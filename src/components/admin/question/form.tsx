import React from "react";
import { Form, FormProps, Input, Select, Button } from "antd";
import { SearchOutlined, PlusOutlined, UndoOutlined } from "@ant-design/icons";
import { useHistory } from "react-router";
import * as _ from "lodash";
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
  change?: Function;
  search?: Function;
}

export default function From(props: IProps) {
  const history = useHistory();
  const layout: FormProps = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
    layout: "inline",
  };
  const [form] = Form.useForm();

  const fieldChange = _.debounce((value, type) => {
    if (props.change != undefined) {
      props.change({
        type: type,
        value: value,
      });
    }
  }, 1000);

  // 点击
  const _resetClick = () => {
    form.resetFields();
  };

  // 点击搜索
  const _searchClikc = () => {
    if (props.search != undefined) {
      props.search(form.getFieldValue);
    }
  };

  // 点击新增
  const _addClick = () => {
    history.push(`/admin/question/add`);
  };

  return (
    <Form {...layout} form={form}>
      <Form.Item label="标题" name="title">
        <Input
          placeholder="输入标题"
          onChange={(e) => {
            fieldChange(e.target.value, "input");
          }}
        />
      </Form.Item>
      <Form.Item label="等级" name="level">
        <Select
          allowClear
          style={{ width: 100 }}
          placeholder="选择等级"
          onChange={(e) => {
            fieldChange(e, "selectLevel");
          }}
        >
          {levelOptions}
        </Select>
      </Form.Item>
      <Form.Item label="难度" name="difficulty">
        <Select
          allowClear
          style={{ width: 100 }}
          placeholder="选择难度"
          onChange={(e) => {
            fieldChange(e, "selectDiff");
          }}
        >
          {difficultyOptions}
        </Select>
      </Form.Item>
      <Form.Item label="状态" name="status">
        <Select
          allowClear
          style={{ width: 100 }}
          placeholder="选择状态"
          onChange={(e) => {
            fieldChange(e, "selectStatus");
          }}
        >
          {statusOptions}
        </Select>
      </Form.Item>
      <Form.Item>
        <Button type="primary" icon={<UndoOutlined />} shape="circle" onClick={_resetClick} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" icon={<SearchOutlined />} shape="circle" onClick={_searchClikc} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" icon={<PlusOutlined />} shape="circle" onClick={_addClick} />
      </Form.Item>
    </Form>
  );
}
