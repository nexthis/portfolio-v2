

<template>
  <div class="w-full h-full gradient -z-50 fixed top-0 left-0 pointer-events-none background-gradient ">
    <div class="w-full h-full relative overflow-hidden">

      <div
          @change="titleAnimate"
          class="sr-only animate-title sm:not-sr-only sm:absolute uppercase text font-extrabold !whitespace-pre-line text-transparent text-right background-text top-[10%] right-[5%]">
        {{text}}
      </div>

      <div class="animate-bigCircle bigCircle">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 243 243" fill="none">
          <g filter="url(#filter0_f)">
            <path
                d="M237.766 121.639C237.99 57.4746 186.156 5.27729 121.992 5.05328C57.8269 4.82928 5.6296 56.6634 5.40559 120.828C5.18159 184.993 57.0158 237.19 121.18 237.414C185.345 237.638 237.542 185.804 237.766 121.639Z"
                stroke="url(#paint0_linear)" stroke-miterlimit="10"/>
          </g>
          <defs>
            <filter id="filter0_f" x="0.49826" y="0.145996" width="242.176" height="242.176"
                    filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
              <feGaussianBlur stdDeviation="2" result="effect1_foregroundBlur"></feGaussianBlur>
            </filter>
            <linearGradient id="paint0_linear" x1="38.8825" y1="203.332" x2="204.247" y2="39.1182"
                            gradientUnits="userSpaceOnUse">
              <stop stop-color="#00FC8A"></stop>
              <stop offset="1" stop-color="#00E6F8"></stop>
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div class="animate-smallCircle smallCircle">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 161 171" fill="none">
          <circle cx="80" cy="85" r="79" stroke="url(#paint0_linear)" stroke-opacity="0.15"
                  stroke-miterlimit="10"/>
          <defs>
            <linearGradient id="paint0_linear" x1="25.1027" y1="144.862" x2="145.093" y2="25.7443"
                            gradient-units="userSpaceOnUse">
              <stop stop-color="#00FC8A"/>
              <stop offset="1" stop-color="#00E6F8"/>
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div class="animate-right3 right3">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 199 219" fill="none">
          <path d="M1.06226 221.92C3.49632 95.6762 104.551 2.53248 230.97 1.31567"
                stroke="url(#paint0_linear)" stroke-linecap="round" stroke-linejoin="round"/>
          <defs>
            <linearGradient id="paint0_linear" x1="119.206" y1="118.157" x2="69.7507" y2="68.6924"
                            gradientUnits="userSpaceOnUse">
              <stop stop-color="#00FC8A"/>
              <stop offset="1" stop-color="#00E6F8"/>
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div class="animate-right2 right2">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 176 196" fill="none">
          <path d="M0.881592 198.92C0.881592 82.5628 91.5915 1.13086 207.97 1.13086"
                stroke="url(#paint0_linear)" stroke-miterlimit="10"/>
          <defs>
            <linearGradient id="paint0_linear" x1="106.883" y1="106.982" x2="62.3028" y2="62.3939"
                            gradientUnits="userSpaceOnUse">
              <stop stop-color="#00FC8A"/>
              <stop offset="1" stop-color="#00E6F8"/>
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div class="animate-right1 right1">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 153 173" fill="none">
          <path d="M0.700928 175.92C0.700928 72.0351 81.2182 0.793945 184.97 0.793945"
                stroke="url(#paint0_linear)" stroke-miterlimit="10"/>
          <defs>
            <linearGradient id="paint0_linear" x1="95.2925" y1="95.3896" x2="55.4299" y2="55.5197"
                            gradientUnits="userSpaceOnUse">
              <stop stop-color="#00FC8A"/>
              <stop offset="1" stop-color="#00E6F8"/>
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div class="animate-left3 left3">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 222 187" fill="none">
          <path d="M220.944 227.1C218.46 97.9661 115.312 2.68998 -13.7251 1.44531"
                stroke="url(#paint0_linear)" stroke-linecap="round" stroke-linejoin="round"/>
          <defs>
            <linearGradient id="paint0_linear" x1="100.354" y1="120.961" x2="150.941" y2="70.4726"
                            gradientUnits="userSpaceOnUse">
              <stop stop-color="#00FC8A"/>
              <stop offset="1" stop-color="#00E6F8"/>
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div class="animate-left2 left2">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 199 163" fill="none">
          <path d="M197.652 203.101C197.652 84.0792 105.064 0.782959 -13.7252 0.782959"
                stroke="url(#paint0_linear)" stroke-opacity="0.6" stroke-miterlimit="10"/>
          <defs>
            <linearGradient id="paint0_linear" x1="89.4558" y1="109.057" x2="135.056" y2="63.546"
                            gradientUnits="userSpaceOnUse">
              <stop stop-color="#00FC8A"/>
              <stop offset="1" stop-color="#00E6F8"/>
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div class="animate-left1 left1">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 175 140" fill="none">
          <path d="M174.36 180.1C174.36 73.837 92.1755 0.964844 -13.7251 0.964844"
                stroke="url(#paint0_linear)" stroke-opacity="0.4" stroke-miterlimit="10"/>
          <defs>
            <linearGradient id="paint0_linear" x1="77.8098" y1="97.7261" x2="118.585" y2="57.0307"
                            gradientUnits="userSpaceOnUse">
              <stop stop-color="#00FC8A"/>
              <stop offset="1" stop-color="#00E6F8"/>
            </linearGradient>
          </defs>
        </svg>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import {gsap, Back} from 'gsap'
