import { request } from '@/utils';
import qs from 'qs';

export async function logout() {
  return request(`/api/admin/user/logout`, {
    method: 'DELETE',
    headers: {
      Authorization: 'Basic c2FuZ29lczpzYW5nb2Vz',
    },
  });
}
