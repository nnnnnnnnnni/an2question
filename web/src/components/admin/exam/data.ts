export interface IOptions {
  title?: string;
  status?: number;
}

export interface ISelectOptions {
  label: string;
  key: string | number;
  color?: string;
}

export interface IFileItem {
  uid?: string;
  name?: string;
  status?: string;
  response?: string;
  url?: string;
  size?: number;
  preview?: string;
  originFileObj?: any;
  file: string | Blob;
}

export const type: ISelectOptions[] = [
  { label: "固定时间点", key: 1 },
  { label: "固定时间段", key: 2 },
];

export const status: ISelectOptions[] = [
  { label: "未发布", key: 1, color: "#bfbfbf" },
  { label: "已发布", key: 2, color: "#52c41a" },
  { label: "已使用", key: 3, color: "#1890ff" },
];

export const getTypeTag = (key: number): ISelectOptions => {
  for (let i = 0; i < type.length; i++) {
    if (type[i].key == key) {
      return type[i];
    }
  }
  return { label: "未知", key: 1 };
};

export const getStatusTag = (key: number): ISelectOptions => {
  for (let i = 0; i < status.length; i++) {
    if (status[i].key == key) {
      return status[i];
    }
  }
  return { label: "未知", key: 1 };
};

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
