import { check, createAction } from '@/utils';
import { message } from 'antd';
import { DvaModel, ReduxAction, ReduxSagaEffects } from '@/interface';
import { UserState } from '@/interface/permission/user';
import * as user from '@/services/permission/user';
import { SAVE } from '@/actions/app';

const NAMESPACE = 'user';

/**
 * 链接
 */
const model: DvaModel<UserState> = {
  namespace: NAMESPACE,
  state: {
    userList: [],
    userPage: [],
    user: {},
  },
  effects: {
    // 添加用户表
    *add({ payload, callback }: ReduxAction, { call, put }: ReduxSagaEffects) {
      const response = yield call(user.addUser, payload);
      if (check(response)) {
        message.success(response.msg);
        // 分页
        yield put(createAction('page')({}));
        callback && callback();
      }
    },
    // 删除用户表
    *remove({ payload, callback }: ReduxAction, { call, put }: ReduxSagaEffects) {
      const response = yield call(user.removeUser, payload);
      if (check(response)) {
        message.success(response.msg);
        // 分页
        yield put(createAction('page')({}));
        callback && callback();
      }
    },
    // 批量删除用户表
    *batchRemove({ payload, callback }: ReduxAction, { call, put }: ReduxSagaEffects) {
      const response = yield call(user.batchRemoveUser, payload);
      if (check(response)) {
        message.success(response.msg);
        // 分页
        yield put(createAction('page')({}));
        callback && callback();
      }
    },
    // 更新用户表
    *update({ payload, callback }: ReduxAction, { call, put }: ReduxSagaEffects) {
      const response = yield call(user.updateUser, payload);
      if (check(response)) {
        message.success(response.msg);
        // 分页
        yield put(createAction('page')({}));
        callback && callback();
      }
    },
    // 获取用户表
    *getById({ payload, callback }: ReduxAction, { call, put }: ReduxSagaEffects) {
      const response = yield call(user.getUser, payload);
      if (check(response)) {
        yield put(createAction(SAVE)({ user: response.data }));
        callback && callback();
      }
    },
    // 获取列表用户表
    *list({ payload, callback }: ReduxAction, { call, put }: ReduxSagaEffects) {
      const response = yield call(user.listUser, payload);
      if (check(response)) {
        yield put(createAction(SAVE)({ userList: response.data }));
        callback && callback();
      }
    },
    // 分页用户表
    *page({ payload, callback }: ReduxAction, { call, put }: ReduxSagaEffects) {
      const response = yield call(user.pageUser, payload);
      if (check(response)) {
        yield put(createAction(SAVE)({ userPage: response.data }));
        callback && callback();
      }
    },
  },
  reducers: {
    save(state: object, { payload }: ReduxAction) {
      return {
        ...state,
        ...payload,
      };
    },
    error(state: object, { payload }: ReduxAction) {
      return {
        ...state,
        error: payload,
      };
    },
  },
  subscriptions: {
    init({ dispatch }) {},
  },
};
export default model;
