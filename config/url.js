/**
 * Created by Administrator on 2018/2/28.
 */
//  开发环境配置
const devIp = '192.168.1.147'  //  服务器IP地址
const devInterfacePORT = '8083'  //  服务器接口访问端口
const devAssetsPORT = '8888' //  服务器静态资源访问端口
const devWebSocketPORT = '8997' //  服务器WS服务访问端口

// 生产环境配置（开发时不需要改动）
const prodIp = '192.168.1.155'
const prodInterfacePORT = '10198'
const prodAssetsPORT = '10180'
const prodWebSocketPORT = '10208'

const serverIP = process.env.NODE_ENV === 'production' ? prodIp : devIp
const interfacePORT = process.env.NODE_ENV === 'production' ? prodInterfacePORT : devInterfacePORT
const assetsPORT = process.env.NODE_ENV === 'production' ? prodAssetsPORT : devAssetsPORT
const webSocketPORT = process.env.NODE_ENV === 'production' ? prodWebSocketPORT : devWebSocketPORT

module.exports = {
  serverUrl: 'http://' + serverIP, // 服务器IP地址
  interfaceUrl: 'http://' + serverIP + ':' + interfacePORT + '/project/', // 服务器端接口访问地址
  assetsUrl: 'http://' + serverIP + ':' + assetsPORT + '/project/', // 服务器端静态资源访问地址
  webSocketUrl: 'ws://' + serverIP + ':' + webSocketPORT + '/ws' // 服务器端ws服务访问地址
}

