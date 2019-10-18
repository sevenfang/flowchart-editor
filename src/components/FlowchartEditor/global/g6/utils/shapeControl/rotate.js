/**
 * @description     图形旋转
 *
 * @author          重阳  
 * @create          2019-10-13 11:00
 * */


export default function (cfg, group, radian) {
  let { id, shapeControl } = cfg
  // 处理边框
  let shapeControlEdge = group.findById(id + '_shape_control_edge')
  if (shapeControlEdge) {
    // FIXME g中shape的rotate是角度累加的，所以更新时如果style中有rotate就重置一下变换
    shapeControlEdge.resetMatrix()
    shapeControlEdge.rotate(radian)
  }
  // 处理控制点
  if (shapeControl && shapeControl.hasOwnProperty('controllers') && shapeControl.controllers.length) {
    for (let i = 0, len = shapeControl.controllers.length; i < len; i++) {
      let shapeControlPoint = group.findById(id + '_shape_control_point_' + i)
      if (shapeControlPoint) {
        shapeControlPoint.resetMatrix()
        shapeControlPoint.rotate(radian)
      }
    }
  }
  // 处理旋转
  if (shapeControl && shapeControl.hasOwnProperty('rotate') && shapeControl.rotate) {
    let shapeControlRotate = group.findById(id + '_shape_control_rotate')
    if (shapeControlRotate) {
      shapeControlRotate.resetMatrix()
      shapeControlRotate.rotate(radian)
    }
  }
}
