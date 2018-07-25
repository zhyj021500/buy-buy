/**
 * 导入App.vue 并且利用Vue框架把App.vue中内容渲染出来
 */
import Vue from 'vue' //相当于Node中 var Vue = require('vue')
import App from './App.vue';
// 引入路由模块
import VueRouter from 'vue-router';
// //引入index 组件
import index from "./components/index.vue";
//中间件
Vue.use(VueRouter);
//实例化路由
const router = new VueRouter({
    routes :[
        { path: '/', component: index },
      { path: '/index', component: index }
    
    ]
  })
  
new Vue({
    el:"#app",
    //参考:https://cn.vuejs.org/v2/guide/render-function.html
    // render:function(createElement){
    //     return createElement(App)
    // } 
    render:h=>h(App),
     router
  
})