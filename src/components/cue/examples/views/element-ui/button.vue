<template>
    <div class="demo-chart">
        <h1>普通按钮</h1>
        <div>
            <el-button>默认</el-button>
            <el-button type="success">确认</el-button>
            <el-button type="primary">取消</el-button>
        </div>
        <h1>图标按钮</h1>
        <div>
            <el-button circle>
                <i class="fa fa-plus" aria-hidden="true"></i>
            </el-button>
            <el-button type="success" circle>
                <i class="fa fa-download" aria-hidden="true"></i>
            </el-button>
            <el-button type="primary" circle>
                <i class="fa fa-pencil" aria-hidden="true"></i>
            </el-button>
        </div>
        <h1>禁用按钮</h1>
        <div>
            <el-button disabled>普通</el-button>
            <el-button circle disabled>
                <i class="fa fa-plus" aria-hidden="true"></i>
            </el-button>
            <el-button type="success" disabled>确认</el-button>
            <el-button type="success"  circle disabled>
                <i class="fa fa-plus" aria-hidden="true"></i>
            </el-button>
            <el-button type="primary" disabled>取消</el-button>
            <el-button type="primary" circle disabled>
                <i class="fa fa-plus" aria-hidden="true"></i>
            </el-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "button",
        components: {},
        data(){
            return {};
        },
        methods: {}
    }
</script>
