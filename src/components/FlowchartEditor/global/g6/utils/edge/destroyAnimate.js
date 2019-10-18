/**
 * @description     销毁边动画
 *
 * @author          重阳  
 * @create          2019-10-13 11:00
 * */


export default function (cfg, group) {
  let tmpArr = group.findAll(item => {
    return item._cfg && item._cfg.name === 'edgeAnimatePoint'
  })
  tmpArr.forEach(item => {
    item.remove && item.remove()
  })
}
