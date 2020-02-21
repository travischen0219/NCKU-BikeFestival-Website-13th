<template lang="pug">
  div(class="dept_page")
    p(class="dept_title")
    router-link(tag="button" to="/" class="dept_return_button")
    div(class="dept_decoration_top")
    div(class="dept_decoration_bottom")
      g
        ellipse(cx="90%" cy="540" rx="50%" ry="600" stroke="#1E3373" stroke-width="1px" fill="none")
    div(class="dept_layout")
      section(class="dept_list_section")
        div(class="dept_class")
          ul
            li(v-for="(iter, index) in classes" v-bind:key="`${index}-${iter}`" v-bind:data-key="classKeys[index]" class="dept_class_item" v-on:click="chooseClass(index)" v-bind:class="{active: currentIndex === index}" )
              p {{iter}}
      section(class="dept_chain_section")
        div(id="small_chain" class="dept_chain_small")
        div(id="large_chain" class="dept_chain_large")
        svg(width="60%" height="56%" viewBox="-10 -90 1000 500")
          g(id="chain_path")
            path(d="M854.4800244140624,253.27999999999997 a66.84,66.84 0 0 0 0,-132.24 L218.7800244140625,2.7799999999999727 A187.68,187.68 0 0 0 186.50002441406252,0 c-103,0 -186.5,83.5 -186.5,186.5 s83.5,186.5 186.5,186.5 a187.68,187.68 0 0 0 32.25,-2.7800000000000002 z" fill="none" stroke-linejoin="round"  stroke-linecap="round" stroke-width="8px" stroke="#1E5EAA" stroke-dasharray="1, 20" stroke-miterlimit="10")
        div(v-for="(iter, index) in classKeys" v-bind:key="`${index}-${iter}-college`" class="dept_college" v-bind:class="deptBinding(index)" v-bind:style="showDeptCollege ? {} : { opacity: 0 }")
          p(v-for="(name, index) in colleges[iter]" v-bind:key="`${index}-${name}-college`") {{name}}
</template>

<script>
export default {
  data: function () {
    return {
      classes: ['規劃與設計學院', '社會科學院', '不分學院', '工學院', '理學院', '文學院', '醫學院', '管理學院', '電機資訊學院', '生物科學與科技學院'],
      classKeys: ['design', 'social', 'undeclear', 'engineer-1', 'science', 'humanity', 'medicine', 'management', 'computer', 'biological'],
      colleges: {
        design: ['建築', '都計', '工設'],
        social: ['政治', '經濟', '法律', '心理'],
        undeclear: ['不分系學程'],
        'engineer-1': ['機械', '化工', '土木', '材料', '水利', '工科', '系統'],
        science: ['數學', '化學', '物理', '地科', '光電'],
        humanity: ['中文', '外文', '歷史', '臺文'],
        medicine: ['醫學', '藥學', '護理', '物治', '職治', '醫技'],
        management: ['會計', '統計', '企管', '交管', '工資管'],
        computer: ['資訊', '電機'],
        biological: ['生科', '生技']
      },
      currentIndex: -1,
      check: false
    }
  },
  computed: {
    showDeptCollege: function () {
      return this.check
    }
  },
  mounted: function () {
    const self = this
    setTimeout(function () {
      self.check = true
    }, 500)
  },
  methods: {
    chooseClass: function (index) {
      if (this.currentIndex === index) {
        return
      }
      const chainPath = this.$el.querySelector('#chain_path path')
      const smallChain = this.$el.querySelector('#small_chain')
      const largeChain = this.$el.querySelector('#large_chain')
      const animEndEvent = function () {
        chainPath.classList.remove('chain-path-anim')
        smallChain.classList.remove('chain-rotate-anim')
        largeChain.classList.remove('chain-rotate-anim')
        chainPath.removeEventListener('animationend', animEndEvent)
        smallChain.removeEventListener('animationend', animEndEvent)
        largeChain.removeEventListener('animationend', animEndEvent)
      }
      // remove animation class
      animEndEvent()
      this.currentIndex = index
      // animate the chain path
      chainPath.classList.add('chain-path-anim')
      // animate the chain
      smallChain.classList.add('chain-rotate-anim')
      largeChain.classList.add('chain-rotate-anim')
      // config animation end event to remove animation class
      chainPath.addEventListener('animationend', animEndEvent)
      smallChain.addEventListener('animationend', animEndEvent)
      largeChain.addEventListener('animationend', animEndEvent)
    },
    deptBinding: function (index) {
      const displayName = `rotate-${this.classKeys[index]}`
      const disappearName = `rotate-${this.classKeys[index]}-disappear`
      const result = {}
      result[displayName] = this.currentIndex === index
      result[disappearName] = this.currentIndex !== index
      return result
    }
  }
}
</script>

<style lang="scss" scoped>

@keyframes path {
  to { stroke-dashoffset: 100; }
}

@keyframes chain {
  0% { transform: rotateZ(0deg); }
  100% { transform: rotateZ(60deg); }
}

.chain-path-anim {
  stroke-dashoffset: 0;
  animation: path .5s ease forwards;
}

.chain-rotate-anim {
  animation: chain .5s ease forwards;
}

.hidden-dept-college {
  opacity: 0 !important;
}

/* 2 components rotate */
@keyframes rotate-45 {
  0% { opacity: 0; transform: rotate(-90deg) translateX(16vw) rotate(90deg); }
  100% { opacity: 1; transform: rotate(-45deg) translateX(16vw) rotate(45deg); }
}
@keyframes rotate-135 {
  0% { opacity: 0; transform: rotate(-90deg) translateX(16vw) rotate(90deg); }
  100% { opacity: 1; transform: rotate(45deg) translateX(16vw) rotate(-45deg); }
}
@keyframes rotate-45-disappear {
  0% { opacity: 1; transform: rotate(-45deg) translateX(16vw) rotate(45deg); }
  100% { opacity: 0; transform: rotate(90deg) translateX(16vw) rotate(-90deg); }
}
@keyframes rotate-135-disappear {
  0% { opacity: 1; transform: rotate(45deg) translateX(16vw) rotate(-45deg); }
  100% { opacity: 0; transform: rotate(90deg) translateX(16vw) rotate(-90deg); }
}

/* 3 components rotate*/
@keyframes rotate-30 {
  0% { opacity: 0; transform: rotate(-90deg) translateX(16vw) rotate(90deg); }
  100% { opacity: 1; transform: rotate(-60deg) translateX(16vw) rotate(60deg); }
}
@keyframes rotate-90 {
  0% { opacity: 0; transform: rotate(-90deg) translateX(16vw) rotate(90deg); }
  100% { opacity: 1; transform: rotate(0deg) translateX(16vw) rotate(0deg); }
}
@keyframes rotate-150 {
  0% { opacity: 0; transform: rotate(-90deg) translateX(16vw) rotate(90deg); }
  100% { opacity: 1; transform: rotate(60deg) translateX(16vw) rotate(-60deg); }
}

