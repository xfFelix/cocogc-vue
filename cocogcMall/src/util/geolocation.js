

class Geolocation {

  constructor() {
    this.cityName = ''
    this.address = ''
  }

  /**
   * 浏览器定位
   */
  getGeolocation(callback) {
    try{
      let self = this
      var map = new BMap.Map("allmap")
      var point = new BMap.Point(116.331398,39.897445)
      map.centerAndZoom(point,12)
      var geolocation = new BMap.Geolocation();
      geolocation.getCurrentPosition(function(r){
        if(this.getStatus() == BMAP_STATUS_SUCCESS){
          var mk = new BMap.Marker(r.point)
          map.addOverlay(mk)
          map.panTo(r.point)
          // Toast('您的位置：'+r.point.lng+','+ r.point.lat);
          var gc = new BMap.Geocoder();
          gc.getLocation(r.point, (rs)=>{
            var addComp = rs.addressComponents;
            var address =  addComp.province + ' ' + addComp.city + ' ' + addComp.district;
            callback(address)
            return address
          });
        }
        else {
          callback(undefined)
          // Toast('定位失败')
          // self.getSDK()
        }
      })
    } catch (e) {
      console.log(e)
    }
  }
  /**
   * 辅助百度SDK定位
   */
  getSDK(callback) {
    var map = new BMap.Map("allmap")
    var point = new BMap.Point(116.331398,39.897445)
    map.centerAndZoom(point,12)
    var geolocation = new BMap.Geolocation()
    // 开启SDK辅助定位
    geolocation.enableSDKLocation()
    geolocation.getCurrentPosition(function(r){
      if(this.getStatus() == BMAP_STATUS_SUCCESS){
        var mk = new BMap.Marker(r.point)
        map.addOverlay(mk)
        map.panTo(r.point)
        // Toast('您的位置：'+r.point.lng+','+r.point.lat)
        var gc = new BMap.Geocoder();
        gc.getLocation(r.point, (rs)=>{
          var addComp = rs.addressComponents;
          var address =  addComp.province + ' ' + addComp.city + ' ' + addComp.district;
          callback(address)
          return address
        });
      }
      else {
        callback(undefined)
        Toast('定位失败')
      }
    });
  }
  /**
   * IP 定位
   */
  getIP() {
    try {
      let promise = new Promise((resolve, reject) => {
        var map = new BMap.Map("allmap")
        var point = new BMap.Point(116.331398,39.897445)
        map.centerAndZoom(point,12)

        function myFun(result){
          var cityName = result.name
          map.setCenter(cityName)
          resolve(result)
          // Toast("当前定位城市:"+ cityName)
        }
        var myCity = new BMap.LocalCity()
        myCity.get(myFun)
      })
      return promise
    } catch(e) {
      Toast('IP定位失败')
      return null
    }
  }

}

export default Geolocation
