<template>
    <div class="qipao">
        <!-- 民警 -->
        <div v-show="show['minjing']" class="info-window" :style="styleMj ? styleMj :styles">
            <div @click="close('minjing')" class='close'>x</div>
            <div v-show="!styleMj" class='jiao'></div>
            <div v-show="styleMj" class='jiao-left'></div>
            <div class='msg'>
                <img src="../assets/pc/minjing.png" alt="">
                <p class='name font14'>{{ data.name}} {{ data.groupNo}}</p>
                <p class='ssfj'>{{ data.address}}</p>
                <p class='sudu'>{{ data.phone}}</p>
            </div>
            <div class='btns'>
                <ul>
                    <li @click='individualCall(10000120)'>
                        <div>
                            <img src="../assets/pc/10.png" alt="">
                        </div>
                        <p>警务通个呼</p>
                    </li>
                    <li @click='video(88011075,"TERMINAL_PHONE")'>
                        <div>
                            <img src="../assets/pc/10.png" alt="">
                        </div>
                        <p>警务通视频</p>
                    </li>
                    <li @click='individualCall("72020850")'>
                        <div>
                            <img src="../assets/pc/3.png" alt="">
                        </div>
                        <p>电台</p>
                    </li>
                    <li @click='lteVideo("34020100001320000021")'>
                        <div>
                            <img src="../assets/pc/1.png" alt="">
                        </div>
                        <p>LTE</p>
                    </li>
                    <li @click='video(77000000,"TERMINAL_BODY_WORN_CAMERA")'>
                        <div>
                            <img src="../assets/pc/5.png" alt="">
                        </div>
                        <p>执法仪</p>
                    </li>
                    <li @click="showWurenji">
                        <div id="planeClickImgDiv">
                            <img src="../assets/pc/6.png" alt="">
                        </div>
                        <p class="plane2">无人机</p>
                    </li>
                </ul>
            </div>
        </div>

        <!-- 巡逻船 -->
        <div v-show="show['xunluochuan']" class="info-window" :style="styles">
            <div @click="close('xunluochuan')" class='close'>x</div>
            <div class='jiao'></div>
            <div class='msg'>
                <img src="../assets/pc/model-boat.png" alt="">
                <p class='name font14'>巡逻船 {{ data.groupNo}}</p>
                <p class='ssfj'>{{ data.name}}</p>
                <p class='sudu'>{{ data.speed}}km/h</p>
            </div>
            <div class='btns'>
                <ul>
                    <li @click="showMinjing">
                        <div class="policeClickLi" id="policeClickImgDiv">
                            <img src="../assets/pc/model-person.png" alt="">
                        </div>
                        <p class="police2">吴迪</p>
                    </li>
                    <li>
                        <div id="ballClickImgDiv">
                            <img src="../assets/pc/2.png" alt="">
                        </div>
                        <p class="ball2">布控球</p>
                    </li>
                </ul>
            </div>
        </div>

        <!-- 警车 -->
        <div v-show="show['jingche']" class="info-window" :style="styles">
            <div @click="close('jingche')" class='close'>x</div>
            <div class='jiao'></div>
            <div class='msg'>
                <img src="../assets/pc/car-bg.png" alt="">
                <p class='name font14'>{{ data.carNo}}</p>  
                <p class='ssfj'>{{ data.name}}</p>  
                <p class='sudu'>{{ data.speed}}km/h</p>  
            </div>
            <div class='btns'>
                <ul>
                    <li>
                        <div id="policeClickImgDiv">
                            <img src="../assets/pc/model-person.png" alt="">
                        </div>
                        <p class="police2">吴迪</p>
                    </li>
                    <li>
                        <div id="ballClickImgDiv">
                            <img src="../assets/pc/2.png" alt="">
                        </div>
                        <p class="ball2">布控球</p>
                    </li>
                    <li @click='individualCall("72020850")'>
                        <div>
                            <img src="../assets/pc/11.png" alt="">
                        </div>
                        <p>车台</p>
                    </li>
                </ul>
            </div>
        </div>

        <!-- 摄像头 -->
        <div v-show="show['shexiangtou']" class="info-window" :style="styles">
            <div @click="close('shexiangtou')" class='close'>x</div>
            <div class='jiao'></div>
            <div class='mT30 msg'>
                <img src="../assets/pc/cameraInfoIcon.png" alt="">
            </div>
            <div class="btns">
                <div>{{data.name }}</div>
                <div class="mT20">{{data.address }}</div>
                <div class="mT70" @click='cityVideo'>
                    <img src="../assets/pc/preview_1.png" alt="">
                </div>
            </div>
        </div>

        <!-- 手台 -->
        <div v-show="show['shoutai']" class="info-window" :style="styles">
            <div @click="close('shoutai')" class='close'>x</div>
            <div class='jiao'></div>
            <div class='msg mT60'>
                <img src="../assets/pc/hand-bg.png" alt="">
            </div>
            <div class='btns'>
               <p>{{ data.groupNo}}</p>
               <p style='margin-bottom:20px;'>{{ data.name}}</p>
               <p>设备类型： {{ data.equipType}}</p>
               <p>行驶速度： {{ data.speed}}km/h</p>
               <p>定位时间： {{ data.locationTime}}</p>
               <div>
                    <a @click='individualCall("72020850")' href="javascript:void(0)">
                        <img src="../assets/pc/call-2.png" alt="">
                    </a>
               </div>
            </div>
        </div>

        <!-- 无人机 -->
        <div v-show="show['wurenji']" class="info-window" :style="stylesWrj ? stylesWrj : styles">
            <div @click="close('wurenji')" class='close'>x</div>
            <div v-show="!stylesWrj" class='jiao'></div>
            <div v-show="stylesWrj" class='jiao-left'></div>
            <div class='msg mT30'>
                <img src="../assets/pc/UAV-bg.png" alt="">
            </div>
            <div class='btns font14'>
                <p class="font16">无人机</p>
                <p>{{ data.name}}</p>
                <p class="mT20">行驶速度： <span class="speed">{{ data.speed}}km/h</span></p>
                <p>定位时间： {{ data.locationTime}}</p>
                <div class="mT50" @click='video(88000369,"TERMINAL_UAV")'>
                    <img src="../assets/pc/preview_1.png" alt="">
                </div>
            </div>
        </div>

        <!-- 布控球 -->
        <div v-show="show['bukongqiu']" class="info-window2" :style="styles">
            <div @click="close('bukongqiu')" class='close2'>x</div>
            <div class='jiao-left'></div>
            <div class='mT30 msg msg100'>
                <img src="../assets/pc/bukongqiu.png" alt="">
            </div>
            <div class="btns textAL">
                <div>布控球 7210</div>
                <div>东湖分局</div>
                <p class="mT20">
                    <span>行驶速度：</span>
                    <span class="speed">25m/h</span>
                </p >
                <p>定位时间：07-30 08：37：02</p >
                <div class="mT50" @click='lteVideo("32010000001320000114")'>
                    <img src="../assets/pc/preview_1.png" alt="">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import rhtxApi from '@/rhtx'

