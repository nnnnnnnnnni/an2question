export interface IFormState {
  name?: string;
  type?: number;
  level?: number;
  status?: number;
}

export interface ISelectOptions {
  label: string;
  key: string | number;
}

export const level: ISelectOptions[] = [
  { label: "初级", key: 1 },
  { label: "中级", key: 2 },
  { label: "高级", key: 3 },
];

export const type: ISelectOptions[] = [
  { label: "选择题", key: 1 },
  { label: "多选题", key: 2 },
  { label: "填空题", key: 3 },
  { label: "代码题", key: 4 },
];

export const status: ISelectOptions[] = [
  { label: "未发布", key: 1 },
  { label: "已发布", key: 2 },
  { label: "未使用", key: 3 },
  { label: "已使用", key: 4 },
];
