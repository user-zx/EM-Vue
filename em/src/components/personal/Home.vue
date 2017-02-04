<template>
	<div class="clearfix">
		<heads></heads>
        <div class="wrapper">
            <left-tag></left-tag>
            <div class="wrapper-content">

            </div>
        </div>
	</div>
</template>
<script>
	import heads from '../head/heads.vue';
	import leftTag from '../head/leftTag.vue';
    export default {
        components:{heads,leftTag}
	}
</script>
<style>
    body{background-color: #f2f2f2;}
    .wrapper{margin-left:135px;}
    .wrapper .wrapper-content{width: 100%;padding:25px 20px;}
</style>