export default {
    data () {
        return {
            styleMj: {},
            stylesWrj: {}
        }
    },
    props: ['show', 'styles', 'data'],
    methods: {
        close(type){
            this.show[type] = false
        },
        // 个呼 ：警务通、手台、车台、电台
        individualCall(num){
            rhtxApi.individualCall(num)
        },
        // 视频回调
        video(num, type){
            rhtxApi.video(num, type)
        },
        // lte视频回调
        lteVideo(num){
            rhtxApi.lteVideo(num)
        },
        // 城市摄像头
        cityVideo(num){
            rhtxApi.cityVideo(num)
        },
        // 
        showMinjing(){
            this.show.minjing = true
            this.styleMj = {
                left: Number(this.styles.left.replace('px', '')) + 220 + 'px',
                top: Number(this.styles.top.replace('px', '')) - 65 + 'px',
                zIndex: 10000
            }
        },
        //
        showWurenji(){
            this.show.wurenji = true
            this.styleMj = {
                left: Number(this.styles.left.replace('px', '')) + 220 + 'px',
                top: Number(this.styles.top.replace('px', '')) - 65 + 'px',
                zIndex: 10001
            }
        }
    }
}
</script>

<style lang="less" scoped>
.info-window{
    position: absolute;
    z-index: 9999;
    width: 400px;
    height: 230px;
    background-color: rgba(13, 24, 43, .7);
    box-shadow: 4px;
    box-shadow: 1px 1px 5px rgba(0, 0, 0, .7);
    color: #fff;
}
.info-window2{
    position: absolute;
    z-index: 10000;
    width: 400px;
    height: 230px;
    background-color: rgb(50,60,74);
    box-shadow: 4px;
    box-shadow: 1px 1px 5px rgba(0, 0, 0, .7);
    color: #fff;
}


.info-window .close{  
    position: absolute;
    top: 0;
    right: 0;
    width: 30px;
    height: 30px;
    font-size: 22px;
    text-align: center;
    line-height: 20px;
    cursor: pointer;
}

.info-window .close2{  
    position: absolute;
    top: 0;
    right: 0;
    width: 30px;
    height: 30px;
    font-size: 22px;
    text-align: center;
    line-height: 20px;
    cursor: pointer;
}

.info-window .jiao{
    position: absolute;
    bottom: -20px;
    left: 189px;
    border: 10px solid transparent;
    border-top-color: rgba(0, 0, 0, .5);
}
.info-window .jiao-left{
    position: absolute;
    bottom: 90px;
    left: -20px;
    border: 10px solid transparent;
    border-right-color: rgba(0, 0, 0, .5);
}
.info-window .msg{
    float: left;
    width: 140px;
    text-align: center;
}
.info-window .msg img{
    width: 100px;
    height: 100px;
    margin-top: 20px;
    margin-left: 20px;
}
.info-window .msg .name{
    font-size: 20px;
    margin-bottom: 5px;
}
.info-window .msg .ssfj{
    font-size: 14px;
}
.info-window .msg .sudu{
    margin-top: 10px;
    font-size: 14px;
    color: #B69C74;
}
.info-window .btns{
    margin-left: 140px;
    margin-top: 20px;
}
.info-window .btns li{
    float: left;
    width: 33%;
    margin-top: 10px;
    text-align: center;
}
.info-window .btns li>div{
    margin: 0 auto;
    width: 60px;
    height: 60px;
    border-radius: 10px;
    background-color: rgba(0, 0, 0, .8);
    text-align: center;
    cursor: pointer;
}
.info-window .btns img{
    width: 30px;
    height: 30px;
    margin-top: 15px;
}

.info-window .btns .msg100 img{
    width: 100px;
    height: 100px;
}

.speed{
    color: #B69C74;
}

.mT10{
    margin-top: 10px !important;
}
.mT20{
    margin-top: 20px !important;
}
.mT25{
    margin-top: 25px !important;
}
.mT30{
    margin-top: 30px !important;
}
.mT50{
    margin-top: 50px !important;
}
.mT60{
    margin-top: 60px !important;
}
.mT70{
    margin-top: 70px !important;
}
.fl{
    float:left;

}
.fr{
    float:right;
}
.textAL{
    text-align: left;
}
.plane2{
    position: relative;
}
.colorBlue{
    color:rgb(97, 201, 241) !important;
}
.font14{
    font-size: 14px !important;
}
.font16{
    font-size: 16px !important;
}
</style>