import { request } from '@/utils';
import qs from 'qs';
import { stringify } from 'querystring';

/**
 * @description 添加 字典表
 * @author jerrychir
 * @export
 * @param {*} params
 * @returns
 */
export async function addDict(params) {
  return request(`/api/upms/dict`, {
    method: 'POST',
    body: params,
  });
}

/**
 * @description 删除 字典表
 * @author jerrychir
 * @export
 * @param {*} params
 * @returns
 */
export async function removeDict(params) {
  return request(`/api/upms/dict/${params}`, {
    method: 'DELETE',
  });
}

/**
 * @description 更新 字典表
 * @author jerrychir
 * @export
 * @param {*} params
 * @returns
 */
export async function updateDict(params) {
  return request('/api/upms/dict', {
    method: 'PUT',
    body: params,
  });
}

/**
 * @description 获取 字典表
 * @author jerrychir
 * @export
 * @param {*} params
 * @returns
 */
export async function getDict(params) {
  return request(`/api/upms/dict/${params}`);
}

/**
 * @description 获取 字典表列表
 * @author jerrychir
 * @export
 * @param {*} params
 * @returns
 */
export async function listDict(params) {
  return request(`/api/upms/dict/list?${stringify(params)}`);
}

/**
 * @description 字典表 分页
 * @author jerrychir
 * @export
 * @param {*} params
 * @returns
 */
export async function pageDict(params) {
  return request(`/api/upms/dict/page?${stringify(params)}`);
}

/**
 * @description 获取 字典表 树形
 * @author jerrychir
 * @export
 * @param {*} params
 * @returns
 */
export async function treeDict(params) {
  return request(`/api/upms/dict/tree/${params}`);
}
