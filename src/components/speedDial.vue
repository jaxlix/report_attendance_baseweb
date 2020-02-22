<template>
    <div class="speed" @mouseout.stop="hide">
        <div class="inp-box">
            <input v-model="number" class="inp" type="text" placeholder="请输入设备编号" />
            <img class="img" src="../assets/pc/dialInputPic.png" alt />
        </div>
        <div v-show="number" class="content">
            <ul>
                <li class="item" v-for=" (d, i) in dataList" :key="i" @mouseover="showItem(i)">
                    <img :src="d.img" alt="">
                    <span>{{d.name}}</span>
                    <ul v-if="d.items" v-show="show1 == i" class="item-ul">
                        <li v-for=" (v, k) in d.items" :key="k" @mouseover="showItem2(k)">
                            {{v.name}}
                            <ul v-if="v.items" v-show="show2 == k" class="item-ul">
                                <li v-for=" (val, key) in v.items" :key="key">
                                    {{val.name}}
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            dataList: [
                {name: '拨打电话', img: require('../assets/pc/call.png')},
                // {name: '定位到地图', img: require('../assets/pc/call.png'), items: [{name: 'LTE'}, {name: '警车'}, {name: '执法记录仪'}, {name: '无人机'},{name: '电台'},{name: '警务通'}]},
                // {name: '查询轨迹', img: require('../assets/pc/call.png'), items: [{name: '电台'}, {name: '警车'}, {name: '警务通'}]},
                {name: '个呼', img: require('../assets/pc/call.png'), items: [{name: 'LTE'},{name: '电台'}, {name: '警务通'}]},
                {name: '请求图像', img: require('../assets/pc/call.png'), items: [{name: '执法记录仪'}, {name: '无人机'}, {name: 'LTE'}, {name: '摄像头'}, {name: '警务通', items: [{name: '普通回传'}, {name: '紧急回传'}]}]}
            ],
            number: "",
            show1: '',
            show2: ''
        }
    },
    methods: {
        showItem (i) {
            this.show1 = i
        },
        showItem2 (i) {
            this.show2 = i
        },
        hide(){
            this.show1 = ''
            this.show2 = ''
        }
    },
};
</script>

<style lang="less" scoped>
.speed {
    position: absolute;
    right: 280px;
    bottom: 20px;
    z-index: 99999;
    .inp-box {
        position: relative;
        height: 40px;
        .inp {
            width: 240px;
            height: 40px;
            padding-left: 20px;
            padding-right: 30px;
            background: none;
            border: 0;
            color: #fff;
            background-color: rgba(0, 0, 0, 0.5);
        }
        .inp:focus{
            background-color: rgba(0, 0, 0, 0.8);
        }
        .inp::-webkit-input-placeholder { /* WebKit browsers */
            color: #ddd;
        }
        .img {
            position: absolute;
            right: 10px;
            top: 6px;
            width: 20px;
            height: 27px;
        }
    }
    .content {
        position: absolute;
        bottom: 40px;
        width: 280px;
        background-color: rgba(0, 0, 0, 0.8);
        .item{
            position: relative;
            height: 40px;
            line-height: 40px;
            color: #fff;
            .item-ul{
                position: absolute;
                right: -140px;
                bottom: 0;
                li{
                    position: relative;
                    width: 140px;
                    height: 40px;
                    line-height: 40px;
                    color: #fff;
                    background-color: rgba(0, 0, 0, 0.8);
                    text-align: center;
                }
                li:hover{
                    box-shadow: 0 0 20px rgba(0, 186, 255, 0.8) inset;
                    color: #2ec6ff;
                }
            }
        }
        .item:hover{
            box-shadow: 0 0 20px rgba(0, 186, 255, 0.8) inset;
            color: #2ec6ff;
        }
    }
}
</style>

