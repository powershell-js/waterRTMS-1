<template>
    <iframe id="url_iframe" frameborder="0" allowfullscreen="true" :style="stl"></iframe>
</template>
<style>

</style>
<script>
export default {
    props: ["params"],
    data() {
        return {
            url: "",
            stl: ""
        };
    },
    methods: {
        setArgs(route) {
            var ps = route.params || {};
            var url = ps.url;
            //debugger
            if (!url) {
                url = route.fullPath.replace("/p", "").replace(/\\/g, "/");
            }
            this.stl = "width: 100%;height:calc(100% - 1px);";
            if (url.indexOf("http") > -1 && url[0] == "/") {
                url = url.replace("/", "");
                this.stl += "background: white;";
            }
            if (this.url != url) {
                if (this.url) {
                    $("#url_iframe").attr("src", url);
                } else {
                    setTimeout(function() {
                        $("#url_iframe").attr("src", url);
                    }, 100);
                }
                this.url = url;
            }
        }
    },
    watch: {
        $route: {
            immediate: true,
            handler: function(n, o) {
                this.setArgs(n);
            }
        },
        params: {
            immediate: true,
            handler: function(n, o) {
                if (n) this.setArgs();
            }
        }
    },
    mounted() {}
};
</script>