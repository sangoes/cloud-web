export default {
  namespace: 'tem',

  state: {},

  reducers: {
    save(state, action) {
      return { ...state, ...action };
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      yield put({ type: 'save' });
    },
  },

  subscriptions: {
    init({ dispatch }) {},
  },
};
