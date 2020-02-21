<template lang="pug">
  div(class="intro_page")
    div(class="intro_background")
    p(class="intro_title")
    div(class="intro_activity_counter")
      section(class="intro_activity_number_section")
        span(id="intro_activity_number_1")
        span(id="intro_activity_number_2")
    div(class="intro_layout")
      section(class="intro_counter_section")
        div(class="intro_countdown_number")
          span(id="intro_number_1")
          span(id="intro_number_2")
        div(class="intro_countdown_dot")
          span(id="intro_dot_1")
          span(id="intro_dot_2")
          span(id="intro_dot_3")
      //section(class="intro_wheel_section")
      //section(class="intro_logo_section")
      div(class="intro_dot")
      div(class="intro_dot2")
      div(class="intro_menu")
        ul
          router-link(tag="li" v-bind:to="'/' + urlText[index]" v-for="(text, index) of menuText" v-bind:key="text" v-bind:style="{'backgroundImage': 'url(' + require(`../assets/intro/menu_${index + 1}.svg`) + ')'}")
            p {{text}}
</template>

<script>
export default {
  name: 'IntroPage',
  data: function () {
    return {
      menuText: ['', '', '', '', '', ''],
      urlText: ['news', 'parent', 'activity', 'department', 'sign-up', 'sponsor'],
      numberDom1: null,
      numberDom2: null,
      numberDom3: null,
      numberDom4: null
    }
  },
  mounted: function () {
    setInterval(this.timeCounter, 1000)
    this.numberDom1 = document.querySelector('#intro_number_1')
    this.numberDom2 = document.querySelector('#intro_number_2')
    this.numberDom3 = document.querySelector('#intro_activity_number_1')
    this.numberDom4 = document.querySelector('#intro_activity_number_2')
    this.timeCounter()
  },
  computed: {
  },
  methods: {
    timeCounter: function () {
      const timeStr1 = '2020/3/8 00:00'
      const timeStr2 = '2020/3/8 00:00'
      const startDate = new Date()
      let endDate = new Date(timeStr1)
      let spantime = (endDate - startDate) / 1000
      let day = Math.floor(spantime / (24 * 3600))
      if (spantime > 0) {
        let number = require(`../assets/number_${Math.floor(day / 10)}.svg`)
        this.numberDom1.style.setProperty('background-image', `url(${number})`)
        number = require(`../assets/number_${Math.floor(day % 10)}.svg`)
        this.numberDom2.style.setProperty('background-image', `url(${number})`)
      }
      endDate = new Date(timeStr2)
      spantime = (endDate - startDate) / 1000
      day = Math.floor(spantime / (24 * 3600))
      if (spantime > 0) {
        let number = require(`../assets/number_${Math.floor(day / 10)}.svg`)
        this.numberDom3.style.setProperty('background-image', `url(${number})`)
        number = require(`../assets/number_${Math.floor(day % 10)}.svg`)
        this.numberDom4.style.setProperty('background-image', `url(${number})`)
      }
    },
    checkAvailable: function (index) {
      if (index === 2 || index === 3) {
        alert('敬請期待')
      }
    }
  }
}
</script>

