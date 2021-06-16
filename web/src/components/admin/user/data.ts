export interface IOptions {
  key?: string;
}

export interface IAddOptions {
  name?: string;
  password?: string;
}

export const columns = [
  {
    dataIndex: "title",
    title: "标题",
    key: "title",
    align: "left",
  },
  {
    title: "题型",
    dataIndex: "type",
    key: "type",
    slots: { customRender: "type" },
    align: "center",
  },
  {
    title: "等级",
    dataIndex: "level",
    key: "level",
    slots: { customRender: "level" },
    align: "center",
  },
  {
    title: "答题次数",
    key: "answerTime",
    dataIndex: "answerTime",
    align: "center",
  },
  {
    title: "分数",
    key: "score",
    dataIndex: "score",
    align: "center",
  },
  {
    title: "状态",
    key: "status",
    dataIndex: "status",
    slots: { customRender: "status" },
    align: "center",
  },
  {
    key: "action",
    slots: { title: "actionTitle", customRender: "action" },
  },
];
