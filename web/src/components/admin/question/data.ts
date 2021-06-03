export interface IFormState {
  title?: string;
  type?: number;
  level?: number;
  status?: number;
}

export interface IQuestion extends IFormState {
  _id?: string;
  score: number;
  answerTime: number;
  body: string | void;
  factor: {
    isSpace: boolean;
    isCase: boolean;
    isKeywords: boolean;
    isWidth: boolean;
  };
  options: { key: string; val: string }[];
  answer: string | string[];
  examples: {
    input: string;
    output: string;
  }[];
  files: [] | { name: string; path: string }[];
}

export interface ISelectOptions {
  label: string;
  key: string | number;
  color?: string;
}

export interface IFileItem {
  uid: string;
  name?: string;
  status?: string;
  response?: string;
  url?: string;
  preview?: string;
  originFileObj?: any;
  file: string | Blob;
}

export const level: ISelectOptions[] = [
  { label: "初级", key: 1, color: "#52c41a" },
  { label: "中级", key: 2, color: "#faad14" },
  { label: "高级", key: 3, color: "#f5222d" },
];

export const type: ISelectOptions[] = [
  { label: "选择题", key: 1, color: "success" },
  { label: "多选题", key: 2, color: "processing" },
  { label: "填空题", key: 3, color: "error" },
  { label: "代码题", key: 4, color: "warning" },
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

export const getLevelTag = (key: number): ISelectOptions => {
  for (let i = 0; i < level.length; i++) {
    if (level[i].key == key) {
      return level[i];
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
    title: "状态",
    key: "status",
    dataIndex: "status",
    slots: { customRender: "status" },
    align: "center",
  },
  {
    title: "分数",
    key: "score",
    dataIndex: "score",
    align: "center",
  },
  {
    key: "action",
    slots: { title: "actionTitle", customRender: "action" },
  },
];
