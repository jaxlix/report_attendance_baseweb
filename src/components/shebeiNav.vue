<template>
    <div class="sb-nav">
        <ul class="sb-ul">
            <li class="sb-li" v-for=" (d, i) in dataList" :key="i">
                <img :src="d.img" alt="">
                <p>{{d.name}}</p>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data () {
        return {
            //1民警，2巡逻船，3警车，4摄像头，5手台，6无人机
            dataList: [],
            active: {}
        }
    },
    methods: {
        getData(){
            let data = [ 
                {name: '民警', type: 1},
                {name: '巡逻船', type: 2},
                {name: '警车', type: 3},
                {name: '摄像头', type: 4},
                {name: '手台', type: 5},
                {name: '无人机', type: 6}
            ]
            let imgs = {
                1: '../assets/shebei/car.png',
                2: '../assets/shebei/car.png',
                3: '../assets/shebei/car.png',
                4: '../assets/shebei/car.png',
                5: '../assets/shebei/car.png',
                6: '../assets/shebei/car.png'
            }
            let imgsActive = {
                1: '../assets/shebei/car-active.png',
                2: '../assets/shebei/car-active.png',
                3: '../assets/shebei/car-active.png',
                4: '../assets/shebei/car-active.png',
                5: '../assets/shebei/car-active.png',
                6: '../assets/shebei/car-active.png'
            }
            data.forEach( d => {
                d.img = require(imgs[d.type])
                d.imgActive = require(imgsActive[d.type])
            })
            this.dataList = data
        }
    },
    mounted() {
        this.getData()
    },
}
</script>

<style lang="less" scoped>
    .sb-nav{
        position: absolute;
        top: 20px;
        left: 45%;
        .sb-ul{
            display: flex;
            background-color: #fff;
            .sb-li{
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                width: 50px;
                height: 40px;
                img{
                    height: 25px;
                }
                p{
                    height: 15px;
                    font-size: #333;
                }
            }
        }
    }
</style>