@keyframes rotate-30-disappear {
  0% { opacity: 1; transform: rotate(-60deg) translateX(16vw) rotate(60deg); }
  100% { opacity: 0; transform: rotate(90deg) translateX(16vw) rotate(-90deg); }
}
@keyframes rotate-90-disappear {
  0% { opacity: 1; transform: rotate(0deg) translateX(16vw) rotate(0deg); }
  100% { opacity: 0; transform: rotate(90deg) translateX(16vw) rotate(-90deg); }
}
@keyframes rotate-150-disappear {
  0% { opacity: 1; transform: rotate(60deg) translateX(16vw) rotate(-60deg); }
  100% { opacity: 0; transform: rotate(90deg) translateX(16vw) rotate(-90deg); }
}

/* 4 components roate*/
@keyframes rotate-23 {
  0% { opacity: 0; transform: rotate(-90deg) translateX(16vw) rotate(90deg); }
  100% { opacity: 1; transform: rotate(-67deg) translateX(16vw) rotate(67deg); }
}
@keyframes rotate-68 {
  0% { opacity: 0; transform: rotate(-90deg) translateX(16vw) rotate(90deg); }
  100% { opacity: 1; transform: rotate(-23deg) translateX(16vw) rotate(23deg); }
}
@keyframes rotate-113 {
  0% { opacity: 0; transform: rotate(-90deg) translateX(16vw) rotate(90deg); }
  100% { opacity: 1; transform: rotate(23deg) translateX(16vw) rotate(-23deg); }
}
@keyframes rotate-158 {
  0% { opacity: 0; transform: rotate(-90deg) translateX(16vw) rotate(90deg); }
  100% { opacity: 1; transform: rotate(68deg) translateX(16vw) rotate(-68deg); }
}

@keyframes rotate-23-disappear {
  0% { opacity: 1; transform: rotate(-67deg) translateX(16vw) rotate(67deg); }
  100% { opacity: 0; transform: rotate(90deg) translateX(16vw) rotate(-90deg); }
}
@keyframes rotate-68-disappear {
  0% { opacity: 1; transform: rotate(-23deg) translateX(16vw) rotate(23deg); }
  100% { opacity: 0; transform: rotate(90deg) translateX(16vw) rotate(-90deg); }
}
@keyframes rotate-113-disappear {
  0% { opacity: 1; transform: rotate(23deg) translateX(16vw) rotate(-23deg); }
  100% { opacity: 0; transform: rotate(90deg) translateX(16vw) rotate(-90deg); }
}
@keyframes rotate-158-disappear {
  0% { opacity: 1; transform: rotate(68deg) translateX(16vw) rotate(-68deg); }
  100% { opacity: 0; transform: rotate(90deg) translateX(16vw) rotate(-90deg); }
}

/* 5 components rotate */
@keyframes rotate-18 {
  0% { opacity: 0; transform: rotate(-90deg) translateX(16vw) rotate(90deg); }
  100% { opacity: 1; transform: rotate(-72deg) translateX(16vw) rotate(72deg); }
}
@keyframes rotate-54 {
  0% { opacity: 0; transform: rotate(-90deg) translateX(16vw) rotate(90deg); }
  100% { opacity: 1; transform: rotate(-36deg) translateX(16vw) rotate(36deg); }
}
/*
@keyframes rotate-90 {
  0% { transform: rotate(-90deg) translateX(16vw) rotate(90deg); }
  100% { transform: rotate(0deg) translateX(16vw) rotate(0deg); }
}
*/
@keyframes rotate-126 {
  0% { opacity: 0; transform: rotate(-90deg) translateX(16vw) rotate(90deg); }
  100% { opacity: 1; transform: rotate(36deg) translateX(16vw) rotate(-36deg); }
}
@keyframes rotate-162 {
  0% { opacity: 0; transform: rotate(-90deg) translateX(16vw) rotate(90deg); }
  100% { opacity: 1; transform: rotate(72deg) translateX(16vw) rotate(-72deg); }
}

@keyframes rotate-18-disappear {
  0% { opacity: 1; transform: rotate(-72deg) translateX(16vw) rotate(72deg); }
  100% { opacity: 0; transform: rotate(90deg) translateX(16vw) rotate(-90deg); }
}
@keyframes rotate-54-disappear {
  0% { opacity: 1; transform: rotate(-36deg) translateX(16vw) rotate(36deg); }
  100% { opacity: 0; transform: rotate(90deg) translateX(16vw) rotate(-90deg); }
}

@keyframes rotate-126-disappear {
  0% { opacity: 1; transform: rotate(36deg) translateX(16vw) rotate(-36deg); }
  100% { opacity: 0; transform: rotate(90deg) translateX(16vw) rotate(-90deg); }
}
@keyframes rotate-162-disappear {
  0% { opacity: 1; transform: rotate(72deg) translateX(16vw) rotate(-72deg); }
  100% { opacity: 0; transform: rotate(90deg) translateX(16vw) rotate(-90deg); }
}

/* 6 components rotate */

@keyframes rotate-15 {
  0% { opacity: 0; transform: rotate(-90deg) translateX(16vw) rotate(90deg); }
  100% { opacity: 1; transform: rotate(-75deg) translateX(16vw) rotate(75deg); }
}
/*
@keyframes rotate-45 {
  0% { transform: rotate(-90deg) translateX(16vw) rotate(90deg); }
  100% { transform: rotate(-45deg) translateX(16vw) rotate(45deg); }
}
*/
@keyframes rotate-75 {
  0% { opacity: 0; transform: rotate(-90deg) translateX(16vw) rotate(90deg); }
  100% { opacity: 1; transform: rotate(-15deg) translateX(16vw) rotate(15deg); }
}
@keyframes rotate-105 {
  0% { opacity: 0; transform: rotate(-90deg) translateX(16vw) rotate(90deg); }
  100% { opacity: 1; transform: rotate(15deg) translateX(16vw) rotate(-15deg); }
}
/*
@keyframes rotate-135 {
  0% { transform: rotate(-90deg) translateX(16vw) rotate(90deg); }
  100% { transform: rotate(45deg) translateX(16vw) rotate(-45deg); }
}
*/
@keyframes rotate-165 {
  0% { opacity: 0; transform: rotate(-90deg) translateX(16vw) rotate(90deg); }
  100% { opacity: 1; transform: rotate(75deg) translateX(16vw) rotate(-75deg); }
}

@keyframes rotate-15-disappear {
  0% { opacity: 1; transform: rotate(-75deg) translateX(16vw) rotate(75deg); }
  100% { opacity: 0; transform: rotate(90deg) translateX(16vw) rotate(-90deg); }
}

@keyframes rotate-75-disappear {
  0% { opacity: 1; transform: rotate(-15deg) translateX(16vw) rotate(15deg); }
  100% { opacity: 0; transform: rotate(90deg) translateX(16vw) rotate(-90deg); }
}
@keyframes rotate-105-disappear {
  0% { opacity: 1; transform: rotate(15deg) translateX(16vw) rotate(-15deg); }
  100% { opacity: 0; transform: rotate(90deg) translateX(16vw) rotate(-90deg); }
}

@keyframes rotate-165-disappear {
  0% { opacity: 1; transform: rotate(75deg) translateX(16vw) rotate(-75deg); }
  100% { opacity: 0; transform: rotate(90deg) translateX(16vw) rotate(-90deg); }
}

/* 7 components rotate */

