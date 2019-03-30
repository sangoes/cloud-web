import { check, createAction } from '@/utils';
import { message } from 'antd';
import { DvaModel, ReduxAction, ReduxSagaEffects } from '@/interface';
import { ConnState } from '@/interface/connection';
import * as connection from '@/services/connection';
import { SAVE } from '@/actions/app';

const NAMESPACE = 'connection';

/**
 * 链接
 */
const model: DvaModel<ConnState> = {
  namespace: NAMESPACE,
  state: {
    list: [],
    page: [],
  },
  effects: {
    // 添加数据库链接
    *add({ payload, callback }: ReduxAction, { call, put }: ReduxSagaEffects) {
      const response = yield call(connection.add, payload);
      if (check(response)) {
        callback && callback();
        message.success(response.msg);
      }
    },
    // 列表
    *list({ payload }: ReduxAction, { call, put }: ReduxSagaEffects) {
      const response = yield call(connection.list, payload);
      if (check(response)) {
        yield put(createAction(SAVE)({ list: response.data }));
      }
    },
    // 分页
    *page({ payload }: ReduxAction, { call, put }: ReduxSagaEffects) {
      const response = yield call(connection.page, payload);
      if (check(response)) {
        // yield put(createAction(SAVE)({ list: response.data }));
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
