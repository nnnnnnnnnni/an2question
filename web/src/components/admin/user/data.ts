export interface IOptions {
  key?: string;
}

export interface IAddOptions {
  name?: string;
  password?: string;
  count: number
}

export const columns = [
  {
    title: "名称",
    dataIndex: "info",
    key: "info",
    slots: { customRender: "info" },
    align: "center",
  },
  {
    title: "邮箱",
    dataIndex: "email",
    key: "email",
    slots: { customRender: "email" },
    align: "center",
  },
  {
    title: "手机",
    dataIndex: "phone",
    key: "phone",
    slots: { customRender: "phone" },
    align: "center",
  },
  {
    title: "创建时间",
    key: "createAt",
    dataIndex: "createAt",
    slots: { customRender: "createAt" },
    align: "center",
  },
  {
    title: '操作',
    key: "action",
    slots: { customRender: "action" },
  },
];
