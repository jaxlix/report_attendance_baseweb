<template>
    <div class="login">
        <el-form ref="loginForm" :model="form" :rules="rules" label-width="80px" class="login-box">
            <h3 class="login-title">欢迎登录</h3>
            <el-form-item label="账号" prop="username">
                <el-input type="text" placeholder="请输入账号" v-model="form.username" />
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" placeholder="请输入密码" v-model="form.password" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" v-on:click="onSubmit('loginForm')">登录</el-button>
            </el-form-item>
        </el-form>

        <el-dialog title="温馨提示" :visible.sync="dialogVisible" width="30%">
            <span>请输入账号和密码</span>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: "Login",
    data() {
        return {
            form: {
                username: "",
                password: ""
            },
            rules: {
                username: [
                    { required: true, message: "账号不可为空", trigger: "blur" }
                ],
                password: [
                    { required: true, message: "密码不可为空", trigger: "blur" }
                ]
            },
            // 对话框显示和隐藏
            dialogVisible: false
        };
    },
    methods: {
        onSubmit() {
            this.$router.push("/status");
            // this.$refs[formName].validate(valid => {
            //     let params = new URLSearchParams();
            //     params.append("username", this.form.username);
            //     params.append("password", this.form.password);
            //     this.$post(this.$api.login, params).then(res => {
            //         if (res.status == 200) {
            //             if (valid) {
            //                 localStorage.setItem(
            //                     "LoginHeaders",
            //                     res.content.Authorization
            //                 );
            //                 this.$router.push("/status");
            //             } else {
            //                 this.dialogVisible = true;
            //                 return false;
            //             }
            //         }
            //     });
            // });
        }
    },
    created(){
        this.$router.push("/status")
    }
};
</script>

<style lang="less" scoped>
.login {
    width: 100%;
    height: 100%;
    background: #fff;
    position: fixed;
    top: 0;
    left: 0;
}
.login-box {
    border: 1px solid #dcdfe6;
    width: 350px;
    padding: 35px 35px 15px 35px;
    border-radius: 5px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    box-shadow: 0 0 25px #909399;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.login-title {
    text-align: center;
    margin: 0 auto 40px auto;
    color: #303133;
}
</style>