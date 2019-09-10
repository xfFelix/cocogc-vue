<template>
  <div class="load-indicator"><slot></slot><span></span></div>
</template>
<script>
export default {

}
</script>
<style lang="scss" scoped>
.load-indicator {
	font-size: 16px;
	color: #999;
	span {
		display: inline-block;
		overflow: hidden;
		height: 1em;
		line-height: 1;
		vertical-align: -.25em;
		&::after {
			display: block;
      text-align: left;
			white-space: pre-wrap;
			content: "...\A..\A.";
			animation: loading 3s infinite step-start both;
		}
	}
}
@keyframes loading {
	33% {
		transform: translate3d(0, -2em, 0);
	}
	66% {
		transform: translate3d(0, -1em, 0);
	}
}
</style>