<style lang="scss" scoped>

  @keyframes roll {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  #intro_dot_1 {
    animation: dot-loading 1.2s ease-in-out;
    animation-iteration-count: infinite;
  }
  #intro_dot_2 {
    animation: dot-loading 1.2s ease-in-out;
    animation-delay: 0.4s;
    animation-iteration-count: infinite;
  }
  #intro_dot_3 {
    animation: dot-loading 1.2s ease-in-out;
    animation-delay: 0.8s;
    animation-iteration-count: infinite;
  }

  .list-enter-active, .list-leave-active {
  transition: all 10s;
  }
  .list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
    opacity: 0;
    transform: translateY(30px);
  }
  /*
    mobile layout css
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
    .intro_page {
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
      width: 100vw;
      margin: 0;
      padding: 0;
      background: white;
      overflow: hidden;
    }

    .intro_background {
      position: absolute;
      top: 0;
      top: -5vh;
      background: #F8F6E8;
      background-image: url("../assets/logo.svg");
      background-repeat: no-repeat;
      background-size: 80% 80%;
      background-position: 50% 50%;
      height: 61vh;
      width: 100vw;
      transform: skewY(-5deg);
    }
    .intro_title {
      position: absolute;
      z-index: 20;
      left: 8vw;
      top: 5vh;
      display: inline-block;
      border-radius: 50px;
      text-align: center;
      color: white;
      padding: 6vw 10vw 6vw 10vw;
      font-size: 5vw;
      font-weight: 500;
      letter-spacing: 1px;
      line-height: 2vw;
      transform: rotateZ(-5deg);
    }

    .intro_activity_counter {
      display: none;
    }

    .intro_layout {
      display: grid;
      grid-template-columns: 100vw;
      grid-template-rows: 10vh 3fr 1.5fr;
      grid-template-areas: "empty"
        "logo"
        "menu";
      grid-gap: 12vw;
      align-items: center;
      justify-items: center;
      width: 100vw;
      height: 100vh;
    }

    .intro_counter_section {
      display: none;
    }
    .intro_wheel_section {
      display: none;
    }
    .intro_logo_section {
      grid-area: logo;
      justify-self: center;
      align-self: center;

      width: 30vw;
      height: 30vw;
      background-image: url("../assets/logo.svg");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      z-index: 50;
    }

    .intro_menu {
      grid-area: menu;
      align-self: center;

      display: flex;
      width: 100%;
      height: 100%;
      justify-content: center;
      justify-items: center;
      align-items: center;

      z-index: 5;

      padding: 5vw;
      box-sizing: border-box;

      ul {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(2, 1fr);
        justify-content: center;
        align-content: center;
        align-items: center;
        list-style-type: none;
        width: 100%;
        height: 100%;
        li {
          justify-self: center;
          align-self: center;

          display: inline-block;
          width: 30vw;
          height: 30vw;
          margin: 2vw 0;
          box-sizing: border-box;

          background-repeat: no-repeat;
          background-position: 50% 0%;
          background-size: 70% 70%;

          border: 0px solid #942323;
          border-radius: 1vw;
          box-sizing: content-box;

          transition: filter .3s ease, border-width .2s ease, border-radius .2s ease;

          cursor: pointer;
          &:hover {
            border-width: 0.15vw;
            border-radius: 1.7vw;
          }
          &:active {
            filter: brightness(50%);
          }
          p {
            display: inline-block;
            font-size: 4vw;
            line-height: 4vw;
            color: #942323;
          }
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
    .intro_page {
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
      width: 100vw;
      margin: 0;
      padding: 0;
    }
    .intro_background {
      position: absolute;
      z-index: -1;
      background: #F8F6E8;
      height: 100vh;
      width: 100vw;
    }
    .intro_dot {
      position: absolute;
      right:-2vw;
      top:-22vw;
      z-index: 0;
      background-image: url("../assets/intro/dotssss.svg");
      background-repeat: no-repeat;
      height: 40vw;
      width: 40vw;
    }
    .intro_dot2 {
      position: absolute;
      left:-2vw;
      bottom:-22vw;
      z-index: 0;
      background-image: url("../assets/intro/dotssss.svg");
      background-repeat: no-repeat;
      height: 40vw;
      width: 40vw;
    }
    .intro_layout {
      display: grid;
      grid-template-columns: 1.5fr 1fr 0.2fr;
      grid-template-rows:1fr;
      grid-template-areas:"time menu";
      grid-gap: 2vw;
      align-items: center;
      justify-items: center;
      width: 100vw;
      height: 100vh;
    }

    .intro_counter_section {
      grid-area: time;
      justify-self: flex-end;
      align-self: center;

      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr 1fr;
      grid-template-areas: "empty empty""dot dot";
      background-image: url("../assets/countdown.svg");
      background-repeat: no-repeat;
      background-position: right bottom;
      background-size: 80% 125%;
      width: 45vw;
      height: 45vw;

      .intro_countdown_number {
        grid-area: number;
        display: flex;
        flex-wrap: nowrap;
        justify-content: flex-end;
        align-items: flex-end;
        span {
          display: inline-block;
          width: 20%;
          height: 50%;
          margin-bottom: 6vw;
          background-image: url("../assets/number_0.svg");
          background-size: 125% 125%;
          background-position: 50% 0%;
        }
      }

      .intro_countdown_dot {
        grid-area: dot;
        display: flex;
        justify-items: flex-end;
        justify-content: flex-end;
        align-items: flex-end;
        span {
          width: 1.5vw;
          height: 1.5vw;
          margin: 0.8vw;
          margin-bottom: 5vw;
          background-image: url("../assets/dot.svg");
          background-repeat: no-repeat;
          background-size: 100% 100%;
          background-position: 30% 0%;
        }
      }
    }

    .intro_menu {
      grid-area: menu;
      align-self: center;

      display: flex;
      flex-wrap: nowrap;
      width: 100%;
      height: 80%;
      justify-content: center;
      justify-items: center;
      align-items: center;
      z-index: 5;

      ul {
        display: inline-block;
        list-style-type: none;
        margin: 0;
        padding: 0;
        li {
          display: inline-block;
          align-self: center;
          width: 10vw;
          height: 10vw;
          margin: 0 1vw;
          box-sizing: border-box;

          background-repeat: no-repeat;
          background-position: 60% 15%;
          background-size: 75% 75%;
          &:last-child {
            background-position: 60% 15%;
            background-size: 75% 75%;
          }

          border: 0px solid #DD4A43;
          border-radius: 0px;
          box-sizing: content-box;

          transition: filter .3s ease, border-width .2s ease, border-radius .2s ease;

          cursor: pointer;
          &:hover {
            border-width: 0.2vw;
            border-radius: 1vw;
            background-size: 90% 90%;
          }
          &:active {
            filter: brightness(50%);
          }
          p {
            font-size: 1.2vw;
            color: #DD4A43;
            font-weight: 500;
          }
        }
      }
    }
  }

</style>
