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
export async function add(params) {
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
export async function remove(params) {
  return request(`upms/dict/${params}`, {
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
export async function update(params) {
  return request('upms/dict', {
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
export async function getById(params) {
  return request(`upms/dict/${params}`);
}

/**
 * @description 获取 字典表列表
 * @author jerrychir
 * @export
 * @param {*} params
 * @returns
 */
export async function list(params) {
  return request(`upms/dict/list?${stringify(params)}`);
}

/**
 * @description 字典表 分页
 * @author jerrychir
 * @export
 * @param {*} params
 * @returns
 */
export async function page(params) {
  return request(`upms/dict/page?${stringify(params)}`);
}
