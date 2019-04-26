import { check, createAction } from '@/utils';
import { message } from 'antd';
import { DvaModel, ReduxAction, ReduxSagaEffects } from '@/interface';
import { OauthState } from '@/interface/upms/oauth';
import * as oauth from '@/services/upms/oauth';
import * as dict from '@/services/upms/dict';
import { SAVE } from '@/actions/app';

const NAMESPACE = 'oauth';

/**
 * 链接
 */
const model: DvaModel<OauthState> = {
  namespace: NAMESPACE,
  state: {
    oauthList: [],
    oauthPage: [],
    oauth: {},
    grantType: [],
  },
  effects: {
    // 添加授权表
    *add({ payload, callback }: ReduxAction, { call, put }: ReduxSagaEffects) {
      const response = yield call(oauth.addOauth, payload);
      if (check(response)) {
        message.success(response.msg);
        // 分页
        yield put(createAction('page')({}));
        callback && callback();
      }
    },
    // 删除授权表
    *remove({ payload, callback }: ReduxAction, { call, put }: ReduxSagaEffects) {
      const response = yield call(oauth.removeOauth, payload);
      if (check(response)) {
        message.success(response.msg);
        // 分页
        yield put(createAction('page')({}));
        callback && callback();
      }
    },
    // 批量删除授权表
    *batchRemove({ payload, callback }: ReduxAction, { call, put }: ReduxSagaEffects) {
      const response = yield call(oauth.batchRemoveOauth, payload);
      if (check(response)) {
        message.success(response.msg);
        // 分页
        yield put(createAction('page')({}));
        callback && callback();
      }
    },
    // 更新授权表
    *update({ payload, callback }: ReduxAction, { call, put }: ReduxSagaEffects) {
      const response = yield call(oauth.updateOauth, payload);
      if (check(response)) {
        message.success(response.msg);
        // 分页
        yield put(createAction('page')({}));
        callback && callback();
      }
    },
    // 获取授权表
    *getById({ payload, callback }: ReduxAction, { call, put }: ReduxSagaEffects) {
      const response = yield call(oauth.getOauth, payload);
      if (check(response)) {
        yield put(createAction(SAVE)({ oauth: response.data }));
        callback && callback();
      }
    },
    // 获取列表授权表
    *list({ payload, callback }: ReduxAction, { call, put }: ReduxSagaEffects) {
      const response = yield call(oauth.listOauth, payload);
      if (check(response)) {
        yield put(createAction(SAVE)({ oauthList: response.data }));
        callback && callback();
      }
    },
    // 分页授权表
    *page({ payload, callback }: ReduxAction, { call, put }: ReduxSagaEffects) {
      const response = yield call(oauth.pageOauth, payload);
      if (check(response)) {
        yield put(createAction(SAVE)({ oauthPage: response.data }));
        callback && callback();
      }
    },
    // 获取授权模式
    *grantType({ payload, callback }: ReduxAction, { call, put }: ReduxSagaEffects) {
      const response = yield call(dict.treeDictKey, payload);
      if (check(response)) {
        yield put(createAction(SAVE)({ grantType: response.data }));
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
