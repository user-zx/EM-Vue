<template>
	<div class="clearfix">
		<heads></heads>
        <left-tag></left-tag>
        <!--<div class="wrapper">-->
            <!--<left-tag></left-tag>-->
            <!--<div class="wrapper-content">-->
            
            <!--</div>-->
            <!--<foots></foots>-->
        <!--</div>-->
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
</style>