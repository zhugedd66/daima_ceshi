
import Axios  from 'axios'
import Vue from 'vue'
import qs from 'qs'
let  vm = new Vue();
// 设置公共的url
Axios.defaults.baseURL = 'https://www.luffycity.com/api/v1/';

Axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    if (localStorage.getItem('token')) {
    	// Axios.defaults.headers.common['Authorization'] = localStorage.getItem('access_token');
    	// console.log(config.headers);
    	config.headers.Authorization = localStorage.getItem('token')
    }
    // 更改加载的样式


    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });


// 分类列表api
export const categoryList =  ()=> {
	return Axios.get('http://127.0.0.1:8000/course/category/').then(res=>res.data);


};
export const  courseList = (categoryId)=>{
  return Axios.get(`http://127.0.0.1:8000/courses/?category_id=${categoryId}`).then(res=>res.data);

};
// 课程概述
export const coursedetail = (courseid)=>{
	return Axios.get(`http://127.0.0.1:8000/coursedetail/${courseid}/`).then(res=>res);
};

// geetest接口
export const geetest = ()=>{
	return Axios.get(`http://127.0.0.1:8000/api/captcha_check/`).then(res=>res.data);
};

// 登录
export const  userLogin = (params)=>{
	// 这个参数至少有五个字段 username password  验证的三个字段
	return Axios.post('http://127.0.0.1:8000/login/',params).then(res=>res);
};

// 加入购物车的接口
export const shoppingCart = (params)=>{
	return Axios.post('http://127.0.0.1:8000/shoppingcar/',params).then(res=>res.data);
};
// 购物车的数据
export const shoppingcar = ()=>{
	return Axios.get(`http://127.0.0.1:8000/shoppingcar/`).then(res=>res.data);
};
// 退出
export const logout = ()=>{
	return Axios.delete(`http://127.0.0.1:8000/logout/`).then(res=>res.data);

};
//移除课程
export const removeCourse = (params)=>{
	return Axios.delete(`http://127.0.0.1:8000/shoppingcar/`,{data:params}).then(res=>res);
};
//添加计算
export const account = (params)=>{

  return Axios.post(`http://127.0.0.1:8000/account/`,params).then(res=>res);
};
//结算列表
export const account_list = ()=>{

  return Axios.get(`http://127.0.0.1:8000/account/`).then(res=>res.data);
};

//总价格计算
export const total_price = (params)=>{

  return Axios.put(`http://127.0.0.1:8000/account/`,params).then(res=>res.data);
};
//支付
export const payment = (params)=>{

  return Axios.post(`http://127.0.0.1:8000/payment/`,params).then(res=>res.data);
};

//我的订单
export const myOrderList = ()=>{
   return Axios.get(`http://127.0.0.1:8000/myorder/`).then(res=>res.data);

};
//去支付
export const go_pay = (order_number,final_price)=>{
  return Axios.get(`http://127.0.0.1:8000/get_pay_url/?order_number=${order_number}&final_price=${final_price}`).then(res=>res.data);
};
