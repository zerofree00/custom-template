/*
 * Created Date: Monday June 3rd 2019
 * Author: lugusliu
 * Copyright (c) 2019 doBell
 * HISTORY:
 */
// 获取传入时间节点的那一天的0点的时间戳
const theDayStartTime = time =>
  new Date(
    `${time.getFullYear()}-${time.getMonth() + 1 < 10 ? '0' + (time.getMonth() + 1) : time.getMonth() + 1}-${
      time.getDate() < 10 ? '0' + time.getDate() : time.getDate()
    }T00:00:00.000+08:00`
  );

// 深度过滤对象中的值为空字符串，undefined，null的情况
export const removeEmpty = obj => {
  if (Object.prototype.toString.call(obj) === '[object Object]') {
    Object.entries(obj).forEach(
      ([key, val]) =>
        (val && typeof val === 'object' && removeEmpty(val)) ||
        ((val === null || val === undefined || val === '') && delete obj[key])
    );
    return obj;
  } else {
    return obj;
  }
};

// 数组对象排序
export const compareArrayObject = propertyName => {
  return function(object1, object2) {
    const value1 = object1[propertyName];
    const value2 = object2[propertyName];
    if (value1 < value2) {
      return -1;
    } else if (value1 > value2) {
      return 1;
    } else {
      return 0;
    }
  };
};

// 解析后端传来的时间格式
export const formatTime = (timestamp = 0) => {
  const time = new Date(timestamp);
  const matches = {
    y: time.getFullYear(),
    m: time.getMonth() + 1,
    d: time.getDate(),
  };
  return `${matches.y}-${matches.m < 10 ? '0' + matches.m : matches.m}-${matches.d < 10 ? '0' + matches.d : matches.d}`;
};

// 判断传入的变量能否被JSON parse
export const isValidJSON = text => {
  if (text === null) {
    return false;
  }
  try {
    JSON.parse(text);
    return true;
  } catch {
    return false;
  }
};

// 格式化动态列表中过去某个时间点距现在的时间差
export const diffTimeForMoment = (time = '1970-01-01') => {
  const previousTimestamp = new Date(`${time}T00:00:00.000+08:00`);
  const currentTimestamp = theDayStartTime(new Date());
  const weekText = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
  const dayText = ['今', '昨'];
  const oneDayTime = 24 * 60 * 60 * 1000;
  const diff = (currentTimestamp - previousTimestamp) / oneDayTime;
  if (diff > 1) {
    return {
      day: `${+time.slice(5, 7)}/${+time.slice(-2)}`,
      week: weekText[previousTimestamp.getDay()],
    };
  }
  if (diff === 0 || diff === 1) {
    return {
      day: dayText[diff],
      week: weekText[previousTimestamp.getDay()],
    };
  }
  return {
    day: '1/1',
    week: '周四',
  };
};

// 格式化未来某个时间点距现在的时间差
export const diffTimeForNode = (time = 0) => {
  const targetTime = new Date(time);
  const currentTime = new Date();
  const targetTimestamp = theDayStartTime(targetTime);
  const currentTimestamp = theDayStartTime(currentTime);
  const weekText = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
  const dayText = ['今天', '明天', '后天'];
  const oneDayTime = 24 * 60 * 60 * 1000;
  const diff = (targetTimestamp - currentTimestamp) / oneDayTime;
  if (diff > 2) {
    return diff + currentTime.getDay() > 7
      ? diff + currentTime.getDay() > 14
        ? {
            text: formatTime(targetTime),
            type: 'primary',
          }
        : {
            text: '下' + weekText[targetTime.getDay()],
            type: 'primary',
          }
      : {
          text: '本' + weekText[targetTime.getDay()],
          type: 'primary',
        };
  }
  if (diff === 0 || diff === 1 || diff === 2) {
    return {
      text: dayText[diff],
      type: 'warning',
    };
  }
  if (diff < 0) {
    // 调用函数未传入参数，启用参数默认值，targetTime 为 1970-01-01，diff 约为 -17960 左右。此时判定只指定了节点人员没有截止时间
    return diff > -17900
      ? {
          text: formatTime(targetTime),
          type: 'danger',
        }
      : {
          text: '',
          type: 'primary',
        };
  }
};

// MIME 文件类型过滤
export const mimeFileTypeFilter = str => {
  let svgType = 'file_unknow';
  const dataBase = [
    {
      type: 'file_word',
      base: ['msword', 'vnd.openxmlformats-officedocument.wordprocessingml.document', 'x-iwork-pages-sffpages'],
    },
    {
      type: 'file_excel',
      base: [
        'csv',
        'vnd.ms-excel',
        'vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'x-iwork-numbers-sffnumbers',
      ],
    },
    {
      type: 'file_ppt',
      base: [
        'vnd.ms-powerpoint',
        'vnd.openxmlformats-officedocument.presentationml.presentation',
        'x-iwork-keynote-sffkey',
      ],
    },
    {
      type: 'file_pdf',
      base: ['pdf'],
    },
    {
      type: 'file_txt',
      base: ['plain'],
    },
    {
      type: 'file_pic',
      base: ['png', 'bmp', 'jpeg', 'gif', 'svg+xml', 'webp', 'vnd.microsoft.icon'],
    },
    {
      type: 'file_rarzip',
      base: ['x-bzip', 'x-bzip2', 'java-archive', 'x-rar-compressed', 'x-tar', 'zip', 'x-7z-compressed'],
    },
    {
      type: 'file_code',
      base: ['javascript', 'json', 'x-sh', 'xml', 'html'],
    },
  ];
  dataBase.forEach(v => {
    if (v.base.includes(str)) {
      svgType = v.type;
    }
  });
  return svgType;
};

// 字符串是否包含中文
export const isContainChinese = str => /.*[\u4e00-\u9fa5]+.*/.test(str);
