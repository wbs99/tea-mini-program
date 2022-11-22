import { BehaviorWithStore } from "mobx-miniprogram-bindings";
import { appStore } from "../store/index";

export const storeBehavior = BehaviorWithStore({
  storeBindings: [
    {
      namespace: 'appStore',
      store: appStore,
      fields: ['token', 'me'],
      actions: ['fetchToken', 'logout']
    }
  ]
})