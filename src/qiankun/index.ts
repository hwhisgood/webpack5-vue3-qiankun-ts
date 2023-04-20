import { initGlobalState, MicroAppStateActions } from 'qiankun'

// 定义全局状态
const initialState = {}
const actions: MicroAppStateActions = initGlobalState(initialState)

export default actions
