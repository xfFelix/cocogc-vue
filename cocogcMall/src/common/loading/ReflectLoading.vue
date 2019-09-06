<template>
  <div class="bruce flex-ct-x">
    <ul class="reflect-loading">
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
  </div>
</template>
<script>
export default {

}
</script>
<style lang="scss" scoped>
$count: 10;
$color: #66f #09f;

.bruce{
  overflow: hidden;
  .reflect-loading {
    margin: 50px 0 80px;
    display: flex;
    justify-content: center;
    height: 50px;
    -webkit-box-reflect: below 0 linear-gradient(rgba(#fff, 0), rgba(#fff, .7));
    li {
      width: 20px;
      @for $i from 0 to $count {
        $args: append($color, $i * 100% / ($count - 1));
        &:nth-child(#{$i + 1}) {
          background-color: mix($args...);
          animation: rotate 3s cubic-bezier(.81, .04, .4, .7) infinite;
          animation-delay: $i * 50ms;
        }
      }
    }
  }
}
@keyframes rotate {
	0% {
		transform: rotate(-.5turn) rotateX(-1turn);
	}
	75%,
	100% {
		transform: none;
	}
}
</style>
