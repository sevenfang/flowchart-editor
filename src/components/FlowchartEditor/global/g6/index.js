/**
 * @description     g6封装
 *
 * @author          重阳  
 * @create          2019-02-13 11:00
 * */

import G6 from '@antv/g6'
import registerBehavior from './behavior/index'
import registerEdge from './edge/index'
import registerNode from './node/index'

import config from './config/index'

// 挂载config
G6.$C = config

// 注册交互
registerBehavior(G6)
// 注册边
registerEdge(G6)
// 注册节点
registerNode(G6)

export default G6