const text = useBackgroundText()

watch(text, () => {
  titleAnimate()
})

const titleAnimate = () => {
  gsap.fromTo('.animate-title', {opacity:0, y: 20}, {opacity: 1, y:0, duration: 0.6})
}

const animate = () => {
  gsap.timeline()
      .set('main', {opacity: 0})
      .fromTo('.animate-right3, .animate-right2, .animate-right1', {opacity:0.2, x: 40, y: 40}, {opacity: 1, x: 0, y: 0, ease: Back.easeOut.config(1.7), stagger: 0.2, duration: 0.6}, 'rings')
      .fromTo('.animate-left3, .animate-left2, .animate-left1', {opacity:0.2, x: -40, y: 40}, {opacity: 1, x: 0, y: 0, ease: Back.easeOut.config(1.7), stagger: 0.2, duration: 0.6}, 'rings')
      .fromTo('.animate-bigCircle', {opacity:0.1}, {opacity: 1, duration: 0.3}, 'circle')
      .fromTo('.animate-smallCircle', {opacity:0.1}, {opacity: 1, duration: 0.3}, 'circle')
      .fromTo('.animate-title', {opacity:0, y: 20}, {opacity: 1, y:0, duration: 0.6})
      .to('main', {opacity: 1})
}

onMounted(() => {
  animate()
})

</script>

<style scoped lang="scss">
.gradient {
  background: linear-gradient(77deg, #131a24, #2b323c) no-repeat fixed;
}

.text {
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: rgba(0, 247, 162, .13);
  font-size: 180px;
  line-height: 180px;
}

%base {
  position: fixed;
  z-index: 0;
  pointer-events: none;
}

.bigCircle {
  @extend %base;
  $width: 243px;
  $height: 243px;
  width: $width;
  height: $height;
  left: calc(95% - $width);
  top: calc(70% - $height);

  @media (min-width: theme('screens.lg')) {
    width: $width * 2.5;
    height: $height * 2.5;
    left: calc(95% - $width * 2.5);
    top: calc(70% - $height * 2.5);
  }
}

.smallCircle {
  @extend %base;
  $width: 161px;
  $height: 171px;
  width: $width;
  height: $height;
  left: calc(101% - $width);
  top: calc(85% - $height);

  @media (min-width: theme('screens.lg')) {
    width: $width * 3;
    height: $height * 3;
    left: calc(95% - $width * 3);
    top: unset;
    bottom: 0;
  }
}

.left1 {
  @extend %base;
  $width: 175px;
  $height: 140px;
  width: $width;
  height: $height;
  left: 0;
  top: calc(100% - $height);

  @media (min-width: theme('screens.lg')) {
    width: $width * 1.5;
    height: $height * 1.5;
    left: 0;
    top: calc(100% - $height * 1.5);
  }
}

.left2 {
  @extend %base;
  $width: 200px;
  $height: 163px;
  width: $width;
  height: $height;
  left: 0;
  top: calc(100% - $height);

  @media (min-width: theme('screens.lg')) {
    width: $width * 1.5;
    height: $height * 1.5;
    left: 0;
    top: calc(100% - $height * 1.5);
  }
}

.left3 {
  @extend %base;
  $width: 222px;
  $height: 187px;
  width: $width;
  height: $height;
  left: 0;
  top: calc(100% - $height);

  @media (min-width: theme('screens.lg')) {
    width: $width * 1.5;
    height: $height * 1.5;
    left: 0;
    top: calc(100% - $height * 1.5);
  }
}

.right1 {
  @extend %base;
  $width: 153px;
  $height: 173px;
  width: $width;
  height: $height;
  left: calc(100% - $width);
  top: calc(100% - $height);

  @media (min-width: theme('screens.lg')) {
    width: $width * 3;
    height: $height * 3;
    left: calc(100% - $width * 3);
    top: calc(100% - $height * 3);
    filter: blur(3px);
  }
}

.right2 {
  @extend %base;
  $width: 176px;
  $height: 196px;
  width: $width;
  height: $height;
  left: calc(100% - $width);
  top: calc(100% - $height);

  @media (min-width: theme('screens.lg')) {
    width: $width * 3;
    height: $height * 3;
    left: calc(100% - $width * 3);
    top: calc(100% - $height * 3);
    filter: blur(3px);
  }
}

.right3 {
  @extend %base;
  $width: 199px;
  $height: 219px;
  width: $width;
  height: $height;
  left: calc(100% - $width);
  top: calc(100% - $height);

  @media (min-width: theme('screens.lg')) {
    width: $width * 3;
    height: $height * 3;
    left: calc(100% - $width * 3);
    top: calc(100% - $height * 3);
    filter: blur(3px);
  }
}

</style>