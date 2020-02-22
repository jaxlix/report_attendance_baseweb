<template>
    <div class="msg">
        <div class="header">
            <div class="back">
                <img src="../assets/pc/1.png" alt />
            </div>
            <p class="title">赛事{{action}}组</p>
            <div class="cb">
                <img src="../assets/pc/1.png" alt />
            </div>
            <div class="ry">
                <img src="../assets/pc/1.png" alt />
            </div>
        </div>
        <div class="sbmsg">正在上报</div>
        <div id="list" class="list">
            <div class="item" v-for=" (item, i) in msgList" :key="i">
                <div class="logo">
                    <img src="../assets/pc/7.png" alt />
                </div>
                <div class="content">
                    <p class="name">{{item.name}} {{item.num}}</p>
                    <div class="audio">
                        <img src="../assets/pc/current_monitoring_hover.png" alt />
                        <span>{{item.time}}''</span>
                    </div>
                    <div class="zhuanyi">{{item.zy}}</div>
                </div>
            </div>
        </div>
        <div class="zuhu">
            <img src="../assets/ico_leftlist_speeksilence.png" alt />
            <p>赛事{{action}}组</p>
        </div>
        <div class="send">
            <div>
                <img src="../assets/ico_leftlist_speeksilence.png" alt />
                <img src="../assets/ico_leftlist_speeksilence.png" alt />
            </div>
            <!-- <el-input
                type="textarea"
                :rows="2"
                placeholder="请输入内容"
                v-model="textarea"
                class="textarea"
            >></el-input> -->
            <textarea class="textarea" v-model="textarea" placeholder="请输入内容"></textarea>
            <div class="enter">
                enter
                <button>发送</button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    data() {
        return {
            textarea: "",
            msgList: [],
            action: ""
        };
    },
    computed: {
        ...mapGetters({
            chooseAction: "chooseAction"
        })
    },
    watch: {
        chooseAction(val) {
            console.log(val);
            this.action = val;
            this.getMsgList(val)
        }
    },
    methods: {
        getMsgList(id) {
            let d = [
                { id: 1, name: "张三1", num: 789567, time: 12, zy: "gfgfdg" },
                { id: 1, name: "张三2", num: 789567, time: 12, zy: "gdfgdfgdfgfdgdf" },
                { id: 2, name: "张三3", num: 783567, time: 12, zy: "jghjghjgh" },
                { id: 2, name: "张三4", num: 789567, time: 12, zy: "123" },
                { id: 3, name: "张三5", num: 789777, time: 12, zy: "erereretret" },
                { id: 3, name: "张三6", num: 789567, time: 12, zy: "456" },
                { id: 4, name: "张三7", num: 789567, time: 12, zy: "876768" },
                { id: 4, name: "张三8", num: 789237, time: 12, zy: "786786" },
                { id: 5, name: "张三9", num: 789567, time: 12, zy: "43343" },
                { id: 5, name: "张三10", num: 789567, time: 12, zy: "0909" },
                { id: 6, name: "张三11", num: 789567, time: 12, zy: "5232" },
                { id: 6, name: "张三12", num: 789567, time: 12, zy: "64" },
                { id: 6, name: "张三13", num: 789567, time: 12, zy: "08765" }
            ]
            let arr = []
            d.forEach( d => {
                if(d.id == id){
                    arr.push(d)
                }
            })
            this.msgList = arr
        }
    },
    mounted() {
        this.getMsgList();
        // let _this = this;
        // setInterval(function(){
        //     _this.msgList.push({id: 1, name: '张三'+(_this.msgList.length+1), num: 789567, time: 12, zy: 'hffgh'+(_this.msgList.length+1)})
        //     let list = _this.$el.querySelector('#list')
        //     list.scrollTop = list.scrollHeight
        // },2000)
    }
};
</script>

<style lang="less" scoped>
.msg {
    position: absolute;
    top: 20px;
    right: 20px;
    width: 340px;
    background-color: rgba(0, 0, 0, 0.7);
    color: #fff;
    .header {
        display: flex;
        height: 60px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        line-height: 60px;
        .back {
            width: 56px;
            text-align: center;
            img {
                width: 30px;
                height: 30px;
                border: 1px solid rgba(255, 255, 255, 0.2);
            }
        }
        .title {
            flex: 1;
            height: 30px;
            line-height: 30px;
            margin-top: 15px;
            padding-left: 13px;
            border-left: 1px solid rgba(255, 255, 255, 0.2);
        }
        .cb {
            width: 40px;
            text-align: center;
            img {
                width: 30px;
                height: 30px;
            }
        }
        .ry {
            width: 40px;
            text-align: center;
            img {
                width: 30px;
                height: 30px;
            }
        }
    }
    .sbmsg {
        width: 280px;
        height: 34px;
        margin: 8px auto;
        border: 1px solid rgba(255, 255, 255, 0.2);
        color: #0acccc;
        text-align: center;
        line-height: 34px;
        border-radius: 17px;
        background-color: #000;
    }
    .list::-webkit-scrollbar {
        display: none;
    }
    .list {
        height: 550px;
        overflow-y: auto;
        border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        .item {
            display: flex;
            margin-top: 20px;
            .logo {
                width: 50px;
                img {
                    width: 40px;
                    height: 40px;
                    border-radius: 20px;
                    margin-left: 10px;
                }
            }
            .content {
                flex: 1;
                .name {
                    font-size: 14px;
                }
                .audio {
                    margin-top: 4px;
                }
                .zhuanyi {
                    margin-top: 4px;
                    margin-right: 50px;
                    padding: 10px;
                    background-color: #fff;
                    border-radius: 4px;
                    color: #333;
                    font-size: 14px;
                }
            }
        }
    }
    .zuhu {
        position: absolute;
        right: 20px;
        bottom: 160px;
        width: 80px;
        height: 80px;
        border-radius: 50%;
        background-color: rgba(36, 113, 167, 0.8);
        box-shadow: 0 0 0 10px rgba(66, 80, 91, 0.8);
        text-align: center;
        cursor: pointer;
        img {
            width: 40px;
            height: 40px;
            margin-top: 20px;
        }
        p {
            font-size: 10px;
        }
    }
    .send {
        padding: 10px 20px;
        .textarea {
            width: 100%;
            height: 60px;
            padding: 10px;
            box-sizing: border-box;
            background-color: rgba(0, 0, 0, 0);
            border: none;
            color: #fff;
            border-radius: 6px;
        }
        .enter {
            text-align: right;
            font-size: 12px;
            color: #ccc;
            button {
                width: 90px;
                height: 33px;
                margin-top: 10px;
                background-color: #2578a4;
                text-align: center;
                line-height: 33px;
                border: 0;
                border-radius: 4px;
                color: #fff;
                cursor: pointer;
            }
        }
    }
}
</style>