<template>
  <div class="legend-contaienr">
    <div class="legend-list">
      <div
        v-for="item in legendList"
        :key="item.id"
        class="legend-item"
        @click="handlerClick(item)"
      >
        <div
          :class="['legend-check',checkedList.includes(item.id)?'isChecked':'']"
        />
        <div class="legend-icon" :style="{'background':item.borderColor}">
          <div class="legend-circle" :style="{'background':item.color}" />
        </div>
        <div class="legend-label">{{ item.label }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { getCesium, getInstance } from '../../js/cesiumUnit'
export default defineComponent({
  setup() {
    const router = useRouter()
    const that = reactive({
      legendList: [
        { label: '流调溯源队伍', id: 'ldsyTeam', color: 'rgb(255,187,0)', borderColor: 'rgba(255,187,0,0.4)', type: 'traceability' },
        { label: '社区封控队', id: 'fkjdTeam', color: 'rgb(0,255,180)', borderColor: 'rgba(0,255,180,0.4)', type: 'traffic' },
        { label: '核酸检测队', id: 'hscyTeam', color: 'rgb(255,71,71)', borderColor: 'rgba(255,71,71,0.4)', type: 'collect' },
        { label: '物资储备清单', id: 'fkwzcbList', color: 'rgb(0,252,255)', borderColor: 'rgba(0,252,255,0.4)', type: 'warehouse' },
        { label: '集中点隔离清单', id: 'gldList', color: 'rgb(25,171,251)', borderColor: 'rgba(25,171,251,0.4)', type: 'isolated' },
        { label: '核酸采样点清单', id: 'lshsjcdList', color: 'rgb(36,131,255)', borderColor: 'rgba(36,131,255,0.4)', type: 'sampling' }
      ],
      checkedList: [],
      dataSourceMap: {

      },
      legendData: {
        traceability: [
          {
            'pointId': '1481560723892572161',
            'pointType': 'traceability',
            'lat': '120.83003439345093,27.999375469821675',
            'instructionTeam': null
          },
          {
            'pointId': '1481562564407693314',
            'pointType': 'traceability',
            'lat': '120.78462683643865,27.884656755695143',
            'instructionTeam': null
          },
          {
            'pointId': '1481565329137700865',
            'pointType': 'traceability',
            'lat': '120.76196822856718,27.97148860234059',
            'instructionTeam': null
          }
        ],
        traffic: [
          {
            'pointId': '1484083974473814018',
            'pointType': 'traffic',
            'lat': '120.70243918334221,28.00680314415236',
            'instructionTeam': null
          },
          {
            'pointId': '1485796321223618562',
            'pointType': 'traffic',
            'lat': '120.73197546850052,28.000488185258767',
            'instructionTeam': null
          }
        ],
        collect: [
          {
            'pointId': '1484337376265003009',
            'pointType': 'collect',
            'lat': '120.69513586065479,28.024816636703743',
            'instructionTeam': null
          },
          {
            'pointId': '1484348372475994113',
            'pointType': 'collect',
            'lat': '120.66994029002149,28.010836461982773',
            'instructionTeam': null
          },
          {
            'pointId': '1484351317439438850',
            'pointType': 'collect',
            'lat': '120.69513586065479,28.024816636703743',
            'instructionTeam': null
          },
          {
            'pointId': '1484351703910998018',
            'pointType': 'collect',
            'lat': '120.73175964111748,28.001534838260703',
            'instructionTeam': null
          },
          {
            'pointId': '1485796630830362625',
            'pointType': 'collect',
            'lat': '120.72011783577273,27.98849511263781',
            'instructionTeam': null
          },
          {
            'pointId': '1485797143927959554',
            'pointType': 'collect',
            'lat': '120.72486088886384,28.000233027542894',
            'instructionTeam': null
          },
          {
            'pointId': '1485801073160335362',
            'pointType': 'collect',
            'lat': '120.71860868251646,28.00355003022297',
            'instructionTeam': null
          },
          {
            'pointId': '1490213863811719170',
            'pointType': 'collect',
            'lat': '120.69403104377159,27.997617625752262',
            'instructionTeam': null
          }
        ],
        warehouse: [
          {
            'pointId': '1481438341686415362',
            'pointType': 'warehouse',
            'lat': '120.62848109558493,28.046157027130235',
            'instructionTeam': null
          },
          {
            'pointId': '1481462926397956097',
            'pointType': 'warehouse',
            'lat': '120.61467498021705,28.06307170733584',
            'instructionTeam': null
          },
          {
            'pointId': '1481574098303291393',
            'pointType': 'warehouse',
            'lat': '120.69157391743235,28.048586078289986',
            'instructionTeam': null
          }
        ],
        isolated: [
          {
            'pointId': '1481154341772197890',
            'pointType': 'isolated',
            'lat': '120.23296506732554,27.32136676369288',
            'instructionTeam': null
          },
          {
            'pointId': '1481224707844657154',
            'pointType': 'isolated',
            'lat': '120.77619348047084,27.970917754080627',
            'instructionTeam': null
          },
          {
            'pointId': '1481434575067205634',
            'pointType': 'isolated',
            'lat': '120.61943707562854,28.05165695989865',
            'instructionTeam': null
          }
        ],
        sampling: [

          {
            'pointId': '1484451311962128386',
            'pointType': 'sampling',
            'lat': '120.70603240538092,28.014329576199128',
            'instructionTeam': null
          },
          {
            'pointId': '1486139295589564418',
            'pointType': 'sampling',
            'lat': '120.74841242219316,27.992678886373195',
            'instructionTeam': null
          }
        ]
      }
    })

    const handlerClick = (item) => {
      const index = that.checkedList.indexOf(item.id)

      // 没有就添加
      if (index === -1) {
        that.checkedList.push(item.id)
        if (that.legendData[item.type]) {
          addLegendMarker(item, that.legendData[item.type])
          return
        } else {
          addLegendMarker(item, that.legendData[item.type])
          // const params = {
          //   pointType: item.type,
          //   areaCode: store.getters.areaCode
          // }
          // getLegendListApi(params).then(res => {
          //   that.legendData[item.type] = res.data

          // })
        }
      } else {
        // 删除dataSource
        const viewer = getInstance()
        const deleteItem = that.checkedList.splice(index, 1)[0]
        viewer.dataSources.remove(that.dataSourceMap[deleteItem])
      }
    }

    // 添加点位
    const addLegendMarker = (item, markerData) => {
      const Cesium = getCesium()
      const viewer = getInstance()

      // 创建数据源
      const dataSource = new Cesium.CustomDataSource(item.type)
      viewer.dataSources.add(dataSource)
      // 存储数据
      that.dataSourceMap[item.id] = dataSource
      // 图标宽度、高度映射
      const markerWidthMap = {
        ldsyTeam: { width: 27, height: 42 },
        fkjdTeam: { width: 27, height: 42 },
        hscyTeam: { width: 27, height: 42 },
        fkwzcbList: { width: 38, height: 38 },
        gldList: { width: 38, height: 38 },
        lshsjcdList: { width: 38, height: 38 }
      }
      markerData.forEach(element => {
        const img = require(`@/assets/cesium/icon-${item.id}.png`)
        const markerSize = markerWidthMap[item.id]
        if (element.lat) {
          const lnglat = element.lat.split(',')
          const entity = {
            id: `${item.id}${element.pointId}`, // id 保持唯一性
            markerInfo: element,
            onClick: (params) => { handlerMarkerClick(params, element) },
            show: true,
            position: Cesium.Cartesian3.fromDegrees(lnglat[0], lnglat[1], 50),
            billboard: {
              image: img,
              name: element.name,
              show: true,
              width: markerSize.width,
              height: markerSize.height
            }
          }
          dataSource.entities.add(entity)
        }
      })
    }
    const handlerMarkerClick = (movement, element) => {
      const params = {
        pointId: element.pointId,
        pointType: element.pointType
      }
      alert('点位点击事件')
      // handleMarkeInfo(element)
    }

    let entityClick = null
    // markerInfo 弹窗
    let entityInstance = null
    const store = useStore()
    const handleMarkeInfo = (element) => {
      store.dispatch('cesium/setData', { key: 'markerInfo', value: element })
      const Cesium = getCesium()
      const viewer = getInstance()
      // 如果存在则先删除
      deleteMarkerInfo()
      const entityOption = {
        id: 'markerInfo',
        name: 'markerInfo',
        position: Cesium.Cartesian3.fromDegrees(element.longtitude, element.latitude),
        label: {
          text: ' ',
          show: true,
          font: '18px Helvetica'
        }
      }
      const entity = viewer.entities.add(entityOption)
      entityInstance = entity
      // 根据entity的position 做 makrerInfo相对于屏幕定位
      const tooltipContainer = document.querySelector('.marker-toolip-container')
      const markerInfoPanel = document.querySelector('#marker-popup')
      console.log(markerInfoPanel.style)
      markerInfoPanel.style.display = 'block'
      entityClick = () => {
        /**
         * 获取该点位entity 在场景中的position,会根据地图偏移而改变
         * 所以添加postRener事件去监听,这样就做到实时刷新popup位置
         */

        try {
          const entityPosition = new Cesium.Cartesian3(entity._position._value.x, entity._position._value.y, entity._position._value.z)
          const scenePosition = Cesium.SceneTransforms.wgs84ToWindowCoordinates(viewer.scene, entityPosition)
          // 样式设置  这里为了居中显示 减去了弹框的高度、宽度 120 和 240
          tooltipContainer.style.top = (scenePosition.y - tooltipContainer.clientHeight / 2 - 120) + 'px'
          tooltipContainer.style.left = (scenePosition.x - 240) + 'px'
        } catch (error) {
          // console.log(error)
        }
      }

      // 事件监听实时刷新
      viewer.scene.postRender.addEventListener(entityClick)
      // popup关闭事件
      setTimeout(() => {
        const markerCloseButton = document.querySelector('.marker-close-button')
        markerCloseButton.onclick = () => {
          deleteMarkerInfo()
        }
      }, 0)
    }
    // 关闭信息点位
    const deleteMarkerInfo = () => {
      const viewer = getInstance()
      if (entityInstance) {
        const markerInfoPanel = document.querySelector('#marker-popup')
        markerInfoPanel.style.display = 'none'
        viewer.scene.postRender.removeEventListener(entityClick)
        viewer.entities.remove(entityInstance)
      }
    }

    return {
      ...toRefs(that), handlerClick
    }
  }
})
</script>

<style lang='scss'>
.legend-contaienr{
  position: absolute;
  right: 30px;
  top: 50px;
  .legend-list{
    display: flex;
    flex-direction: column;
    background: rgba($color: #102844, $alpha: 0.88);
    padding: 12px;
    border-radius: 8px;
    box-sizing: border-box;
    border: 1px solid #0d6894;
    box-shadow: 0 0 8px rgba($color: #19b1fb, $alpha: 0.25);
    .legend-item{
      margin-right: 10px;
      color: white;
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      .legend-check{
        width: 14px;
        height: 14px;
        background:#102844;
        border: 1px solid #19b1fb;
        cursor: pointer;
        position: relative;
        border-radius: 3px;
      }
      .isChecked{
        background: #19b1fb;
        &::after{
          content: '\2714';
          position: relative;
          top: -4px;
          color: black;
        }
      }
      .legend-icon{
        width: 16px;
        height: 16px;
        box-sizing: border-box;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 6px;
        .legend-circle{
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }
      }
    }

  }
}
</style>
