import { request } from '@/utils';
import qs from 'qs';
import { stringify } from 'querystring';

/**
 * @description 添加 用户表
 * @author jerrychir
 * @export
 * @param {*} params
 * @returns
 */
export async function addUser(params) {
  return request(`/api/upms/user`, {
    method: 'POST',
    body: params,
  });
}

/**
 * @description 删除 用户表
 * @author jerrychir
 * @export
 * @param {*} params
 * @returns
 */
export async function removeUser(params) {
  return request('/api/upms/user', {
    method: 'DELETE',
    body: params,
  });
}

/**
 * @description 批量删除 用户表
 * @author jerrychir
 * @export
 * @param {*} params
 * @returns
 */
export async function batchRemoveUser(params) {
  return request('/api/upms/user/batch', {
    method: 'DELETE',
    body: params,
  });
}

/**
 * @description 更新 用户表
 * @author jerrychir
 * @export
 * @param {*} params
 * @returns
 */
export async function updateUser(params) {
  return request('/api/upms/user', {
    method: 'PUT',
    body: params,
  });
}

/**
 * @description 获取 用户表
 * @author jerrychir
 * @export
 * @param {*} params
 * @returns
 */
export async function getUser(params) {
  return request(`/api/upms/user/${params}`);
}

/**
 * @description 获取 用户表列表
 * @author jerrychir
 * @export
 * @param {*} params
 * @returns
 */
export async function listUser(params) {
  return request(`/api/upms/user/list?${stringify(params)}`);
}

/**
 * @description 用户表 分页
 * @author jerrychir
 * @export
 * @param {*} params
 * @returns
 */
export async function pageUser(params) {
  return request(`/api/upms/user/page?${stringify(params)}`);
}
