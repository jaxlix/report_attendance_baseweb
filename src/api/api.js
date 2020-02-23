let isGaw = false   // 是否公安网
// const IP = isGaw ? 'http://59.32.1.170:9011' : 'http://issts.free-http.svipss.top'   // 百度云测试环境
const IP = isGaw ? 'http://59.32.1.170:9011' : 'http://192.168.1.67:8800'   // 公司测试环境后台服务
const APPIP = isGaw ? 'http://59.32.1.170:9011' : 'http://192.168.1.67:8081'   // 公司测试环境app服务

// const IP2 = isGaw ? 'http://59.32.1.174:6061' : 'http://192.168.1.223:6061'    // 文件服务
const IP2 = isGaw ? 'http://59.32.1.174:6061' : 'https://106.12.14.136:18086'    // 文件服务

export const api = {
    isGaw: isGaw,
    api: {
        // 登录
        login:IP + '/login', // 登录

        // 文件服务部门树接口
        findGroups: IP2 + "/file/findGroups",   // 查询部门--组
        findMembers: IP2 + "/file/findMembers", // 查询部门--人员
        findByDeptAndKey: IP2 + "/file/terminal/findByDeptAndKey",  // 查询部门--设备
        getDept: IP2 + "/file/getDept",    // 获取部门--设备

        getDeptData: IP2 + "/file/getDeptDataStr",

        delete: IP + "/manage/member/delete",   // 物理删除成员接口
        page: IP + "/manage/member/page",   // 分页查询成员接口
        register: IP + "/manage/member/register",   // 新增/注册成员接口
        setMemberState: IP + "/manage/member/setMemberState",   // 手动修改成员状态的接口
        setMemberStateByDepartment: IP + "/manage/member/setMemberStateByDepartment",  //手动修改指定部门下所有成员状态的接口
        update: IP + "/manage/member/update",   // 修改成员属性接口
        registerBatch: IP + "/manage/member/registerBatch",  // ?tMembers=wqeq批量同步

        departmentTree: IP + "/hamster/account/departmentTree", // 部门树形结构接口
        findAccountsByDeptId: IP + "/hamster/account/findAccountsByDeptId",    // ?deptId=520根据部门ID查询警员接口

        upd: APPIP + "/customer/member/setMemberState",    // 修改状态memberSign=1&stateMachineSign=1&stateSign=1
        setMemberStateBatch: APPIP + "/customer/member/setMemberStateBatch", //批量修改状态?memberSign=1&stateMachineSign=1&stateSign=1
    },
    mapUrl: {
        css: isGaw ? 'http://59.32.1.166:4869/arcgis_pc/arcgis_js_api/library/3.19/3.19/esri/css/esri.css' : // 市局pc
            'http://192.168.1.223:6062/arcgis_pc/arcgis_js_api/library/3.19/3.19/esri/css/esri.css',         // 公司测试
        js: isGaw ? 'http://59.32.1.166:4869/arcgis_pc/arcgis_js_api/library/3.19/3.19/init.js' :            // 市局pc
            'http://192.168.1.223:6062/arcgis_pc/arcgis_js_api/library/3.19/3.19/init.js',                   // 公司测试
        mapServe: isGaw ? 'http://10.73.95.153/whgaj_gis_gissite3/rest/services/whmap_201802/MapServer' :    // 市局pc
            'http://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetWarm/MapServer'                        // 公司测试
    },
    mapType: "gaode",   // 底图加载类型：gaode高德底图，pgis公安底图
    wsUrl: 'ws://127.0.0.1:8099/websocket'
}