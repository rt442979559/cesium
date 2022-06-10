import { getCesium, getInstance } from '../../cesiumUnit'
import camera from './image/icon-camera.png'
export function initAggregationPoint() {
  const data = '120.67915809615407,27.988604654213518,120.67928496972216,27.9881542863983,120.67962322159299,27.9879291106714,120.68004602722107,27.98771644854628,120.68020100666652,27.988404515662634,120.68176531950805,27.98871730285591,120.68149758730412,27.987966684250544,120.68448527480504,27.987116029646966,120.68218819565742,27.986415443608298,120.68186402228304,27.98755384639356,120.68426487673393,27.98781624011788,120.68323618924825,27.9871907674165,120.68336302415956,27.986765454399364,120.68158749171153,27.986302588024472,120.68086882572884,27.986102425497972,120.67864226438715,27.986802882429277,120.67995275882573,27.98774112381468,120.68277112897545,27.988304095802878,120.68363077317115,27.986352652599,120.68969014434921,27.98607740245147,120.6896338806033,27.98800383890355,120.68856287119137,27.987541010476058,120.69160669524514,27.986940489065482,120.69174750179823,27.9854393678486,120.68990148549346,27.9854269186316,120.69049347632105,27.98767857483774,120.68753421265707,27.989029646183937,120.68653364513959,27.98721579116611,120.68829506969209,27.98606492169409,120.6931990932144,27.986727771839604'
  const points = data.split(',')
  const clusterCtl = new ClusterCtl(points)
  const ctl = new MapCtl()
  // (cameraHeight, scrollValue) => {
  //   console.log(cameraHeight, '地图高度更新了')
  //   clusterCtl.setRange(cameraHeight)
  // }

  ctl.onHeightChange((cameraHeight, scrollValue) => {
    clusterCtl.handleHeightChange(cameraHeight)
  })
}

class MapCtl {
  public Cesium
  public viewer
  public handler
  public heightChangeFn
  public cameraHeight
  public callback
  constructor() {
    this.Cesium = getCesium()
    this.viewer = getInstance()
    // this.Cesium.ScreenSpaceEventType 查看Cesium的监听事件类型
  }
  onHeightChange(callback) {
    // 监听鼠标滚动
    this.handler = new this.Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas)
    this.handler.setInputAction((scrollValue) => {
      // scrollValue 是+-100 鼠标的滚动值
      // 2. 鼠标滚动后： 在这里触发 高度改变之后的 回调函数
      callback && callback(this.getCameraHeight(), scrollValue)
    }, this.Cesium.ScreenSpaceEventType.WHEEL)
  }
  // Cesium  返回相机高度
  getCameraHeight() {
    if (this.viewer) {
      return Math.ceil(this.viewer.camera.positionCartographic.height)
    }
  }
}

class ClusterCtl {
  public radius
  public computeHeight
  public lastHeight
  public times

  public shipPointList

  public allCollect
  constructor(points) {
    this.shipPointList
  }
  handleHeightChange(cameraHeight) {
    // 1.设置聚合范围：半径，高度
    this.setRange(cameraHeight)
    // 防抖应用：存储上一次高度，如果计算出的高度 和上一次不同 才去聚合
    if (this.lastHeight !== this.computeHeight) {
      this.lastHeight = this.computeHeight
      // 2. 开始聚合
      this.getTogether(this.shipPointList)
      // 3. 绘制聚合点
      this.drawDiot()
    }
  }

  /**
   * 形成聚合点数组，最关键的一步，这里涉及到聚合算法，怎么样可以选到最优的中心聚合点及其子点
   * @param points
   */
  getTogether(points) {
    // 1. 计算出每一个点和其他所有点之间的距离形成数组 allCollect { center: 中心点, diotes: 子点：和中心点距离<=radius的点 }
    this.allCollect = this.getAllCollect()
    // 2. 根据子点的长度排序
    this.allCollect.sort((a, b) => b.diotes.length - a.diotes.length)

    // 3. 按顺序把聚合点数组allCollect放入collect
    // 排在前面的聚合点先要聚合的 依次往下去重
  }

  drawDiot() {

  }

  getAllCollect() {
    const ret = []
    // shipPointList：所有的渔船对象 里面有xyz坐标信息
    // this.shipPointList.map(cItem => {
    //   const diotes = this.shipPointList.filter(oItem => {
    //     if (oItem.id != cItem.id) {
    //       // Cesium.Cartesian3.distance 计算两点之间的距离 单位 m
    //       return Cesium.Cartesian3.distance(cItem.entity.znvPoint.xyz, oItem.entity.znvPoint.xyz) <= this.radius
    //     }
    //   })

    //   ret.push({
    //     center: cItem,
    //     diotes
    //   })
    // })

    return ret
  }

  /**
  * 设置聚合范围
  * >1000  以上的高度按照5000:200的比例来聚合
  * <=2000 不进行聚合显示
  * radius 聚合范围半径
  * computeHeight 做聚合的高度节点
  */
  setRange(cameraHeight) {
    if (cameraHeight <= 1000) {
      this.radius = 0
      this.computeHeight = 1000
    } else {
      const times = cameraHeight / 5000
      this.radius = times * 200
      this.computeHeight = times * 5000
    }
  }
}

