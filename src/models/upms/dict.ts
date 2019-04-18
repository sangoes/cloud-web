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
    dictList: [],
    dictPage: {},
    dict: {},
    treeDict: [],
  },
  effects: {
    // 添加字典表
    *add({ payload, callback }: ReduxAction, { call, put }: ReduxSagaEffects) {
      const response = yield call(dict.addDict, payload);
      if (check(response)) {
        message.success(response.msg);
        callback && callback();
      }
    },
    // 删除字典表
    *remove({ payload, callback }: ReduxAction, { call, put }: ReduxSagaEffects) {
      const response = yield call(dict.removeDict, payload);
      if (check(response)) {
        message.success(response.msg);
        callback && callback();
      }
    },
    // 更新字典表
    *update({ payload, callback }: ReduxAction, { call, put }: ReduxSagaEffects) {
      const response = yield call(dict.updateDict, payload);
      if (check(response)) {
        message.success(response.msg);
        callback && callback();
      }
    },
    // 获取字典表
    *getById({ payload, callback }: ReduxAction, { call, put }: ReduxSagaEffects) {
      const response = yield call(dict.getDict, payload);
      if (check(response)) {
        yield put(createAction(SAVE)({ dict: response.data }));
        callback && callback();
      }
    },
    // 获取列表字典表
    *list({ payload, callback }: ReduxAction, { call, put }: ReduxSagaEffects) {
      const response = yield call(dict.listDict, payload);
      if (check(response)) {
        yield put(createAction(SAVE)({ dictList: response.data }));
        callback && callback();
      }
    },
    // 分页字典表
    *page({ payload, callback }: ReduxAction, { call, put }: ReduxSagaEffects) {
      const response = yield call(dict.pageDict, payload);
      if (check(response)) {
        yield put(createAction(SAVE)({ dictPage: response.data }));
        callback && callback();
      }
    },
    // 查询字典表树形
    *treeDict({ payload, callback }: ReduxAction, { call, put }: ReduxSagaEffects) {
      const response = yield call(dict.treeDict, payload);
      if (check(response)) {
        yield put(createAction(SAVE)({ treeDict: response.data }));
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
