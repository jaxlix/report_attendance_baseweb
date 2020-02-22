<template>
    <div class="content">
        <ul>
            <li class="item" :class="classesAction[item.type] ? 'item'+item.type : ''" v-for="(item, key) in dataList" :key="key">
                <span class="title">{{item.name}}</span>
                <span class="speak" :class="chooseAction == item.type ? 'speakReady' : ''" @click="choose(item.type)"></span>
                <span class="listen" :class="classesAction[item.type] ? 'listening' : ''" @click="listen(item.type)"></span>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data() {
        return {
            dataList: [
                { name: '赛事1', type: 1 },
                { name: '赛事2', type: 2 },
                { name: '赛事3', type: 3 },
                { name: '赛事4', type: 4 },
                { name: '接待酒店', type: 5 },
                { name: '东湖宾馆', type: 6 },
                { name: '接待警卫点1', type: 7 },
                { name: '接待警卫点2', type: 8 },
                { name: '社会面巡控控制', type: 9 }
            ],
            classesAction: {},  // 已经选择的监听组
            chooseAction: '',    // 当前组
            linshijianting: '',  // 临时监听组,即未监听的组，在选择为当前组时，需要临时加入监听组，切换当前组时，需要取消监听
        }
    },
    methods: {
        init(){
            let chooseAction = 1
            this.chooseAction = chooseAction
            let actions = localStorage.getItem('chooseAction') ? JSON.parse(localStorage.getItem('chooseAction')) : {}
            actions[chooseAction] = true
            this.classesAction = actions
            this.$store.commit('setClassesAction', this.classesAction)
            this.$store.commit('setChooseAction', this.chooseAction)
            localStorage.setItem('chooseAction', JSON.stringify(this.classesAction))
        },
        // 监听
        listen(type){
            if(this.classesAction[type]){
                // 取消监听,若是当前组则不能取消
                if(this.chooseAction != type){
                    this.$delete(this.classesAction, type)
                }
            }else{
                // 监听
                this.$set(this.classesAction, type, true)
            }
            this.$store.commit('setClassesAction', this.classesAction)
            localStorage.setItem('chooseAction', JSON.stringify(this.classesAction))
        },
        // 切换当前组
        choose(type){
           if(this.chooseAction != type){
               if(this.linshijianting){
                    // 取消临时组监听
                    this.$delete(this.classesAction, this.linshijianting)
                    this.linshijianting = ''
                    this.$store.commit('setClassesAction', this.classesAction)
                    localStorage.setItem('chooseAction', JSON.stringify(this.classesAction))
               }
               if(!this.classesAction[type]){
                    // 若未处于监听状态则需要监听
                    this.$set(this.classesAction, type, true)
                    this.linshijianting = type
                    this.$store.commit('setClassesAction', this.classesAction)
                    localStorage.setItem('chooseAction', JSON.stringify(this.classesAction))
               }
               // 切换组
               this.chooseAction = type
               this.$store.commit('setChooseAction', this.chooseAction)
           }
        }
    },
    mounted() {
        this.init()
    }
}
</script>


<style lang="less" scoped>
.content {
    position: absolute;
    left: 20px;
    top: 20px;
    width: 240px;
    background-color: rgba(0, 0, 0, .7);
    .item {
        height: 50px;
        line-height: 50px;
        border-bottom: 1px solid rgba(255, 255, 255, .3);
        color: #fff;
        .listen {
            background: url('../assets/ico_leftlist_listening.png') no-repeat;
        }
        .title {
            padding-left: 20px;
        }
        .listen {
            float: right;
            padding-right: 10px;
            cursor: pointer;
            background: url('../assets/ico_leftlist_listen.png') no-repeat;
            width: 30px;
            height: 30px;
            margin-top: 10px;
        }
        .listening {
            background: url('../assets/ico_leftlist_listening.png') no-repeat;
        }
        .speak {
            float: right;
            padding-right: 10px;
            cursor: pointer;
            background: url('../assets/ico_leftlist_speeksilence.png') no-repeat;
            width: 40px;
            height: 40px;
            background-size: contain;
            margin-top: 5px;
        }
        .speakReady {
            background: url('../assets/ico_leftlist_ready.png') no-repeat;
        }
        .speaking {
            background: url('../assets/ico_leftlist_speeking.png') no-repeat;
        }
    }
    .item1 {
        color: #fd64ff;
    }
    .item2 {
        color: #4091ff;
    }
    .item3 {
        color: #41cc80;
    }
    .item4 {
        color: #ff9242;
    }
    .item5 {
        color: #00abcf;
    }
    .item6 {
        color: #af8aff;
    }
    .item7 {
        color: #ff6b7c;
    }
    .item8 {
        color: #61ce2a;
    }
    .item9 {
        color: #afaf00;
    }
}
</style>
