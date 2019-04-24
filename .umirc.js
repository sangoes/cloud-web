// ref: https://umijs.org/config/
export default {
  treeShaking: true,
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: true,
        dynamicImport: { webpackChunkName: true },
        title: 'cloud-web',
        dll: true,
        routes: {
          exclude: [
            /models\//,
            /services\//,
            /model\.(t|j)sx?$/,
            /service\.(t|j)sx?$/,
            /components\//,
          ],
        },
        dll: {
          exclude: [],
          include: ['dva', 'dva/router', 'dva/saga', 'dva/fetch', 'antd/es'],
        },
        // hardSource: true,
        locale: {
          enable: true, // default false
          default: 'zh-CN', // default zh-CN
          baseNavigator: true, // default true, when it is true, will use `navigator.language` overwrite default
        },
      },
    ],
  ],
  targets: {
    ie: 10,
  },
  history: 'hash',
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  theme: {
    'primary-color': '#273656',
    // 'table-row-hover-bg': rgba(3, 1, 3, 1),
  },
  proxy: {
    '/api': {
      target: 'http://127.0.0.1:6421/api',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
  },
};
