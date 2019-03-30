/**
 * 网络请求
 */
export { default as request } from './request';
/**
 * 统一处理action
 * @param {*} type
 */
export const createAction = type => payload => ({ type, payload });
/**
 * 统一处理action
 * @param {*} type
 */
export const createActions = type => payload => callback => ({ type, payload, callback });

/**
 * 网络检查
 * @param {*} response
 */
export const check = response => response && response.code == 200;

/**
 * 对象 to 数组 {0: 'a', 1: 'b'} -> ['a', 'b']
 * @param obj
 */
export function objToArray(obj: any): any[] {
  const result = [];
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      let numKey = Number(key);
      if (numKey && typeof numKey === 'number') {
        const element = obj[key];
        result.push(element);
      }
    }
  }
  return result;
}
