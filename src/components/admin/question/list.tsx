import React from "react";
import { Table, Tag, Space, Button } from "antd";
import { DeleteOutlined, EditOutlined, EllipsisOutlined } from "@ant-design/icons";
import { useHistory } from "react-router";

// 问题页面列表
export default function () {
  const history = useHistory();
  const jumpClick = (reacd: any) => {
    history.push(`/admin/question/${reacd.key}`);
  };
  const columns = [
    {
      title: "标题",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "创建时间",
      dataIndex: "createAt",
      key: "createAt",
    },
    {
      title: "等级",
      dataIndex: "level",
      key: "level",
      render: (text: number) => {
        if (text == 0) {
          return <Tag color="#87d068">初级</Tag>;
        } else if (text == 1) {
          return <Tag color="#2db7f5">中级</Tag>;
        } else {
          return <Tag color="#cd201f">高级</Tag>;
        }
      },
    },
    {
      title: "难度",
      dataIndex: "difficulty",
      key: "difficulty",
      render: (text: number) => {
        if (text == 0) {
          return <Tag color="#87d068">简单</Tag>;
        } else if (text == 1) {
          return <Tag color="#2db7f5">普通</Tag>;
        } else {
          return <Tag color="#cd201f">困难</Tag>;
        }
      },
    },
    {
      title: "状态",
      dataIndex: "status",
      key: "status",
      render: (text: number) => {
        if (text == 0) {
          return <Tag color="#d3adf7">未发布</Tag>;
        } else if (text == 1) {
          return <Tag color="#9254de">已发布</Tag>;
        } else if (text == 2) {
          return <Tag color="#91d5ff">未使用</Tag>;
        } else {
          return <Tag color="#40a9ff">已使用</Tag>;
        }
      },
    },
    {
      title: "分数",
      dataIndex: "score",
      key: "score"
    },
    {
      title: "操作",
      key: "action",
      render: (text: any, record: any) => (
        <Space size="middle">
          <Button type="primary" icon={<EditOutlined />} shape="circle" />
          <Button type="primary" icon={<DeleteOutlined />} shape="circle" danger />
          <Button
            type="primary"
            icon={<EllipsisOutlined />}
            shape="circle"
            onClick={() => {
              jumpClick(record);
            }}
          />
        </Space>
      ),
    },
  ];

  const data = [
    {
      key: "1",
      title: "John Brown",
      level: 0,
      difficulty: 0,
      status: 2,
      score: 10,
      createAt: "2021-1-1 0:0:1",
    },
    {
      key: "2",
      title: "Jim Green",
      level: 1,
      difficulty: 1,
      status: 3,
      score: 10,
      createAt: "2021-1-1 0:0:1",
    },
    {
      key: "3",
      title: "Joe Black",
      level: 2,
      difficulty: 2,
      status: 0,
      score: 10,
      createAt: "2021-1-1 0:0:1",
    },
    {
      key: "4",
      title: "Joe Black",
      level: 2,
      difficulty: 2,
      status: 1,
      score: 10,
      createAt: "2021-1-1 0:0:1",
    },
    {
      key: "5",
      title: "Joe Black",
      level: 2,
      difficulty: 2,
      status: 2,
      score: 10,
      createAt: "2021-1-1 0:0:1",
    },
    {
      key: "6",
      title: "Joe Black",
      level: 2,
      difficulty: 2,
      status: 1,
      score: 10,
      createAt: "2021-1-1 0:0:1",
    },
    {
      key: "7",
      title: "Joe Black",
      level: 2,
      difficulty: 2,
      status: 1,
      score: 10,
      createAt: "2021-1-1 0:0:1",
    },
    {
      key: "8",
      title: "Joe Black",
      level: 2,
      difficulty: 2,
      status: 1,
      score: 10,
      createAt: "2021-1-1 0:0:1",
    },
    {
      key: "9",
      title: "Joe Black",
      level: 2,
      difficulty: 2,
      status: 3,
      score: 10,
      createAt: "2021-1-1 0:0:1",
    },
    {
      key: "0",
      title: "Joe Black",
      level: 2,
      difficulty: 2,
      status: 1,
      score: 10,
      createAt: "2021-1-1 0:0:1",
    },
    {
      key: "10",
      title: "Joe Black",
      level: 2,
      difficulty: 2,
      status: 3,
      score: 10,
      createAt: "2021-1-1 0:0:1",
    },
  ];
  return (
    <div>
      <Table columns={columns} dataSource={data} />
    </div>
  );
}
