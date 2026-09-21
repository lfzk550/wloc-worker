// 浏览器端 GCJ-02 换算，以字符串形式注入选点页面。
// 这是 parse.js 中同名函数的镜像；测试会校验两份实现保持一致。
export const GCJ_BROWSER_JS = `
var GCJ_A = 6378245.0, GCJ_EE = 0.00669342162296594323;
function gcjOutOfChina(lng, la) {
  return lng < 72.004 || lng > 137.8347 || la < 0.8293 || la > 55.8271;
}
function gcjDeltaLat(x, y) {
  var r = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.sqrt(Math.abs(x));
  r += ((20.0 * Math.sin(6.0 * x * Math.PI) + 20.0 * Math.sin(2.0 * x * Math.PI)) * 2.0) / 3.0;
  r += ((20.0 * Math.sin(y * Math.PI) + 40.0 * Math.sin((y / 3.0) * Math.PI)) * 2.0) / 3.0;
  r += ((160.0 * Math.sin((y / 12.0) * Math.PI) + 320 * Math.sin((y * Math.PI) / 30.0)) * 2.0) / 3.0;
  return r;
}
function gcjDeltaLon(x, y) {
  var r = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x));
  r += ((20.0 * Math.sin(6.0 * x * Math.PI) + 20.0 * Math.sin(2.0 * x * Math.PI)) * 2.0) / 3.0;
  r += ((20.0 * Math.sin(x * Math.PI) + 40.0 * Math.sin((x / 3.0) * Math.PI)) * 2.0) / 3.0;
  r += ((150.0 * Math.sin((x / 12.0) * Math.PI) + 300.0 * Math.sin((x * Math.PI) / 30.0)) * 2.0) / 3.0;
  return r;
}
function wgs84ToGcj02(lat, lon) {
  if (gcjOutOfChina(lon, lat)) return { lat: lat, lon: lon };
  var dLat = gcjDeltaLat(lon - 105.0, lat - 35.0);
  var dLon = gcjDeltaLon(lon - 105.0, lat - 35.0);
  var radLat = (lat / 180.0) * Math.PI;
  var magic = Math.sin(radLat);
  magic = 1 - GCJ_EE * magic * magic;
  var sqrtMagic = Math.sqrt(magic);
  dLat = (dLat * 180.0) / (((GCJ_A * (1 - GCJ_EE)) / (magic * sqrtMagic)) * Math.PI);
  dLon = (dLon * 180.0) / ((GCJ_A / sqrtMagic) * Math.cos(radLat) * Math.PI);
  return { lat: lat + dLat, lon: lon + dLon };
}
function gcj02ToWgs84(lat, lon) {
  if (gcjOutOfChina(lon, lat)) return { lat: lat, lon: lon };
  var wgsLat = lat, wgsLon = lon;
  for (var i = 0; i < 6; i++) {
    var g = wgs84ToGcj02(wgsLat, wgsLon);
    var errLat = g.lat - lat, errLon = g.lon - lon;
    if (Math.abs(errLat) < 1e-9 && Math.abs(errLon) < 1e-9) break;
    wgsLat -= errLat;
    wgsLon -= errLon;
  }
  return { lat: wgsLat, lon: wgsLon };
}
`;
