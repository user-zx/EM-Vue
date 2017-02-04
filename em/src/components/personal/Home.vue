<template>
	<div id="home">
		<heads></heads>
        <div class="wrapper">
            <left-tag></left-tag>
        </div>
	</div>
</template>
<script>
	import heads from '../head/heads.vue';
	import leftTag from '../head/leftTag.vue';
    export default {
        name:"home",
        components:{heads,leftTag}
	}
</script>
<style>
	
</style>