@keyframes rotate-12 {
  0% { opacity: 0; transform: rotate(-90deg) translateX(16vw) rotate(90deg); }
  100% { opacity: 1; transform: rotate(-78deg) translateX(16vw) rotate(78deg); }
}
@keyframes rotate-37 {
  0% { opacity: 0; transform: rotate(-90deg) translateX(16vw) rotate(90deg); }
  100% { opacity: 1; transform: rotate(-53deg) translateX(16vw) rotate(53deg); }
}
@keyframes rotate-63 {
  0% { opacity: 0; transform: rotate(-90deg) translateX(16vw) rotate(90deg); }
  100% { opacity: 1; transform: rotate(-27deg) translateX(16vw) rotate(27deg); }
}
/*
@keyframes rotate-90 {
  0% { transform: rotate(-90deg) translateX(16vw) rotate(90deg); }
  100% { transform: rotate(0deg) translateX(16vw) rotate(-0deg); }
}
*/
@keyframes rotate-117 {
  0% { opacity: 0; transform: rotate(-90deg) translateX(16vw) rotate(90deg); }
  100% { opacity: 1; transform: rotate(27deg) translateX(16vw) rotate(-27deg); }
}
@keyframes rotate-143 {
  0% { opacity: 0; transform: rotate(-90deg) translateX(16vw) rotate(90deg); }
  100% { opacity: 1; transform: rotate(53deg) translateX(16vw) rotate(-53deg); }
}
@keyframes rotate-168 {
  0% { opacity: 0; transform: rotate(-90deg) translateX(16vw) rotate(90deg); }
  100% { opacity: 1; transform: rotate(78deg) translateX(16vw) rotate(-78deg); }
}

