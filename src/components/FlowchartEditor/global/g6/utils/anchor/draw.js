/**
 * @description     绘制锚点
 *
 * @author          重阳  
 * @create          2019-10-13 11:00
 * */


import config from '../../config'

export default function (cfg, group) {
  let { anchorPoints, width, height, id } = cfg
  let shape = group.getFirst()
  // console.log('getAnchorPoints', id, shape)
  if (anchorPoints && anchorPoints.length) {
    for (let i = 0, len = anchorPoints.length; i < len; i++) {
      let anchorX
      let anchorY
      // if (shape && shape.get('type') === 'path') {
      //   let point = shape.getPoint((i) / len)
      //   console.log('path的point',point)
      //   anchorX = point.x
      //   anchorY = point.y
      // } else {
      //   let [x, y] = anchorPoints[i]
      //   // 计算Marker中心点坐标
      //   let originX = -width / 2
      //   let originY = -height / 2
      //   anchorX = x * width + originX
      //   anchorY = y * height + originY
      // }
      /*此处只加上下左右四个顶点*/
      let [x, y] = anchorPoints[i]
      // 计算Marker中心点坐标
      let originX = -width / 2
      let originY = -height / 2
      anchorX = x * width + originX
      anchorY = y * height + originY


      let flag = shape.isPointInPath(anchorX, anchorY)
      // console.log('isPointInPath', anchorPoints[i], anchorX, anchorY, flag)
      // 添加锚点背景
      let anchorBgShape = group.addShape('marker', {
        id: id + '_anchor_bg_' + i,
        attrs: {
          boxName: 'anchor',
          name: 'anchorBg',
          x: anchorX,
          y: anchorY,
          // 锚点默认样式
          ...config.anchorBg.style.default
        }
      })
      // 添加锚点Marker形状
      let anchorShape = group.addShape('marker', {
        id: id + '_anchor_' + i,
        attrs: {
          boxName: 'anchor',
          name: 'anchorPoint',
          x: anchorX,
          y: anchorY,
          // 锚点默认样式
          ...config.anchor.style.default,
          fill: flag ? 'red' : config.anchor.style.default.fill
        }
      })

      anchorShape.on('mouseenter', function () {
        anchorBgShape.attr({
          ...config.anchorBg.style.active
        })
      })
      anchorShape.on('mouseleave', function () {
        anchorBgShape.attr({
          ...config.anchorBg.style.inactive
        })
      })
    }
  }
}
