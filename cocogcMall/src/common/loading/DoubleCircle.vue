<template>
  <div class="bruce flex-ct-x">
    <div class="sticky-ball">
      <div class="ball-1"></div>
      <div class="ball-2"></div>
    </div>
  </div>
</template>
<script>
export default {

}
</script>
<style scoped lang="scss">
$red: #f66;
.bruce {
	filter: contrast(10);
}
.sticky-ball {
	position: relative;
	width: 320px;
	height: 80px;
	filter: contrast(10);
}
div[class*=ball-] {
	position: absolute;
	top: 0;
	padding: 10px;
	border-radius: 100%;
	width: 80px;
	height: 80px;
	background-color: $red;
	filter: blur(5px);
	animation: 6s infinite;
}
.ball-1 {
	left: 0;
	animation-name: move-1 !important;
}
.ball-2 {
	left: 240px;
	animation-name: move-2 !important;
}
@keyframes move-1 {
	0%,
	20%,
	100% {
		width: 40px;
		height: 40px;
	}
	50% {
		left: 110px;
		top: -15px;
		width: 55px;
		height: 55px;
	}
	85% {
		left: 75px;
		width: 45px;
		height: 35px;
	}
	90% {
		top: -2px;
		width: 32.5px;
		height: 42.5px;
	}
}
@keyframes move-2 {
	0%,
	20%,
	100% {
		width: 40px;
		height: 40px;
	}
	50% {
		left: 110px;
		top: -15px;
		width: 55px;
		height: 55px;
	}
	85% {
		left: 165px;
		width: 45px;
		height: 35px;
	}
	90% {
		top: -2px;
		width: 32.5px;
		height: 42.5px;
	}
}
</style>
