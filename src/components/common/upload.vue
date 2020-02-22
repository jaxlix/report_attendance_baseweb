<template>
    <el-upload
        class="upload"
        ref="upload"
        accept=".xlsx, .xls"
        :action="url"
        :name="name"
        :show-file-list="false"
        :auto-upload="true"
        :on-success="handleSuccess"
        :on-error="handleError"
    >{{title}}</el-upload>
</template>
<script>
export default {
    props:{
        url: {
            type: String,
            default: ''
        },
        title: {
            type: String,
            default: '上传'
        },
        name: {
            type: String,
            default: 'file'
        }
    },
    methods: {
        handleSuccess(response) {
            if (response.success) {
                this.$message({
                    message: "上传成功",
                    type: "success"
                });
                this.$refs.upload.clearFiles();
                this.$emit("reload");
            } else {
                this.$message({
                    message: "上传失败"+response.msg,
                    type: "warning"
                });
            }
        },
        handleError() {
            this.$message({
                message: "上传失败",
                type: "warning"
            })
        }
    }
};
</script>

<style lang="less" scoped>
    .upload{
        display: inline-block;
        margin-left: 10px;
        margin-right: 10px;
        padding: 12px 20px;
        height: 14px;
        color: #FFF;
        background-color: #409EFF;
        border-color: #409EFF;
        border-radius: 4px;
        font-size: 14px;
        line-height: 14px;
    }
</style>