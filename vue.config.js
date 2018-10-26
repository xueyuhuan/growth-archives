const target='http://192.168.0.184:8085/api';
module.exports = {
  // 基本路径
  baseUrl: './',
  // 输出文件目录
  outputDir: 'docs',
  css:{
    loaderOptions:{
      sass:{
        data:`@import "@/assets/scss/all.scss";`
      }
    }
  },
  devServer:{
    port:1025,
    proxy:{
      '/a':{
        target:target,
        changeOrigin:true,
        pathRewrite:{
          '^/a':''
        }
      },
    }
  }
};