<template>
  <i :class="'hd-icon iconfont icon-' + name"></i>
</template>

<script>
  export default {
    name: 'HdIcon',
    props: {
      name: String
    }
  };
</script>
