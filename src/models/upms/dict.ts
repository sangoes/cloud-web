import { check, createAction } from '@/utils';
import { message } from 'antd';
import { DvaModel, ReduxAction, ReduxSagaEffects } from '@/interface';
import { DictState } from '@/interface/upms/dict';
import * as dict from '@/services/upms/dict';
import { SAVE } from '@/actions/app';

const NAMESPACE = 'dict';

/**
 * 链接
 */
const model: DvaModel<DictState> = {
  namespace: NAMESPACE,
  state: {
    list: [],
    page: [],
    dict: {},
  },
  effects: {
    // 添加字典表
    *add({ payload, callback }: ReduxAction, { call, put }: ReduxSagaEffects) {
      const response = yield call(dict.add, payload);
      if (check(response)) {
        callback && callback();
        message.success(response.msg);
      }
    },
    // 删除字典表
    *remove({ payload, callback }: ReduxAction, { call, put }: ReduxSagaEffects) {
      const response = yield call(dict.remove, payload);
      if (check(response)) {
        callback && callback();
        message.success(response.msg);
      }
    },
    // 更新字典表
    *update({ payload, callback }: ReduxAction, { call, put }: ReduxSagaEffects) {
      const response = yield call(dict.update, payload);
      if (check(response)) {
        callback && callback();
        message.success(response.msg);
      }
    },
    // 获取字典表
    *getById({ payload, callback }: ReduxAction, { call, put }: ReduxSagaEffects) {
      const response = yield call(dict.getById, payload);
      if (check(response)) {
        callback && callback();
        yield put(createAction(SAVE)({ dict: response.data }));
      }
    },
    // 获取列表字典表
    *list({ payload, callback }: ReduxAction, { call, put }: ReduxSagaEffects) {
      const response = yield call(dict.list, payload);
      if (check(response)) {
        callback && callback();
        yield put(createAction(SAVE)({ list: response.data }));
      }
    },
    // 分页字典表
    *page({ payload, callback }: ReduxAction, { call, put }: ReduxSagaEffects) {
      const response = yield call(dict.page, payload);
      if (check(response)) {
        callback && callback();
        yield put(createAction(SAVE)({ page: response.data }));
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
