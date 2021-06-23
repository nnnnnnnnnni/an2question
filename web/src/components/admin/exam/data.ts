export interface IOptions {
  title?: string;
  status?: number;
}

export interface ISelectOptions {
  label: string;
  key: string | number;
  color?: string;
}

export interface IExam {
  title?: string;
  status?: number;
  type: number;
  testpaper?: string;
  participants: string[];
  note?: string;
  times: number;
  startAt?: Date | string | number;
  closeAt?: Date | string | number;
}

export const type: ISelectOptions[] = [
  { label: "固定时间", key: 1 },
  { label: "固定时长", key: 2 },
];

export const status: ISelectOptions[] = [
  { label: "未发布", key: 1, color: "#bfbfbf" },
  { label: "待开始", key: 2, color: "#52c41a" },
  { label: "进行中", key: 3, color: "#1890ff" },
  { label: "已结束", key: 4, color: "#1890ff" },
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
