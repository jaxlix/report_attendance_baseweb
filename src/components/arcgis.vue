<template>
    <div class="arcgis" :style="styles">
        <div id="map"></div>
        <div class="close" @click="closeMap">&times;</div>
        <checkPoint
            :show="pointShow"
            :styles="pointStyle"
            :data="pointData"
            @close="close"
            @cancel="cancel"
            @confirm="confirm"
        />
    </div>
</template>

<script>
// @ is an alias to /src
import checkPoint from "@/components/qipao/checkPoint.vue";

export default {
    data() {
        return {
            map: null, // 实例化地图
            layer: null, // 实例化图层，展示坐标点
            xqfwLayer: null,
            pointShow: false,
            pointStyle: {},
            pointData: {},
            xiaquShow: false,
            xiaquStyle: {
                right: "120px",
                top: "20px"
            },
            xiaquData: [],
            jurisdictionName: "",
            jurisdictionCoordinates: "",
        };
    },
    props: ["type", "styles", "data", "clickAdd"], // type = point：点   scope:范围  yuan:预案
    components: {
        checkPoint
    },
    watch: {
        data(val) {
            if (this.type == "scope") {
                if(val.type == 'add'){
                    this.showXiaqu(val.data)
                }else if(val.type == 'upd'){
                    this.showXiaqu(val.data)
                }
            } else if (this.type == "yuan") {
                this.addpic(this.data);
            } else if (this.type == "point") {
            }
        }
    },
    methods: {
        close() {
            this.pointShow = false;
        },
        cancel() {
            this.pointShow = false;
            this.layer.clear();
        },
        confirm() {
            this.pointShow = false;
            this.layer.clear();
            this.$emit("setData", this.pointData);
        },
        closeMap() {
            this.$emit("closeMap");
        },
        xiaquClsoe() {
            this.xiaquShow = false;
            this.closeMap();
        },
        // 坐标数据上图
        addpic(data) {
            data.forEach(d => {
                d.x = d.dutyLng;
                d.y = d.dutyLat;
                d.img = require("@/assets/icon/yuan.png");
                d.width = 23;
                d.height = 27;
                this.graphics = this.$arcgis.addPictureMarker(d, this.layer);
            });
        },
        // 展示已添加辖区范围
        showXiaqu(data) {
            if (data.length > 0) {
                let option = {
                    color: "rgba(237, 84, 29, .2)",
                    outlineType: "STYLE_SHORTDASH",
                    outlineColor: "#ED541D",
                    width: 2
                };
                data.forEach(d => {
                    let list = JSON.parse(d.jurisdictionCoordinates);
                    let name = d.jurisdictionName;
                    this.$arcgis.setPolygon(list, this.xqfwLayer, option);
                    let x = 0;
                    let y = 0;
                    list.forEach(i => {
                        x += i[0];
                        y += i[1];
                    });
                    //  x:经度，y：纬度，text：文字，color：颜色, offsetX: 水平偏移量, offsetY: 垂直偏移量, haloColor: 描边颜色， haloSize： 描边大小
                    let txtOption = {
                        x: x / list.length,
                        y: y / list.length,
                        text: name,
                        color: "#e70012",
                        offsetX: 10,
                        offsetY: -10
                    };
                    this.$arcgis.addText(txtOption, this.xqfwLayer);
                });
            }
        }
    },
    mounted() {
        let i = setInterval(() => {
            if (this.$arcgis.all) {
                clearInterval(i);
                // 创建地图
                this.map = this.$arcgis.mapInit({
                    id: "map",
                    center: [114.3314, 30.549],
                    zoom: 14
                });
                // 创建图层，展示坐标点
                this.layer = this.$arcgis.createLayer(this.map);
                this.xqfwLayer = this.$arcgis.createLayer(this.map);
                if (this.type == "point") {
                    // 绑定点击事件，展示图标
                    this.map.on("click", e => {
                        this.layer.clear();
                        // 屏幕坐标转地理坐标
                        let x =
                            Math.round(e.mapPoint.getLongitude() * 1000000) /
                            1000000;
                        let y =
                            Math.round(e.mapPoint.getLatitude() * 1000000) /
                            1000000;
                        let data = {
                            x: x,
                            y: y,
                            img: require("@/assets/marker_red_hd.png"),
                            width: 39,
                            height: 25
                        };
                        this.graphics = this.$arcgis.addPictureMarker(
                            data,
                            this.layer
                        );
                        this.pointShow = true;
                        this.pointStyle = {
                            left: e.clientX - 210 + "px",
                            top: e.clientY - 255 + "px"
                        };
                        this.pointData = { x: x, y: y };
                    });
                } else if (this.type == "scope") {
                    // 添加辖区范围
                    this.$arcgis.drowPolygon(this.map, e => {
                        this._toolbar = e.target;
                        this.$arcgis.drowPolygonCallback(this.map, e.target, e);
                        this.$emit("setData", e.geometry.rings[0]);
                    });
                } else if (this.type == "yuan") {
                    // 绑定点击事件，展示图标
                    this.map.on("click", e => {
                        if (this.clickAdd) {
                            // 屏幕坐标转地理坐标
                            let x =
                                Math.round(
                                    e.mapPoint.getLongitude() * 1000000
                                ) / 1000000;
                            let y =
                                Math.round(e.mapPoint.getLatitude() * 1000000) /
                                1000000;
                            this.addpic([{ dutyLng: x, dutyLat: y }]);
                            let d = {
                                x: x,
                                y: y,
                                left: e.clientX,
                                top: e.clientY
                            };
                            this.$emit("setData", d);
                        }
                    });
                    // 点击图标显示气泡
                    this.$arcgis.click(this.layer, e => {
                        let d = {
                            x: e.graphic.attributes.dutyLng,
                            y: e.graphic.attributes.dutyLat,
                            left: e.clientX,
                            top: e.clientY,
                            data: e.graphic.attributes
                        };
                        this.$emit("setData", d);
                    });
                }
            }
        }, 200);
    }
};
</script>

<style lang="less" scope>
.arcgis {
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    #map {
        width: 100%;
        height: 100%;
    }
    .close {
        position: absolute;
        right: 20px;
        top: 20px;
        width: 40px;
        height: 40px;
        background-color: #333;
        text-align: center;
        line-height: 40px;
        border-radius: 50%;
        cursor: pointer;
        font-size: 26px;
        color: #fff;
    }
}
</style>

