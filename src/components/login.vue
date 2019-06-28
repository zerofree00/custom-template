<template lang="pug">
    .login fsdgfdgfd
</template>


<script>
import { mapActions } from 'vuex';
export default {
    data() {
        return {
            hi: ''
        };
    },
    methods: {
        submit() {
            // 
        },
        clear() {
            // 
        },
        ...mapActions(['login'])
    },
    created() {
        // 
    },
};
</script>
<style lang="less" >
.login {
    height: 100%;
    position: relative;

}
</style>