<template>
    <div id="home" class="home">
        <top-bar></top-bar>
        <navigation></navigation>
        <bottom-bar></bottom-bar>
        <p id="errorAlert" class="alert alert-danger">
            <a href="javascript:void(0);" class="close" @click="colseAlert($event)">&times;</a>
            <span class="content"></span>
        </p>
        <p id="successAlert" class="alert alert-success">
            <a href="javascript:void(0);" class="close" @click="colseAlert($event)">&times;</a>
            <span class="content"></span>
        </p>
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
        components:{topBar,navigation,bottomBar},
        methods:{
            colseAlert(el){
                $(el.target).parents(".alert").hide();
            }
        }
    }
</script>