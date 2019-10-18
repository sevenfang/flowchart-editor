/**
 * @description     更新边
 *
 * @author          重阳  
 * @create          2019-10-13 11:00
 * */


export default function (node, graph) {
  let edges = graph.getEdges()
  if (!edges || !edges.length) {
    return
  }
  let nodeModel = node.getModel()
  edges.forEach(edge => {
    let edgeModel = edge.getModel()
    if (nodeModel.id === edgeModel.attrs.start) {
      let anchorPoint = edgeModel.source
      let nodeAnchor = node.getLinkPointByAnchor(anchorPoint.index)
      graph.updateItem(edge, {
        source: nodeAnchor
      })
    } else if (nodeModel.id === edgeModel.attrs.end) {
      let anchorPoint = edgeModel.target
      let nodeAnchor = node.getLinkPointByAnchor(anchorPoint.index)
      graph.updateItem(edge, {
        target: nodeAnchor
      })
    }
  })
}
