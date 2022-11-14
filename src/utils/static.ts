/* eslint-disable no-unused-vars */
enum Color {
  Green = '#52DEAD', // 已完成
  Blue = '#1890FF', // 进行中
  Red = '#FF756A'// 错误
}
export interface StaticDataItem extends optionItem {
  color?: string
}
export interface StaticData {
  [propName: string]: Array<StaticDataItem>;
}

// 使用于 getColor getTextArr getText 方法中的静态资源
export const staticData: StaticData = {
  stateShow: [
    // 提案状态  1 待接收 2 待审核 3 待交办 10 办理中 11 重新办理 12 办结 13 退回 14 撤案 15 转社情民意 16 转委员来信
    {
      text: '退改',
      value: -1,
      color: Color.Red
    },
    {
      text: '暂存',
      value: 0,
      color: Color.Blue
    },
    {
      text: '待接收',
      value: 1,
      color: Color.Blue
    },
    {
      text: '待审核',
      value: 2,
      color: Color.Blue
    },
    {
      text: '待交办',
      value: 3,
      color: Color.Blue
    },
    {
      text: '办理中',
      value: 10,
      color: Color.Blue
    },
    {
      text: '重新办理',
      value: 11,
      color: Color.Red
    },
    {
      text: '已办结',
      value: 12,
      color: Color.Green
    },
    {
      text: '退回',
      value: 13,
      color: Color.Red
    },
    {
      text: '撤案',
      value: 14,
      color: Color.Red
    },
    {
      text: '转社情民意',
      value: 15,
      color: Color.Red
    },
    {
      text: '转委员来信',
      value: 16,
      color: Color.Red
    }
  ],
  jointState: [// 【-1待确认，0不同意，1 同意】
    {
      text: '待确认',
      value: -1,
      color: Color.Blue
    },
    {
      text: '拒绝联名',
      value: 0,
      color: Color.Red
    },
    {
      text: '同意联名',
      value: 1,
      color: Color.Green
    }
  ],
  assignState: [// 【0代签收,1办理中,2已办结】
    {
      text: '待签收',
      value: 0,
      color: Color.Blue
    },
    {
      text: '办理中',
      value: 1,
      color: Color.Blue
    },
    {
      text: '已办结',
      value: 2,
      color: Color.Green
    }
  ],
  checkResult: [// 0不予立案，1立案 2 退回
    {
      text: '不予立案',
      value: 0,
      color: Color.Red
    },
    {
      text: '已立案',
      value: 1,
      color: Color.Green
    },
    {
      text: '已退回',
      value: 2,
      color: Color.Red
    }
  ],
  acquisitionEditingState: [
    {
      text: '不予采编',
      value: -1,
      color: Color.Red
    },
    {
      text: '未采编',
      value: 0,
      color: Color.Blue
    },
    {
      text: '已采编',
      value: 1,
      color: Color.Green
    }
  ],
  isSubmit: [
    {
      text: '待报送',
      value: 0,
      color: Color.Blue
    },
    {
      text: '已报送',
      value: 1,
      color: Color.Green
    }
  ],
  isAdopt: [
    {
      text: '待采用',
      value: 0,
      color: Color.Blue
    },
    {
      text: '已采用',
      value: 1,
      color: Color.Green
    }
  ],
  isInstruction: [
    {
      text: '待批示',
      value: 0,
      color: Color.Blue
    },
    {
      text: '已批示',
      value: 1,
      color: Color.Green
    }
  ],
  isFeedback: [ // 反馈状态
    {
      text: '待反馈',
      value: 0,
      color: Color.Blue
    },
    {
      text: '已反馈',
      value: 1,
      color: Color.Green
    }
  ],
  attendResult: [
    // 出席结果
    {
      text: '出席',
      value: 1,
      color: Color.Green
    },
    {
      text: '请假',
      value: 0,
      color: Color.Blue
    },
    {
      text: '缺席',
      value: 2,
      color: Color.Red
    }
  ],
  attendWill: [
    // 出席意愿
    {
      text: '待响应',
      value: -1,
      color: Color.Green
    },
    {
      text: '请假',
      value: 0,
      color: Color.Green
    },
    {
      text: '请假',
      value: 0,
      color: Color.Blue
    },
    {
      text: '出席',
      value: 1,
      color: Color.Red
    },
    {
      text: '请假不通过',
      value: 2,
      color: Color.Red
    },
    {
      text: '请假通过',
      value: 3,
      color: Color.Red
    }
  ],
  signState: [
    // 签到结果
    {
      text: '未签到',
      value: 0,
      color: Color.Green
    },
    {
      text: '已签到',
      value: 1,
      color: Color.Green
    }
  ],
  meetingSchedule: [
    // 会议状态
    {
      text: '未开始',
      value: 0,
      color: Color.Blue
    },
    {
      text: '进行中',
      value: 1,
      color: Color.Blue
    },
    {
      text: '已办结',
      value: 2,
      color: Color.Green
    }
  ]

}
export default staticData
