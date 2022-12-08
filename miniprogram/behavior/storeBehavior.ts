import { BehaviorWithStore } from "mobx-miniprogram-bindings";
import { cartStore } from "../store/cart";
import { appStore } from "../store/index";

export const storeBehavior = BehaviorWithStore({
  storeBindings: [
    {
      namespace: 'appStore',
      store: appStore,
      fields: ['token', 'me', 'activeTabBar'],
      actions: ['fetchToken', 'logout', 'switchTabBar']
    },
    {
      namespace: 'cartStore',
      store: cartStore,
      fields: ['items', 'total', 'totalPrice'],
      actions: []
    }
  ]
})