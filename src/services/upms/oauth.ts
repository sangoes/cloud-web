import { request } from '@/utils';
import qs from 'qs';
import { stringify } from 'querystring';

/**
 * @description 添加 授权表
 * @author jerrychir
 * @export
 * @param {*} params
 * @returns
 */
export async function addOauth(params) {
  return request(`/api/upms/oauth`, {
    method: 'POST',
    body: params,
  });
}

/**
 * @description 删除 授权表
 * @author jerrychir
 * @export
 * @param {*} params
 * @returns
 */
export async function removeOauth(params) {
  return request('/api/upms/oauth', {
    method: 'DELETE',
    body: params,
  });
}

/**
 * @description 批量删除 授权表
 * @author jerrychir
 * @export
 * @param {*} params
 * @returns
 */
export async function batchRemoveOauth(params) {
  return request('/api/upms/oauth/batch', {
    method: 'DELETE',
    body: params,
  });
}

/**
 * @description 更新 授权表
 * @author jerrychir
 * @export
 * @param {*} params
 * @returnsLL
 */
export async function updateOauth(params) {
  return request('/api/upms/oauth', {
    method: 'PUT',
    body: params,
  });
}

/**
 * @description 获取 授权表
 * @author jerrychir
 * @export
 * @param {*} params
 * @returns
 */
export async function getOauth(params) {
  return request(`/api/upms/oauth/${params}`);
}

/**
 * @description 获取 授权表列表
 * @author jerrychir
 * @export
 * @param {*} params
 * @returns
 */
export async function listOauth(params) {
  return request(`/api/upms/oauth/list?${stringify(params)}`);
}

/**
 * @description 授权表 分页
 * @author jerrychir
 * @export
 * @param {*} params
 * @returns
 */
export async function pageOauth(params) {
  return request(`/api/upms/oauth/page?${stringify(params)}`);
}
