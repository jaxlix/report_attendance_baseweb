<template>
    <div class="plan">
        <div class="title" @click="action">
            <img src="../assets/pc/push_2.png" alt="">
            <p>预案</p>
            <img src="../assets/pc/triangle.png" alt="">
        </div>
        <div class="content" v-show="show">
            <div class="item" v-for=" (d, i) in dataList" :key="i" @click="setCheck(d)">
                <div class="check">
                    <img v-show="check == d.id" src="../assets/pc/warningClick.png" alt="">
                </div>
                <p class="name">{{ d.name }}</p>
                <img class="edit" src="../assets/pc/pushAlert2.png" alt="">
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            dataList: [
                {name: '军运会安保预案A', id: '1', list: [{x: 114.3709373474, y: 30.5660301263, r: 800 , all: 5, ready: 2}, {x: 114.4157409668, y: 30.5476262922, r: 800, all: 5, ready: 5 }]},
                {name: '军运会安保预案B', id: '2', list: [{x: 114.4383144379, y: 30.5120652310, r: 800 }]},
                {name: '军运会安保预案C', id: '3', list: [{x: 114.3667316437, y: 30.5380904035, r: 800 }]},
                {name: '军运会安保预案D', id: '4', list: [{x: 114.4204187393, y: 30.5281839152, r: 800 }]},
                {name: '军运会安保预案E', id: '5', list: [{x: 114.4429492950, y: 30.5258180372, r: 800 }]},
                {name: '军运会安保预案F', id: '6', list: [{x: 114.4157409668, y: 30.5476262922, r: 800 }]}
            ],
            show: false,
            check: ''
        }
    },
    methods: {
        action(){
            this.show = !this.show
        },
        setCheck(d){
            this.check = d.id
            this.$store.commit('setPlanAction', d)
        }
    },
    mounted() {

    },
}
</script>
<style lang="less" scoped>
.plan {
    position: absolute;
    left: 290px;
    top: 20px;
    color: #fff;
    .title {
        display: flex;
        align-items: center;
        width: 100px;
        height: 40px;
        background-color: rgba(0, 0, 0, 0.7);
    }
    .content {
        margin-top: 3px;
        padding-left: 8px;
        padding-right: 8px;
        background-color: rgba(0, 0, 0, 0.7);
        .item {
            display: flex;
            align-items: center;
            width: 200px;
            height: 48px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.3);
            .check{
                width: 30px;
            }
            .name{
                flex: 1;
            }
            .edit{
                width: 20px;
                height: 20px;
            }
        }
    }
}
</style>

