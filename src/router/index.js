import Vue from 'vue'
import Router from 'vue-router'
import GoodsList from '../page/GoodsList'
import Cart from '../page/Cart'
import Address from '../page/Address'
import AddressList from '../page/AddressList'
import OrderConfirm from '../page/OrderConfirm'
import OrderSuccess from '../page/OrderSuccess'
import OrderList from '../page/OrderList.vue'
import GoodsDetails from '../page/GoodsDetails'
import AdminLogin from '../page/admin/AdminLogin'
import Admin from '../page/admin/Admin'
import AdminMain from '../page/admin/AdminMain'
import Index from '../page/admin/Index'
import LeftMenu from '../page/admin/LeftMenu'


Vue.use(Router)

// 解决重复点击路由报错的BUG
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err)
}


export default new Router({
  routes: [
    {
      path: '/',
      name: 'GoodsList',
      component: GoodsList
    },
    {
      path: '/goodsdetails',
      name: 'GoodsDetails',
      component: GoodsDetails
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart
    },
    {
      path: '/address',
      name: 'Address',
      component: Address
    },
    {
      path: '/addresslist',
      name: 'AddressList',
      component: AddressList
    },
    {
      path: '/orderconfirm',
      name: 'OrderConfirm',
      component: OrderConfirm
    },
    {
      path: '/orderinfo',
      name: 'OrderSuccess',
      component: OrderSuccess
    },
    {
      path: '/orderlist',
      name: 'OrderList',
      component: OrderList
    },
    {
      path: '/AdminLogin',
      name: 'AdminLogin',
      component: AdminLogin
    },
    {
      path: '/Admin',
      name: 'Admin',
      component: Admin
    }
    ,
    {
      path: '/AdminMain',
      name: 'AdminMain',
      component: AdminMain
    }
    ,
    {
      path: '/LeftMenu',
      name: 'LeftMenu',
      component: LeftMenu
    }
    ,
    {
      path: '/index',
      name: 'index',
      component: Index,
      /*children: [
        // {
        //     path: '/index/mainUser',
        //     name: '个人信息',
        //     component: MainUser,
        //     meta: { title: '个人信息', icon: 'example', path: '/index/mainUser' }
        //   },
        {
          path: '/index/modifyPwd',
          name: '修改密码',
          component: ModifyPwd,
          meta: { title: '修改密码', icon: 'example', path: '/index/modifyPwd' }
        },
        {
          path: '/index/goodsMessage',
          name: '产品信息',
          component: GoodsMessage,
          meta: { title: '产品信息', icon: 'example', path: '/index/goodsMessage' }
        },
        {
          path: '/index/order',
          name: '订单信息',
          component: Order,
          meta: { title: '订单信息', icon: 'example', path: '/index/order' }
        },
        {
          path: '/index/address',
          name: '地址信息',
          component: Address,
          meta: { title: '地址信息', icon: 'example', path: '/index/address' }
        },
      ]*/
      
    },
  ]
})
