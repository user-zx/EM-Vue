<template>
	<div class="clearfix">
		<heads></heads>
        <div class="wrapper">
            <left-tag></left-tag>
            <div class="wrapper-content">

            </div>
            <foots></foots>
        </div>
	</div>
</template>
<script>
	import heads from '../head/heads.vue';
	import leftTag from '../head/leftTag.vue';
	import foots from  '../head/foots.vue';
    export default {
        components:{heads,leftTag,foots}
	}
</script>
<style>
    body{background-color: #f2f2f2;}
</style>
<style scoped>
    .wrapper{margin-left:135px;}
    .wrapper .wrapper-content{width: 100%;padding:25px 20px;}
</style>