// pages/multiCharts/index.js
import * as echarts from '../../utils/ec-canvas/echarts'; //引入echarts.js
var dataList = [];
var dataList2 = [];
var k = 0;
var Chart = [];
Page({
	/**
   * 页面的初始数据
   */
  data: {
    ec1: {
      lazyLoad: true // 延迟加载
    },
    ec2: {
      lazyLoad: true // 延迟加载
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.echartsComponnet1 = this.selectComponent('#mychart1');
    this.echartsComponnet2 = this.selectComponent('#mychart2');
    this.getData(); //获取数据
  },
  getData: function () {
  	/**
  	 * 此处模拟操作：
  	 * 获取数据json
  	 */
    if (k % 2) {
      dataList = [1, 2, 3, 4, 5, 6];
      dataList2 = [7, 6, 7, 4, 3, 6];
    } else {
      dataList = [7, 6, 9, 2, 5, 6];
      dataList2 = [2, 6, 5, 2, 1, 9];
    }
    k++;
    /**
  	 * 此处模拟操作：
  	 * 循环更新各个图表数据
  	 */
    if (!Chart[0]) {
      this.init_echarts(1); //初始化图表
    } else {
      this.setOption(1); //更新数据
    }
    if (!Chart[1]) {
      this.init_echarts(2); //初始化图表
    } else {
      this.setOption(2); //更新数据
    }
  },
  //初始化图表
  init_echarts: function (i) {
    this['echartsComponnet' + i].init((canvas, width, height) => {
      // 初始化图表
      Chart[i - 1] = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      this.setOption(i);
      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return Chart[i - 1];
    });
  },
  setOption: function (i) {
    Chart[i - 1].clear();  // 清除
    Chart[i - 1].setOption(this['getOption' + i]());  //获取新数据
  },
  getOption1: function () {
    // 指定图表的配置项和数据
    var option = {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: dataList,
        type: 'line'
      }]
    }
    return option;
  },
  getOption2: function () {
    // 指定图表的配置项和数据
    var option = {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: dataList2,
        type: 'bar'
      }]
    }
    return option;
  }
})
