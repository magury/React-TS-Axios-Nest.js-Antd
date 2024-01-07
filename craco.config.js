const path = require("path");

const resolve = (dir) => path.resolve(__dirname, dir);
module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      // 设置项目的上下文目录
      // 设置静态资源公共路径
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
