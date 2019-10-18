/**
 * @description     设置边状态
 *
 * @author          重阳  
 * @create          2019-10-13 11:00
 * */


import config from '../../config'
// import drawEdgeAnimate from './drawEdgeAnimate'
// import destroyEdgeAnimate from './destroyEdgeAnimate'

export default function (name, value, item) {
  if (name === 'active') {
    let group = item.getContainer()
    let children = group.get('children')
    let line = children[0]
    // 处理线条状态
    if (line) {
      if (value) {
        line.attr(config.line.style.active)
        // 绘制边动画
        // drawEdgeAnimate(item.getModel(), item.getContainer())
      } else {
        line.attr(config.line.style.inactive)
        // 销毁边动画
        // destroyEdgeAnimate(item.getModel(), item.getContainer())
      }
    }
  }
  if (name ==='hover') {
    let group = item.getContainer()
    let children = group.get('children')
    let line = children[0]
    // 处理线条状态
    if (line) {
      if (value) {
        line.attr(config.line.style.active)
        // 绘制边动画
        // drawEdgeAnimate(item.getModel(), item.getContainer())
      } else {
        line.attr(config.line.style.inactive)
        // 销毁边动画
        // destroyEdgeAnimate(item.getModel(), item.getContainer())
      }
    }
  }
}
