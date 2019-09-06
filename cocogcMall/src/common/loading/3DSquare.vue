<template>
  <div class="bruce flex-ct-x">
    <div class="td-cube">
      <ul>
        <li class="front">1</li>
        <li class="back">2</li>
        <li class="top">3</li>
        <li class="bottom">4</li>
        <li class="left">5</li>
        <li class="right">6</li>
      </ul>
    </div>
  </div>
</template>
<style lang="scss" scoped>
$width: 85px;
$height: 85px;
$length: 85px;
$red: #f66;
$purple: #66f;
$orange: #f90;
$blue: #09f;
$cyan: #9c3;
$green: #3c9;

.bruce{
  overflow: hidden;
}
.td-cube {
	width: $width;
	height: $height;
	perspective: 1000px;
  margin: 50px auto 60px;
	ul {
		position: relative;
		width: 100%;
		height: 100%;
		transform: rotateX(-15deg) rotateY(15deg);
		transform-style: preserve-3d;
		animation: rotate 5s infinite linear;
	}
	li {
		display: flex;
		position: absolute;
		justify-content: center;
		align-items: center;
		width: $width;
		height: $height;
		opacity: .8;
		font-size: 50px;
		color: #fff;
	}
}
.front {
	background-color: $red;
	transform: translateZ($length / 2);
}
.back {
	background-color: $purple;
	transform: rotateY(180deg) translateZ($length / 2);
}
.top {
	background-color: $orange;
	transform: rotateX(90deg) translateZ($height / 2);
}
.bottom {
	background-color: $blue;
	transform: rotateX(-90deg) translateZ($height / 2);
}
.left {
	background-color: $cyan;
	transform: rotateY(-90deg) translateZ($width / 2);
}
.right {
	background-color: $green;
	transform: rotateY(90deg) translateZ($width / 2);
}
@keyframes rotate {
	from {
		transform: rotateY(0) rotateX(0);
	}
	to {
		transform: rotateY(-1turn) rotateX(-1turn);
	}
}
</style>
