export const checkType = val => {
  return Object.prototype.toString.call(val).slice(8, -1);
};

export const copyDeep = origin => {
  let result;
  if (Array.isArray(origin)) {
    result = [];
    origin.forEach(v => result.push(copyDeep(v)));
  } else if (checkType(origin) === 'Object') {
    result = {};
    [...Object.keys(origin), ...Object.getOwnPropertySymbols(origin)].forEach(k => {
      result[k] = copyDeep(origin[k]);
    });
  } else {
    result = origin;
  }
  return result;
};

export const isEmpty = val => [undefined, 'null', '""', '[]', '{}'].includes(JSON.stringify(val));
