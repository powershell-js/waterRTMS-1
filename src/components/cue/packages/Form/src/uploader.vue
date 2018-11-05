<template>
    <div class="hd-upload-wrap">
        <el-popover ref="popover" :popper-class="popperClass" trigger="hover" placement="top" width="160" v-model="visible2">
            <el-upload ref="upload" class="hd-upload" action="/upload" :on-success="uploaded" :on-remove="fileremove" :file-list="fileList" :multiple="!!ip.multiple">
                <el-button ref="btn" class="upload_button" slot="trigger" size="small" type="primary" style="display:none">选取文件</el-button>
                <div slot="tip" class="el-upload__tip" v-if="ip.placeholder">{{ip.placeholder}}</div>
            </el-upload>
        </el-popover>
        <el-button v-popover:popover size="small" @click="onClick" :type="fileList.length?'success':'primary'">选取文件</el-button>
    </div>
</template>
<script>
export default {
    model: {
        prop: 'files',
        event: 'change'
    },
    props: {
        files: {
            type: String,
            default: ''
        },
        ip: {
            type: Object,
            default() {
                return {}
            }
        }
    },
    data() {
        return {
            fileList: [],
            visible2: false,
            urls:this.files,
        }
    },
    computed: {
        popperClass: function () {
            var cls=['hd-upload-popover'];
            if(this.fileList.length==0){
                cls.push('hd-upload-popover-none');
            }
            return cls.join(' ')
        }
    },
    methods: {
        uploaded(r, file, fileList) {
            if(!!this.ip.multiple){
                this.fileList.push({ name: file.name, url: r.Response })
            }else{
                this.$set(this,"fileList",[{ name: file.name, url: r.Response }]);
            }
        },
        fileremove(file, fileList) {
            var index = -1
            $.each(this.fileList, (i, f) => {
                if (f.url == file.url) index = i
            })
            if (index >= 0) {
                this.fileList.splice(index, 1)
            }
        },
        onClick() {
            $(this.$refs.btn.$el).click()
        }
    },
    watch:{
        files(n,o){
            if(!this.files) {
                this.$set(this,"fileList",[]);
                return
            }
            var fs = this.files.split(',')
             $.ajax({
                    type: "POST",
                    contentType: "application/json",
                    dataType: "json",
                    data: JSON.stringify({ids:fs}),
                    url: "/upload/infos",
                    success: json => {
                        if (json.Code == 0) {
                            var ls = [];
                            $.each(fs, (i, f) => {
                                var info=json.Response[f];
                                if(info){
                                    ls.push({ name: info.name, url: f })
                                }
                            })
                            this.$set(this,"fileList",ls);
                        } else {
                            //_alert(json.Message);
                        }
                    }
                });
        },
        urls(n,o){
            this.$emit("change",n);
        },
        fileList(){
            var urls=[];
            $.each(this.fileList, (i, f) => {
                urls.push(f.url);
            });
            this.urls=urls.join(",");
        }
    }
}
</script>
<style lang="less">
.hd-upload-wrap {
    width: 120px;
}
.hd-upload-popover {
    .hd-upload {
        .el-upload--text {
            display: none;
        }
    }
}
.hd-upload-popover-none{
    display: none !important;
}
</style>
