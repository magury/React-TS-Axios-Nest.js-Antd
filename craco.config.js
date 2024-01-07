const path = require("path");

const resolve = (dir) => path.resolve(__dirname, dir);
module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      // ������Ŀ��������Ŀ¼
      // ���þ�̬��Դ����·��
      webpackConfig.output.publicPath = "/lqmusic/";
      return webpackConfig;
    },
    alias: {
      "@": resolve("src"),
      components: resolve("src/components"),
    },
  },
  // publicPath: '/lqmusic/',
  // outputDir: 'dist',
  devServer: {
    proxy: {
      "/api": {
        target: "https://music.163.com",
        changeOrigin: true,
        secure: false,
      },
    },
  },
};