@keyframes rotate-12-disappear {
  0% { opacity: 1; transform: rotate(-78deg) translateX(16vw) rotate(78deg); }
  100% { opacity: 0; transform: rotate(90deg) translateX(16vw) rotate(-90deg); }
}
@keyframes rotate-37-disappear {
  0% { opacity: 1; transform: rotate(-53deg) translateX(16vw) rotate(53deg); }
  100% { opacity: 0; transform: rotate(90deg) translateX(16vw) rotate(-90deg); }
}
@keyframes rotate-63-disappear {
  0% { opacity: 1; transform: rotate(-27deg) translateX(16vw) rotate(27deg); }
  100% { opacity: 0; transform: rotate(90deg) translateX(16vw) rotate(-90deg); }
}
@keyframes rotate-117-disappear {
  0% { opacity: 1; transform: rotate(27deg) translateX(16vw) rotate(-27deg); }
  100% { opacity: 0; transform: rotate(90deg) translateX(16vw) rotate(-90deg); }
}
@keyframes rotate-143-disappear {
  0% { opacity: 1; transform: rotate(53deg) translateX(16vw) rotate(-53deg); }
  100% { opacity: 0; transform: rotate(90deg) translateX(16vw) rotate(-90deg); }
}
@keyframes rotate-168-disappear {
  0% { opacity: 1; transform: rotate(78deg) translateX(16vw) rotate(-78deg); }
  100% { opacity: 0; transform: rotate(90deg) translateX(16vw) rotate(-90deg); }
}

  /*
    phone layout css
  */
  @media only screen and (max-width: 551px) {
    @font-face {
    font-family: 'GenYoGothicTW-Bold';
    src: url('../assets/fonts/GenYoGothicTW-Bold.woff') format("woff"),
          url('../assets/fonts/GenYoGothicTW-Bold.ttf') format("truetype"),
          url('../assets/fonts/GenYoGothicTW-Bold.eot') format("embedded-opentype");
    }
    @import url('https://fonts.googleapis.com/css?family=Noto+Sans+TC');
    *{
      font-family: 'Noto Sans TC'!important;
    }
    .dept_page {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      justify-items: flex-start;
      position: relative;
      height: 100vh;
      width: 100vw;
      background: #F8F6E8;
      margin: 0;
      padding: 0;
    }
    .dept_title {
      position: absolute;
      z-index: 20;
      left: 5vw;
      top: 5vh;
      display: inline-block;
      text-align: center;
      padding: 15px 40px 15px 40px;
      font-size: 5vw;
      font-weight: 500;
      letter-spacing: 1px;
      line-height: 24px;
      transform: rotateZ(-5deg);
    }

    .dept_decoration_top {
      display: none;
    }

    .dept_decoration_bottom {
      display: none;
    }

    .dept_return_button {
      position: absolute;
      right: 7vw;
      top: 7vw;

      width: 15vw;
      height: 15vw;
      background-color: transparent;
      background-image: url("../assets/exit.svg");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      background-position: 50% 50%;

      outline: none;
      border: none;
      filter: brightness(120%);

      cursor: pointer;

      transition: filter .3s ease;

      &:hover {
        filter: brightness(130%);
      }
      &:active {
        filter: brightness(80%);
      }
    }

    .external_circle {
      display: none;
    }

    .dept_layout {
      width: 100vw;
      height: 100vh;
    }

    .dept_chain_section {

      width: 100%;
      height: 100%;

      .dept_chain_small {
        display: none;
      }

      .dept_chain_large {
        z-index:1;
        position: absolute;
        left: -100vw;
        top: -10vh;

        width: 120vh;
        height: 120vh;

        background-image: url("../assets/dept/large_chain.svg");
        opacity:0.8;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        background-position: 50% 50%;

        pointer-events: none;
      }
      svg {
        position: absolute;
        display: none;
        top: 0;
        bottom: 0;
        margin: auto 0;
        left: -145vw;

        transform: scale(6);
        pointer-events: none;
      }
    }

    .dept_college {
      position: absolute;
      z-index:5;
      left: 0vw;
      top: 47vh;
      box-sizing: border-box;

      will-change: opacity, transform;
      transform: scale(2);
      p {
        position: absolute;
        left: 0;
        top: 0;
        max-width: 13vw;
        width: 7.5vw;
        height: auto;
        text-align: center;
        vertical-align: bottom;
        background-color: #eeefef;
        color: black;
        padding: 5px;
        font-size: 2.5vw;
        font-weight: 500;
        line-height: 2.5vw;
        cursor: pointer;
      }
      p:hover {
        z-index: 999;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
      }
      &.rotate-design > p:nth-child(1) {
        animation: rotate-30 .5s ease-in-out;
        animation-fill-mode: forwards;
      }
      &.rotate-design > p:nth-child(2) {
        animation: rotate-90 .5s ease-in-out;
        animation-fill-mode: forwards;
      }
      &.rotate-design > p:nth-child(3) {
        animation: rotate-150 .5s ease-in-out;
        animation-fill-mode: forwards;
      }

      &.rotate-design-disappear > p:nth-child(1) {
        animation: rotate-30-disappear .5s ease-in-out;
        animation-fill-mode: forwards;
      }
      &.rotate-design-disappear > p:nth-child(2) {
        animation: rotate-90-disappear .5s ease-in-out;
        animation-fill-mode: forwards;
      }
      &.rotate-design-disappear > p:nth-child(3) {
        animation: rotate-150-disappear .5s ease-in-out;
        animation-fill-mode: forwards;
      }

      &.rotate-social > p:nth-child(1) {
        animation: rotate-23 .5s ease-in-out;
        animation-fill-mode: forwards;
      }
      &.rotate-social > p:nth-child(2) {
        animation: rotate-68 .5s ease-in-out;
        animation-fill-mode: forwards;
      }
      &.rotate-social > p:nth-child(3) {
        animation: rotate-113 .5s ease-in-out;
        animation-fill-mode: forwards;
      }
      &.rotate-social > p:nth-child(4) {
        animation: rotate-158 .5s ease-in-out;
        animation-fill-mode: forwards;
      }

      &.rotate-social-disappear > p:nth-child(1) {
        animation: rotate-23-disappear .5s ease-in-out;
        animation-fill-mode: forwards;
      }
      &.rotate-social-disappear > p:nth-child(2) {
        animation: rotate-68-disappear .5s ease-in-out;
        animation-fill-mode: forwards;
      }
      &.rotate-social-disappear > p:nth-child(3) {
        animation: rotate-113-disappear .5s ease-in-out;
        animation-fill-mode: forwards;
      }
      &.rotate-social-disappear > p:nth-child(4) {
        animation: rotate-158-disappear .5s ease-in-out;
        animation-fill-mode: forwards;
      }

      &.rotate-undeclear > p {
        animation: rotate-90 .5s ease-in-out;
        animation-fill-mode: forwards;
      }

      &.rotate-undeclear-disappear > p {
        animation: rotate-90-disappear .5s ease-in-out;
        animation-fill-mode: forwards;
      }

      &.rotate-engineer-1 > p:nth-child(1) {
        animation: rotate-12 .5s ease-in-out;
        animation-fill-mode: forwards;
      }
      &.rotate-engineer-1 > p:nth-child(2) {
        animation: rotate-37 .5s ease-in-out;
        animation-fill-mode: forwards;
      }
      &.rotate-engineer-1 > p:nth-child(3) {
        animation: rotate-63 .5s ease-in-out;
        animation-fill-mode: forwards;
      }
      &.rotate-engineer-1 > p:nth-child(4) {
        animation: rotate-90 .5s ease-in-out;
        animation-fill-mode: forwards;
      }
      &.rotate-engineer-1 > p:nth-child(5) {
        animation: rotate-117 .5s ease-in-out;
        animation-fill-mode: forwards;
      }
      &.rotate-engineer-1 > p:nth-child(6) {
        animation: rotate-143 .5s ease-in-out;
        animation-fill-mode: forwards;
      }
      &.rotate-engineer-1 > p:nth-child(7) {
        animation: rotate-168 .5s ease-in-out;
        animation-fill-mode: forwards;
      }
      &.rotate-engineer-2 > p:nth-child(1) {
        animation: rotate-15 .5s ease-in-out;
        animation-fill-mode: forwards;
      }
      &.rotate-engineer-2 > p:nth-child(2) {
        animation: rotate-45 .5s ease-in-out;
        animation-fill-mode: forwards;
      }
      &.rotate-engineer-2 > p:nth-child(3) {
        animation: rotate-75 .5s ease-in-out;
        animation-fill-mode: forwards;
      }
      &.rotate-engineer-2 > p:nth-child(4) {
        animation: rotate-105 .5s ease-in-out;
        animation-fill-mode: forwards;
      }
      &.rotate-engineer-2 > p:nth-child(5) {
        animation: rotate-135 .5s ease-in-out;
        animation-fill-mode: forwards;
      }
      &.rotate-engineer-2 > p:nth-child(6) {
        animation: rotate-165 .5s ease-in-out;
        animation-fill-mode: forwards;
      }

      &.rotate-engineer-1-disappear > p:nth-child(1) {
        animation: rotate-12-disappear .5s ease-in-out;
        animation-fill-mode: forwards;
      }
      &.rotate-engineer-1-disappear > p:nth-child(2) {
        animation: rotate-37-disappear .5s ease-in-out;
        animation-fill-mode: forwards;
      }
      &.rotate-engineer-1-disappear > p:nth-child(3) {
        animation: rotate-63-disappear .5s ease-in-out;
        animation-fill-mode: forwards;
      }
      &.rotate-engineer-1-disappear > p:nth-child(4) {
        animation: rotate-90-disappear .5s ease-in-out;
        animation-fill-mode: forwards;
      }
      &.rotate-engineer-1-disappear > p:nth-child(5) {
        animation: rotate-117-disappear .5s ease-in-out;
        animation-fill-mode: forwards;
      }
      &.rotate-engineer-1-disappear > p:nth-child(6) {
        animation: rotate-143-disappear .5s ease-in-out;
        animation-fill-mode: forwards;
      }
      &.rotate-engineer-1-disappear > p:nth-child(7) {
        animation: rotate-168-disappear .5s ease-in-out;
        animation-fill-mode: forwards;
      }
      &.rotate-engineer-2-disappear > p:nth-child(1) {
        animation: rotate-15-disappear .5s ease-in-out;
        animation-fill-mode: forwards;
      }
      &.rotate-engineer-2-disappear > p:nth-child(2) {
        animation: rotate-45-disappear .5s ease-in-out;
        animation-fill-mode: forwards;
      }
      &.rotate-engineer-2-disappear > p:nth-child(3) {
        animation: rotate-75-disappear .5s ease-in-out;
        animation-fill-mode: forwards;
      }
      &.rotate-engineer-2-disappear > p:nth-child(4) {
        animation: rotate-105-disappear .5s ease-in-out;
        animation-fill-mode: forwards;
      }
      &.rotate-engineer-2-disappear > p:nth-child(5) {
        animation: rotate-135-disappear .5s ease-in-out;
        animation-fill-mode: forwards;
      }
      &.rotate-engineer-2-disappear > p:nth-child(6) {
        animation: rotate-165-disappear .5s ease-in-out;
        animation-fill-mode: forwards;
      }

      &.rotate-science > p:nth-child(1) {
        animation: rotate-18 .5s ease-in-out;
        animation-fill-mode: forwards;
      }
      &.rotate-science > p:nth-child(2) {
        animation: rotate-54 .5s ease-in-out;
        animation-fill-mode: forwards;
      }
      &.rotate-science > p:nth-child(3) {
        animation: rotate-90 .5s ease-in-out;
        animation-fill-mode: forwards;
      }
      &.rotate-science > p:nth-child(4) {
        animation: rotate-126 .5s ease-in-out;
        animation-fill-mode: forwards;
      }
      &.rotate-science > p:nth-child(5) {
        animation: rotate-162 .5s ease-in-out;
        animation-fill-mode: forwards;
      }

      &.rotate-science-disappear > p:nth-child(1) {
        animation: rotate-18-disappear .5s ease-in-out;
        animation-fill-mode: forwards;
      }
      &.rotate-science-disappear > p:nth-child(2) {
        animation: rotate-54-disappear .5s ease-in-out;
        animation-fill-mode: forwards;
      }
      &.rotate-science-disappear > p:nth-child(3) {
        animation: rotate-90-disappear .5s ease-in-out;
        animation-fill-mode: forwards;
      }
      &.rotate-science-disappear > p:nth-child(4) {
        animation: rotate-126-disappear .5s ease-in-out;
        animation-fill-mode: forwards;
      }
      &.rotate-science-disappear > p:nth-child(5) {
        animation: rotate-162-disappear .5s ease-in-out;
        animation-fill-mode: forwards;
      }

      &.rotate-humanity > p:nth-child(1) {
        animation: rotate-23 .5s ease-in-out;
        animation-fill-mode: forwards;
      }
      &.rotate-humanity > p:nth-child(2) {
        animation: rotate-68 .5s ease-in-out;
        animation-fill-mode: forwards;
      }
      &.rotate-humanity > p:nth-child(3) {
        animation: rotate-113 .5s ease-in-out;
        animation-fill-mode: forwards;
      }
      &.rotate-humanity > p:nth-child(4) {
        animation: rotate-158 .5s ease-in-out;
        animation-fill-mode: forwards;
      }

      &.rotate-humanity-disappear > p:nth-child(1) {
        animation: rotate-23-disappear .5s ease-in-out;
        animation-fill-mode: forwards;
      }
      &.rotate-humanity-disappear > p:nth-child(2) {
        animation: rotate-68-disappear .5s ease-in-out;
        animation-fill-mode: forwards;
      }
      &.rotate-humanity-disappear > p:nth-child(3) {
        animation: rotate-113-disappear .5s ease-in-out;
        animation-fill-mode: forwards;
      }
      &.rotate-humanity-disappear > p:nth-child(4) {
        animation: rotate-158-disappear .5s ease-in-out;
        animation-fill-mode: forwards;
      }

      &.rotate-medicine > p:nth-child(1) {
        animation: rotate-15 .5s ease-in-out;
        animation-fill-mode: forwards;
      }
      &.rotate-medicine > p:nth-child(2) {
        animation: rotate-45 .5s ease-in-out;
        animation-fill-mode: forwards;
      }
      &.rotate-medicine > p:nth-child(3) {
        animation: rotate-75 .5s ease-in-out;
        animation-fill-mode: forwards;
      }
      &.rotate-medicine > p:nth-child(4) {
        animation: rotate-105 .5s ease-in-out;
        animation-fill-mode: forwards;
      }
      &.rotate-medicine > p:nth-child(5) {
        animation: rotate-135 .5s ease-in-out;
        animation-fill-mode: forwards;
      }
      &.rotate-medicine > p:nth-child(6) {
        animation: rotate-165 .5s ease-in-out;
        animation-fill-mode: forwards;
      }

      &.rotate-medicine-disappear > p:nth-child(1) {
        animation: rotate-15-disappear .5s ease-in-out;
        animation-fill-mode: forwards;
      }
      &.rotate-medicine-disappear > p:nth-child(2) {
        animation: rotate-45-disappear .5s ease-in-out;
        animation-fill-mode: forwards;
      }
      &.rotate-medicine-disappear > p:nth-child(3) {
        animation: rotate-75-disappear .5s ease-in-out;
        animation-fill-mode: forwards;
      }
      &.rotate-medicine-disappear > p:nth-child(4) {
        animation: rotate-105-disappear .5s ease-in-out;
        animation-fill-mode: forwards;
      }
      &.rotate-medicine-disappear > p:nth-child(5) {
        animation: rotate-135-disappear .5s ease-in-out;
        animation-fill-mode: forwards;
      }
      &.rotate-medicine-disappear > p:nth-child(6) {
        animation: rotate-165-disappear .5s ease-in-out;
        animation-fill-mode: forwards;
      }

      &.rotate-management > p:nth-child(1) {
        animation: rotate-18 .5s ease-in-out;
        animation-fill-mode: forwards;
      }
      &.rotate-management > p:nth-child(2) {
        animation: rotate-54 .5s ease-in-out;
        animation-fill-mode: forwards;
      }
      &.rotate-management > p:nth-child(3) {
        animation: rotate-90 .5s ease-in-out;
        animation-fill-mode: forwards;
      }
      &.rotate-management > p:nth-child(4) {
        animation: rotate-126 .5s ease-in-out;
        animation-fill-mode: forwards;
      }
      &.rotate-management > p:nth-child(5) {
        animation: rotate-162 .5s ease-in-out;
        animation-fill-mode: forwards;
      }

      &.rotate-management-disappear > p:nth-child(1) {
        animation: rotate-18-disappear .5s ease-in-out;
        animation-fill-mode: forwards;
      }
      &.rotate-management-disappear > p:nth-child(2) {
        animation: rotate-54-disappear .5s ease-in-out;
        animation-fill-mode: forwards;
      }
      &.rotate-management-disappear > p:nth-child(3) {
        animation: rotate-90-disappear .5s ease-in-out;
        animation-fill-mode: forwards;
      }
      &.rotate-management-disappear > p:nth-child(4) {
        animation: rotate-126-disappear .5s ease-in-out;
        animation-fill-mode: forwards;
      }
      &.rotate-management-disappear > p:nth-child(5) {
        animation: rotate-162-disappear .5s ease-in-out;
        animation-fill-mode: forwards;
      }

      &.rotate-computer > p:nth-child(1) {
        animation: rotate-45 .5s ease-in-out;
        animation-fill-mode: forwards;
      }
      &.rotate-computer > p:nth-child(2) {
        animation: rotate-135 .5s ease-in-out;
        animation-fill-mode: forwards;
      }
      &.rotate-computer-disappear > p:nth-child(1) {
        animation: rotate-45-disappear .5s ease-in-out;
        animation-fill-mode: forwards;
      }
      &.rotate-computer-disappear > p:nth-child(2) {
        animation: rotate-135-disappear .5s ease-in-out;
        animation-fill-mode: forwards;
      }

      &.rotate-biological > p:nth-child(1) {
        animation: rotate-45 .5s ease-in-out;
        animation-fill-mode: forwards;
      }
      &.rotate-biological > p:nth-child(2) {
        animation: rotate-135 .5s ease-in-out;
        animation-fill-mode: forwards;
      }

      &.rotate-biological-disappear > p:nth-child(1) {
        animation: rotate-45-disappear .5s ease-in-out;
        animation-fill-mode: forwards;
      }
      &.rotate-biological-disappear > p:nth-child(2) {
        animation: rotate-135-disappear .5s ease-in-out;
        animation-fill-mode: forwards;
      }

    }

    .dept_list_section {
      z-index:10;
      position: absolute;
      left: 40vw;
      top: 18vh;

      max-width: 25vh;

      ul {
        list-style-type: none;
        margin: 0;
        padding: 0;

        li {
          margin: 0;
          padding: 0;

          transition-property: font-size, text-align, background-color, padding;
          transition-duration: .3s;
          transition-timing-function: ease;
        }

        li[data-key="design"]  {
          transform: translateX(34px) skewX(-5deg);
        }
        li[data-key="social"]  {
          transform: translateX(56px) skewX(-5deg);
        }
        li[data-key="undeclear"]  {
          transform: translateX(72px) skewX(-5deg);
        }
        li[data-key="engineer-1"]  {
          transform: translateX(93px) skewX(-5deg);
        }
        li[data-key="engineer-2"]  {
          transform: translateX(100px) skewX(-5deg);
        }
        li[data-key="science"]  {
          transform: translateX(100px) skewX(-5deg);
        }
        li[data-key="humanity"]  {
          transform: translateX(100px) skewX(-5deg);
        }
        li[data-key="medicine"]  {
          transform: translateX(90px) skewX(-5deg);
        }
        li[data-key="management"]  {
          transform: translateX(70px) skewX(-5deg);
        }
        li[data-key="computer"]  {
          transform: translateX(50px) skewX(-5deg);
        }
        li[data-key="biological"]  {
          transform: translateX(26px) skewX(-5deg);
        }
      }

      .dept_class_item {
        margin: 3vh;
        z-index:10;
        font-size: 2.6vh;

        p {
          width: 100%;

          margin: 0;
          padding: 10;

          text-align: right;
          border-radius: 10px;
          color: black;
          font-weight: 500;
          cursor: pointer;
          transform: skewX(5deg);
        }
        &.active {
            color: white;
            border-radius: 10px;
            background-color: #DD4A43;
            padding: 10px;
            font-size: 3vh;
            font-weight: 500;
            }
        &:hover {
          color: white;
          border-radius: 10px;
          background-color: #DD4A43;
          padding: 10px;
          font-size: 3vh;
          font-weight: 500;
        }
      }
    }
  }

  /*
    computer layout css
  */
  @media only screen and (min-width: 552px) {

    @font-face {
    font-family: 'GenYoGothicTW-Bold';
    src: url('../assets/fonts/GenYoGothicTW-Bold.woff') format("woff"),
          url('../assets/fonts/GenYoGothicTW-Bold.ttf') format("truetype"),
          url('../assets/fonts/GenYoGothicTW-Bold.eot') format("embedded-opentype");
    }
    @import url('https://fonts.googleapis.com/css?family=Noto+Sans+TC');
    *{
      font-family: 'Noto Sans TC'!important;
    }

    .dept_page {
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      justify-items: flex-start;
      height: 100vh;
      width: 100vw;
      background: #F8F6E8;
      margin: 0;
      padding: 0;
      overflow: hidden;
    }
    .dept_title {
      position: absolute;
      z-index: 20;
      left: 8vw;
      top: 5vh;
      display: inline-block;
      background: url("../assets/dept/title.svg");
      background-repeat: no-repeat;
      border-radius: 0px;
      text-align: center;
      color: white;
      padding: 1vw 4.2vw 1vw 4.2vw;
      height: 20vh;
      width: 30vw;
    }

    .dept_decoration_top {
      position: absolute;
      left: 46vw;
      top: 6vh;
      width:  30vw;

      margin-top: auto;
      margin-bottom: auto;
      padding-bottom: 38vw;

      background: url("../assets/dept/decoration_top.svg");
      background-position: center top;
      background-repeat: no-repeat;
      background-size: contain;
    }

    .dept_decoration_bottom {
      position: absolute;
      top: -3vh;
      left: -2vw;
      height: 30vw;
      width: 25vw;

      margin-top: auto;
      margin-bottom: auto;
      padding-bottom: 38vw;

      background: url("../assets//dept/decoration_bottom.svg");
      background-position: center top;
      background-repeat: no-repeat;
      background-size: contain;
    }

    .dept_return_button {
      position: absolute;
      right: 4.2vw;
      top: 3.7vw;

      width: 6vw;
      height: 6vw;
      background-color: transparent;
      background-image: url("../assets/exit.svg");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      background-position: 50% 50%;

      outline: none;
      border: none;
      filter: brightness(120%);

      cursor: pointer;

      transition: filter .3s ease;

      &:hover {
        filter: brightness(130%);
      }
      &:active {
        filter: brightness(80%);
      }
    }

    .external_circle {
      position: absolute;
      pointer-events: none;
    }

    .dept_layout {
      display: grid;
      grid-template-columns: 22vw 78vw;
      grid-template-areas: "list chain";

      justify-content: center;
      justify-items: center;
      align-items: center;

      width: 100vw;
      height: 100vh;
    }

    .dept_chain_section {
      grid-area: chain;

      display: grid;
      grid-template-columns: 4vw repeat(5, 1fr);
      grid-template-rows: 5vw repeat(3, 1fr) 5vw;
      grid-template-areas: ". . . . . exit"
        ". . large large large large"
        ". small large large large large "
        ". . large large large large"
        ". . . . . .";
      justify-content: center;
      justify-items: center;
      align-items: center;

      width: 100%;
      height: 100%;

      .dept_chain_small {
        grid-area: small;

        left: 50vw;
        top: 20vh;
        width: 13vw;
        height: 13vw;

        background-image: url("../assets/dept/small_chain.svg");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        background-position: 50% 50%;
      }

      .dept_chain_large {
        grid-area: large;

        width: 35vw;
        height: 35vw;

        background-image: url("../assets/dept/large_chain.svg");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        background-position: 50% 50%;
      }
      svg {
        position: absolute;

        top: 0;
        bottom: 0;
        margin: auto 0;
        left: 22vw;
      }
    }

    .dept_college {
      position: absolute;
      left: 66vw;
      top: 48vh;
      box-sizing: border-box;

      will-change: opacity, transform;

      p {
        position: absolute;
        left: 0;
        top: 0;
        width: 6vw;
        height: auto;
        text-align: center;
        vertical-align: bottom;
        background-color: #ffffff;
        border-radius: 10px;
        color: #1E5EAA;
        padding: 10px;
        font-size: 1.2vw;
        font-weight: 500;
        cursor: pointer;
      }
      p:hover {
        z-index: 999;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
      }
      &.rotate-design > p:nth-child(1) {
        animation: rotate-30 .5s ease-in-out;
        animation-fill-mode: forwards;
      }
      &.rotate-design > p:nth-child(2) {
        animation: rotate-90 .5s ease-in-out;
        animation-fill-mode: forwards;
      }
      &.rotate-design > p:nth-child(3) {
        animation: rotate-150 .5s ease-in-out;
        animation-fill-mode: forwards;
      }

      &.rotate-design-disappear > p:nth-child(1) {
        animation: rotate-30-disappear .5s ease-in-out;
        animation-fill-mode: forwards;
      }
      &.rotate-design-disappear > p:nth-child(2) {
        animation: rotate-90-disappear .5s ease-in-out;
        animation-fill-mode: forwards;
      }
      &.rotate-design-disappear > p:nth-child(3) {
        animation: rotate-150-disappear .5s ease-in-out;
        animation-fill-mode: forwards;
      }

      &.rotate-social > p:nth-child(1) {
        animation: rotate-23 .5s ease-in-out;
        animation-fill-mode: forwards;
      }
      &.rotate-social > p:nth-child(2) {
        animation: rotate-68 .5s ease-in-out;
        animation-fill-mode: forwards;
      }
      &.rotate-social > p:nth-child(3) {
        animation: rotate-113 .5s ease-in-out;
        animation-fill-mode: forwards;
      }
      &.rotate-social > p:nth-child(4) {
        animation: rotate-158 .5s ease-in-out;
        animation-fill-mode: forwards;
      }

      &.rotate-social-disappear > p:nth-child(1) {
        animation: rotate-23-disappear .5s ease-in-out;
        animation-fill-mode: forwards;
      }
      &.rotate-social-disappear > p:nth-child(2) {
        animation: rotate-68-disappear .5s ease-in-out;
        animation-fill-mode: forwards;
      }
      &.rotate-social-disappear > p:nth-child(3) {
        animation: rotate-113-disappear .5s ease-in-out;
        animation-fill-mode: forwards;
      }
      &.rotate-social-disappear > p:nth-child(4) {
        animation: rotate-158-disappear .5s ease-in-out;
        animation-fill-mode: forwards;
      }

      &.rotate-undeclear > p {
        animation: rotate-90 .5s ease-in-out;
        animation-fill-mode: forwards;
      }

      &.rotate-undeclear-disappear > p {
        animation: rotate-90-disappear .5s ease-in-out;
        animation-fill-mode: forwards;
      }

      &.rotate-engineer-1 > p:nth-child(1) {
        animation: rotate-12 .5s ease-in-out;
        animation-fill-mode: forwards;
      }
      &.rotate-engineer-1 > p:nth-child(2) {
        animation: rotate-37 .5s ease-in-out;
        animation-fill-mode: forwards;
      }
      &.rotate-engineer-1 > p:nth-child(3) {
        animation: rotate-63 .5s ease-in-out;
        animation-fill-mode: forwards;
      }
      &.rotate-engineer-1 > p:nth-child(4) {
        animation: rotate-90 .5s ease-in-out;
        animation-fill-mode: forwards;
      }
      &.rotate-engineer-1 > p:nth-child(5) {
        animation: rotate-117 .5s ease-in-out;
        animation-fill-mode: forwards;
      }
      &.rotate-engineer-1 > p:nth-child(6) {
        animation: rotate-143 .5s ease-in-out;
        animation-fill-mode: forwards;
      }
      &.rotate-engineer-1 > p:nth-child(7) {
        animation: rotate-168 .5s ease-in-out;
        animation-fill-mode: forwards;
      }
      &.rotate-engineer-2 > p:nth-child(1) {
        animation: rotate-15 .5s ease-in-out;
        animation-fill-mode: forwards;
      }
      &.rotate-engineer-2 > p:nth-child(2) {
        animation: rotate-45 .5s ease-in-out;
        animation-fill-mode: forwards;
      }
      &.rotate-engineer-2 > p:nth-child(3) {
        animation: rotate-75 .5s ease-in-out;
        animation-fill-mode: forwards;
      }
      &.rotate-engineer-2 > p:nth-child(4) {
        animation: rotate-105 .5s ease-in-out;
        animation-fill-mode: forwards;
      }
      &.rotate-engineer-2 > p:nth-child(5) {
        animation: rotate-135 .5s ease-in-out;
        animation-fill-mode: forwards;
      }
      &.rotate-engineer-2 > p:nth-child(6) {
        animation: rotate-165 .5s ease-in-out;
        animation-fill-mode: forwards;
      }

      &.rotate-engineer-1-disappear > p:nth-child(1) {
        animation: rotate-12-disappear .5s ease-in-out;
        animation-fill-mode: forwards;
      }
      &.rotate-engineer-1-disappear > p:nth-child(2) {
        animation: rotate-37-disappear .5s ease-in-out;
        animation-fill-mode: forwards;
      }
      &.rotate-engineer-1-disappear > p:nth-child(3) {
        animation: rotate-63-disappear .5s ease-in-out;
        animation-fill-mode: forwards;
      }
      &.rotate-engineer-1-disappear > p:nth-child(4) {
        animation: rotate-90-disappear .5s ease-in-out;
        animation-fill-mode: forwards;
      }
      &.rotate-engineer-1-disappear > p:nth-child(5) {
        animation: rotate-117-disappear .5s ease-in-out;
        animation-fill-mode: forwards;
      }
      &.rotate-engineer-1-disappear > p:nth-child(6) {
        animation: rotate-143-disappear .5s ease-in-out;
        animation-fill-mode: forwards;
      }
      &.rotate-engineer-1-disappear > p:nth-child(7) {
        animation: rotate-168-disappear .5s ease-in-out;
        animation-fill-mode: forwards;
      }
      &.rotate-engineer-2-disappear > p:nth-child(1) {
        animation: rotate-15-disappear .5s ease-in-out;
        animation-fill-mode: forwards;
      }
      &.rotate-engineer-2-disappear > p:nth-child(2) {
        animation: rotate-45-disappear .5s ease-in-out;
        animation-fill-mode: forwards;
      }
      &.rotate-engineer-2-disappear > p:nth-child(3) {
        animation: rotate-75-disappear .5s ease-in-out;
        animation-fill-mode: forwards;
      }
      &.rotate-engineer-2-disappear > p:nth-child(4) {
        animation: rotate-105-disappear .5s ease-in-out;
        animation-fill-mode: forwards;
      }
      &.rotate-engineer-2-disappear > p:nth-child(5) {
        animation: rotate-135-disappear .5s ease-in-out;
        animation-fill-mode: forwards;
      }
      &.rotate-engineer-2-disappear > p:nth-child(6) {
        animation: rotate-165-disappear .5s ease-in-out;
        animation-fill-mode: forwards;
      }

      &.rotate-science > p:nth-child(1) {
        animation: rotate-18 .5s ease-in-out;
        animation-fill-mode: forwards;
      }
      &.rotate-science > p:nth-child(2) {
        animation: rotate-54 .5s ease-in-out;
        animation-fill-mode: forwards;
      }
      &.rotate-science > p:nth-child(3) {
        animation: rotate-90 .5s ease-in-out;
        animation-fill-mode: forwards;
      }
      &.rotate-science > p:nth-child(4) {
        animation: rotate-126 .5s ease-in-out;
        animation-fill-mode: forwards;
      }
      &.rotate-science > p:nth-child(5) {
        animation: rotate-162 .5s ease-in-out;
        animation-fill-mode: forwards;
      }

      &.rotate-science-disappear > p:nth-child(1) {
        animation: rotate-18-disappear .5s ease-in-out;
        animation-fill-mode: forwards;
      }
      &.rotate-science-disappear > p:nth-child(2) {
        animation: rotate-54-disappear .5s ease-in-out;
        animation-fill-mode: forwards;
      }
      &.rotate-science-disappear > p:nth-child(3) {
        animation: rotate-90-disappear .5s ease-in-out;
        animation-fill-mode: forwards;
      }
      &.rotate-science-disappear > p:nth-child(4) {
        animation: rotate-126-disappear .5s ease-in-out;
        animation-fill-mode: forwards;
      }
      &.rotate-science-disappear > p:nth-child(5) {
        animation: rotate-162-disappear .5s ease-in-out;
        animation-fill-mode: forwards;
      }

      &.rotate-humanity > p:nth-child(1) {
        animation: rotate-23 .5s ease-in-out;
        animation-fill-mode: forwards;
      }
      &.rotate-humanity > p:nth-child(2) {
        animation: rotate-68 .5s ease-in-out;
        animation-fill-mode: forwards;
      }
      &.rotate-humanity > p:nth-child(3) {
        animation: rotate-113 .5s ease-in-out;
        animation-fill-mode: forwards;
      }
      &.rotate-humanity > p:nth-child(4) {
        animation: rotate-158 .5s ease-in-out;
        animation-fill-mode: forwards;
      }

      &.rotate-humanity-disappear > p:nth-child(1) {
        animation: rotate-23-disappear .5s ease-in-out;
        animation-fill-mode: forwards;
      }
      &.rotate-humanity-disappear > p:nth-child(2) {
        animation: rotate-68-disappear .5s ease-in-out;
        animation-fill-mode: forwards;
      }
      &.rotate-humanity-disappear > p:nth-child(3) {
        animation: rotate-113-disappear .5s ease-in-out;
        animation-fill-mode: forwards;
      }
      &.rotate-humanity-disappear > p:nth-child(4) {
        animation: rotate-158-disappear .5s ease-in-out;
        animation-fill-mode: forwards;
      }

      &.rotate-medicine > p:nth-child(1) {
        animation: rotate-15 .5s ease-in-out;
        animation-fill-mode: forwards;
      }
      &.rotate-medicine > p:nth-child(2) {
        animation: rotate-45 .5s ease-in-out;
        animation-fill-mode: forwards;
      }
      &.rotate-medicine > p:nth-child(3) {
        animation: rotate-75 .5s ease-in-out;
        animation-fill-mode: forwards;
      }
      &.rotate-medicine > p:nth-child(4) {
        animation: rotate-105 .5s ease-in-out;
        animation-fill-mode: forwards;
      }
      &.rotate-medicine > p:nth-child(5) {
        animation: rotate-135 .5s ease-in-out;
        animation-fill-mode: forwards;
      }
      &.rotate-medicine > p:nth-child(6) {
        animation: rotate-165 .5s ease-in-out;
        animation-fill-mode: forwards;
      }

      &.rotate-medicine-disappear > p:nth-child(1) {
        animation: rotate-15-disappear .5s ease-in-out;
        animation-fill-mode: forwards;
      }
      &.rotate-medicine-disappear > p:nth-child(2) {
        animation: rotate-45-disappear .5s ease-in-out;
        animation-fill-mode: forwards;
      }
      &.rotate-medicine-disappear > p:nth-child(3) {
        animation: rotate-75-disappear .5s ease-in-out;
        animation-fill-mode: forwards;
      }
      &.rotate-medicine-disappear > p:nth-child(4) {
        animation: rotate-105-disappear .5s ease-in-out;
        animation-fill-mode: forwards;
      }
      &.rotate-medicine-disappear > p:nth-child(5) {
        animation: rotate-135-disappear .5s ease-in-out;
        animation-fill-mode: forwards;
      }
      &.rotate-medicine-disappear > p:nth-child(6) {
        animation: rotate-165-disappear .5s ease-in-out;
        animation-fill-mode: forwards;
      }

      &.rotate-management > p:nth-child(1) {
        animation: rotate-18 .5s ease-in-out;
        animation-fill-mode: forwards;
      }
      &.rotate-management > p:nth-child(2) {
        animation: rotate-54 .5s ease-in-out;
        animation-fill-mode: forwards;
      }
      &.rotate-management > p:nth-child(3) {
        animation: rotate-90 .5s ease-in-out;
        animation-fill-mode: forwards;
      }
      &.rotate-management > p:nth-child(4) {
        animation: rotate-126 .5s ease-in-out;
        animation-fill-mode: forwards;
      }
      &.rotate-management > p:nth-child(5) {
        animation: rotate-162 .5s ease-in-out;
        animation-fill-mode: forwards;
      }

      &.rotate-management-disappear > p:nth-child(1) {
        animation: rotate-18-disappear .5s ease-in-out;
        animation-fill-mode: forwards;
      }
      &.rotate-management-disappear > p:nth-child(2) {
        animation: rotate-54-disappear .5s ease-in-out;
        animation-fill-mode: forwards;
      }
      &.rotate-management-disappear > p:nth-child(3) {
        animation: rotate-90-disappear .5s ease-in-out;
        animation-fill-mode: forwards;
      }
      &.rotate-management-disappear > p:nth-child(4) {
        animation: rotate-126-disappear .5s ease-in-out;
        animation-fill-mode: forwards;
      }
      &.rotate-management-disappear > p:nth-child(5) {
        animation: rotate-162-disappear .5s ease-in-out;
        animation-fill-mode: forwards;
      }

      &.rotate-computer > p:nth-child(1) {
        animation: rotate-45 .5s ease-in-out;
        animation-fill-mode: forwards;
      }
      &.rotate-computer > p:nth-child(2) {
        animation: rotate-135 .5s ease-in-out;
        animation-fill-mode: forwards;
      }
      &.rotate-computer-disappear > p:nth-child(1) {
        animation: rotate-45-disappear .5s ease-in-out;
        animation-fill-mode: forwards;
      }
      &.rotate-computer-disappear > p:nth-child(2) {
        animation: rotate-135-disappear .5s ease-in-out;
        animation-fill-mode: forwards;
      }

      &.rotate-biological > p:nth-child(1) {
        animation: rotate-45 .5s ease-in-out;
        animation-fill-mode: forwards;
      }
      &.rotate-biological > p:nth-child(2) {
        animation: rotate-135 .5s ease-in-out;
        animation-fill-mode: forwards;
      }

      &.rotate-biological-disappear > p:nth-child(1) {
        animation: rotate-45-disappear .5s ease-in-out;
        animation-fill-mode: forwards;
      }
      &.rotate-biological-disappear > p:nth-child(2) {
        animation: rotate-135-disappear .5s ease-in-out;
        animation-fill-mode: forwards;
      }

    }

    .dept_list_section {
      grid-area: list;
      justify-self: flex-end;

      max-width: 14vw;

      ul {
        list-style-type: none;
        margin: 0;
        padding: 0;

        li {
          margin: 0;
          padding: 0;

          transition-property: font-size, text-align, background-color, padding;
          transition-duration: .3s;
          transition-timing-function: ease;
        }

        li[data-key="design"]  {
          transform: translateX(38px) skewX(-5deg);
        }
        li[data-key="social"]  {
          transform: translateX(32px) skewX(-5deg);
        }
        li[data-key="undeclear"]  {
          transform: translateX(28px) skewX(-5deg);
        }
        li[data-key="engineer-1"]  {
          transform: translateX(24px) skewX(-5deg);
        }
        li[data-key="engineer-2"]  {
          transform: translateX(24px) skewX(-5deg);
        }
        li[data-key="science"]  {
          transform: translateX(20px) skewX(-5deg);
        }
        li[data-key="humanity"]  {
          transform: translateX(20px) skewX(-5deg);
        }
        li[data-key="medicine"]  {
          transform: translateX(24px) skewX(-5deg);
        }
        li[data-key="management"]  {
          transform: translateX(28px) skewX(-5deg);
        }
        li[data-key="computer"]  {
          transform: translateX(36px) skewX(-5deg);
        }
        li[data-key="biological"]  {
          transform: translateX(38px) skewX(-5deg);
        }
      }

      .dept_class_item {
        margin: 2vh;

        font-size: 1.3vw;

        p {
          width: 100%;

          margin: 0;
          padding: 0;

          text-align: left;
          border-radius: 10px;
          font-weight: 500;
          cursor: pointer;
          transform: skewX(5deg);
        }
        &.active {
            color: white;
            border-radius: 10px;
            background-color: #DD4A43;
            padding: 10px;
            font-size: 1.5vw;
            font-weight: 500;
          }
        &:hover {
          color: #DD4A43;
          border-radius: 10px;
          background-color: #eeefef;
          padding: 10px;
          font-size: 1.5vw;
          font-weight: 500;
        }
      }
    }
  }
</style>
