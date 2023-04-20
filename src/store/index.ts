import { defineStore } from 'pinia'
export const useUserStore = defineStore('storeUser', {
  state () {
    return {
      firstName: 'S',
      lastName: 'L',
      accessToken: 'xxxxxxxxxxxxx',
    }
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'accessToken',  //自定义 Key值
        storage: localStorage,  // 选择存储方式
		paths: ['accessToken']  // state 中的字段名，按组打包储存
		// assessToken,数据不为空时localStorage才会去存储，数据为空时，不会去存储（）
      },
    ],
  },
})
