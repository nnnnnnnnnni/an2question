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
  visible: number;
  testpaper?: string;
  participants: string[];
  note: string | void;
  times: number;
  startAt?: Date | string | number;
  closeAt?: Date | string | number;
}

export const type: ISelectOptions[] = [
  { label: "固定时间", key: 1 },
  { label: "固定时长", key: 2 },
];

export const visible: ISelectOptions[] = [
  { label: "参与人可见", key: 1 },
  { label: "绑定人可见", key: 2 },
  { label: "所有人可见", key: 3 },
]

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

export const getVisibleTag = (key: number): ISelectOptions => {
  for (let i = 0; i < visible.length; i++) {
    if (visible[i].key == key) {
      return visible[i];
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

export const noteStr =
  "<ol><li>参与本场考试推荐使用&nbsp;<b>Chrome</b>&nbsp;或&nbsp;<b>Microsoft Edge</b>&nbsp;浏览器，请勿使用&nbsp;<b>IE</b>&nbsp;浏览器。</li><li>请确认本场考试的考试时间和考试名称，如果您非本场考试的考生，请主动退出本场考试，劳请配合。</li><li>开始考试前，请确认考试使用网络环境，请在稳定的网络环境下参与考试。</li><li>考试开始后，请勿退出账号后重新登录，以免被怀疑作弊嫌疑。</li><li>考试开始后，请勿做出如：切换Tab页面，最小化本窗口等会使页面失焦的操作。</li><li>考试结束后，根据每次考试的不同，请稍等片刻后或在工作人员的通知后查看比赛结果。</li><li>祝你发挥正常，一切顺利！</li></ol>";
