<template>
	<div class="clearfix">
		<heads :topMessage="isShow"></heads>
        <left-tag></left-tag>
	</div>
</template>
<script>
	import heads from '../head/heads.vue';
	import leftTag from '../head/leftTag.vue';
    export default {
        components:{heads,leftTag},
        data(){
            return{
                isShow:true,
            }
        }
	}
</script>

<style>
     body{background-color: #f2f2f2;}
</style>