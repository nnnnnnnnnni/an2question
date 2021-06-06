export interface IOptions {
  title?: string;
  status?: number;
}

export interface ITestpaper extends IOptions {
  _id?: string;
  choiceCount: number;
  multiCount: number;
  blankCount: number;
  codeCount: number;
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

export const status: ISelectOptions[] = [
  { label: "未发布", key: 1, color: "#bfbfbf" },
  { label: "已发布", key: 2, color: "#52c41a" },
  { label: "已使用", key: 3, color: "#1890ff" },
];

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
    title: "单选题",
    dataIndex: "choiceCount",
    key: "choiceCount",
    align: "center",
  },
  {
    title: "多选题",
    dataIndex: "multiCount",
    key: "multiCount",
    align: "center",
  },
  {
    title: "填空题",
    dataIndex: "blankCount",
    key: "blankCount",
    align: "center",
  },
  {
    title: "代码题",
    dataIndex: "codeCount",
    key: "codeCount",
    align: "center",
  },
  {
    title: "总分",
    key: "allScore",
    dataIndex: "allScore",
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
    title: "操作",
    key: "action",
    slots: { customRender: "action" },
  },
];
