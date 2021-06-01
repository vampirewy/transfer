// table值
export const getResult = (val) => { // 普通值
  if (val === null || val === '' || val === undefined) {
    return '-';
  }
  return val;
};
export const getResultGender = (val) => { // 性别
  if (val === null) {
    return '-';
  } else if (val === 0) {
    return '不限';
  } else if (val === 1) {
    return '男';
  } else if (val === 2) {
    return '女';
  }
  return val;
};
export const getResultState = (val) => { // 0否 1是 启用
  if (val === null) {
    return '-';
  } else if (val === 0) {
    return '否';
  } else if (val === 1) {
    return '是';
  }
  return val;
};
export const getResultDate = (val) => { // 年月日时分秒转为年月日
  if (val === null || val === '' || val === undefined) {
    return '-';
  }
  return val.split(' ')[0];
};
export const getResultCompare = (val) => { // 1是 0否 对比
  if (val === null || val === '' || val === undefined) {
    return '-';
  } else if (val === 1) {
    return '是';
  } else if (val === 0) {
    return '否';
  }
  return val;
};
export const getResultMain = (val) => { // 1是 0否 重要指标
  if (val === null || val === '' || val === undefined) {
    return '-';
  } else if (val === 1) {
    return '是';
  } else if (val === 0) {
    return '否';
  }
  return val;
};
export const getResultReportState = (val) => { // 0否 1是 是否总检
  if (val === null) {
    return '-';
  } else if (val === 2) {
    return '否';
  } else if (val === 1) {
    return '是';
  }
  return val;
};
