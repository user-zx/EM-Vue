<template>
    <div id="home" class="home">
        <top-bar></top-bar>
        <navigation></navigation>
        <bottom-bar></bottom-bar>
    </div>
</template>
<style scoped>

</style>
<script>
    import topBar from '../../compoents/layout/top/top.vue';
    import navigation from '../../compoents/navigation/navigation.vue';
    import bottomBar from '../../compoents/layout/bottom/bottom.vue';
    export default{
        data(){
            return{
                msg:"首页"
            }
        },
        components:{topBar,navigation,bottomBar}
    }
</script>