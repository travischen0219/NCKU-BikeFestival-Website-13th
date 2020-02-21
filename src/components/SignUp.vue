<template lang="pug">
  div(class="signup_page")
    router-link(tag="button" to="/" class="signup_return_button")
    div(class="signup_background_1")
    div(class="signup_background_2")
    div(class="external_circle")
    span(class="signup_bike")
    div(class="signup_layout")
      div(class="signup_decoration_top")
      section(class="signup_graph_statis_section")
        a(href="https://lihi1.com/Poozk" target="_blank" class="signup_button") 我要報名
        ve-pie(ref="chart" v-bind:data="regionData" v-bind:settings="chartSettings" v-bind:extend="chartExtends" height="600px")
      div(class="signup_decoration_bottom")
    p(class="signup_title") NCKU BIKE FESTIVAL
</template>

<script>
import axios from 'axios'

export default {
  data: function () {
    return {
      chartExtends: {
        tooltip: {
          formatter: '{b} {d}%'
        },
        series: {
          radius: '65%'
        }
      },
      chartSettings: {
        label: {
          normal: {
            fontSize: document.body.clientWidth > 552 ? 24 : 16,
            color: '#DD4A43'
          }
        },
        labelLine: {
          normal: {
            width: document.body.clientWidth > 552 ? 200 : 130,
            length: document.body.clientWidth > 552 ? 50 : 30,
            lineStyle: {
              color: '#DD4A43'
            }
          }
        },
        offsetY: document.body.clientWidth > 551 ? '50%' : '33.5%',
        itemStyle: {
          normal: {
            borderColor: '#DD4A43',
            borderWidth: 3,
            color: ['#ffffff']
          }
          // color: ['#ffffff', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3']
        }
      },
      regionData: {
        columns: ['area', 'number'],
        rows: [ {area: '北部', number: 0}, {area: '中部', number: 0}, {area: '南部', number: 0}, {area: '東部', number: 0}, {area: '其他', number: 0} ]
      }
    }
  },
  mounted: async function () {
    const self = this
    if (document.documentElement.clientWidth > 552) {
      self.chartSettings.offsetY = '50%'
    } else {
      self.chartSettings.offsetY = `${0.36 * document.body.querySelector('.signup_page').clientHeight / 667 * 100}%`
    }
    window.onresize = function () {
      if (document.documentElement.clientWidth > 552) {
        self.chartSettings.offsetY = '50%'
      } else {
        self.chartSettings.offsetY = `${0.36 * document.body.querySelector('.signup_page').clientHeight / 667 * 100}%`
      }
    }
    const url = `https://script.google.com/macros/s/AKfycbwkqHDOyzl6tam7Ed-68PHNV3qIhvJ1E_yaBsLs1I3XlesemNg/exec`
    // const self = this
    try {
      // use jsonp to deal with cors
      const result = await axios.get(url)
      const data = result.data.filter(target => target[0].length > 0)
      data.forEach(target => {
        switch (target[0]) {
          case '北部':
            this.regionData.rows[0].number++
            break
          case '中部':
            this.regionData.rows[1].number++
            break
          case '南部':
            this.regionData.rows[2].number++
            break
          case '東部':
            this.regionData.rows[3].number++
            break
          case '其他':
            this.regionData.rows[4].number++
            break
        }
      })
    } catch (error) {
      console.log(error)
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
      transform: rotate(-360deg);
    }
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
    .signup_page {
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      justify-items: flex-start;
      height: 100vh;
      width: 100vw;
      margin: 0;
      padding: 0;
      overflow: hidden;
    }
    .signup_background_1 {
      position: absolute;
      z-index: -1;
      top: -10vh;
      background: #F8F6E8;
      height: 25vh;
      width: 100vw;
      transform: skewY(-5deg);
    }
    .signup_background_2 {
      position: absolute;
      z-index: -1;
      top: 85vh;
      background: #F8F6E8;
      height: 25vh;
      width: 100vw;
      transform: skewY(-5deg);
    }

    .signup_layout {
      display: grid;
      grid-template-columns: 1fr;
      grid-template-areas: "graph";
      justify-content: center;
      align-content: center;
      align-items: center;

      width: 100vw;
      height: 65vh;
      box-sizing: border-box;
    }

    .signup_graph_statis_section {
      grid-area: graph;
      justify-self: center;
      align-self: center;

      width: 100%;
      height: 65vh;
    }

    .signup_button {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
      z-index: 50;

      width: 18vh;
      height: 8vh;
      background-color: #DD4A43;

      color: white;
      border: none;
      outline: none;
      text-decoration: none;
      font-size: 3vh;
      line-height: 8vh;

      cursor: pointer;
      transition: transform .2s ease-in-out, filter .2s ease-in-out;
      &:hover {
        transform: scale(1.08);
        filter: brightness(120%);
      }
    }

    .external_circle {
      position: absolute;
      width: 45vh;
      height: 45vh;

      margin: auto;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;

      border-radius: 100%;
      border: 3px solid #DD4A43;
    }

    .signup_bike {
      position: absolute;
      width: 55vh;
      height: 55vh;

      margin: auto;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;

      background-image: url("../assets/signup/bike.svg");
      background-repeat: no-repeat;
      background-position: 0% 50%;
      background-size: 7.5% 12%;

      animation: roll 4s linear infinite;

    }

    .signup_decoration_top {
      display: none;
    }

    .signup_decoration_bottom {
      display: none;
    }

    .signup_return_button {
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

    .signup_title {
      position: absolute;
      z-index: 20;
      left: 0;
      right: 0;
      margin: 0 auto;
      bottom: 4vh;
      display: inline-block;
      border-radius: 50px;
      text-align: center;
      color: #DD4A43;
      font-size: 4vh;
      font-weight: 500;
      letter-spacing: 0.5vw;
      line-height: 4vh;
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
    .signup_page {
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      justify-items: flex-start;
      height: 100vh;
      width: 100vw;
      margin: 0;
      padding: 0;
      overflow: hidden;
    }
    .signup_background_1 {
      position: absolute;
      z-index: -1;
      top: 0;
      left: -10vw;
      background: #F8F6E8;
      height: 100vh;
      width: 25vw;
      transform: skewX(-5deg);
    }
    .signup_background_2 {
      position: absolute;
      z-index: -1;
      top: 0;
      left: 85vw;
      background: #F8F6E8;
      height: 100vh;
      width: 25vw;
      transform: skewX(-5deg);
    }

    .signup_layout {
      display: grid;
      grid-template-columns: 1fr 3fr 1fr;
      grid-template-areas: "top graph bottom";
      justify-content: center;
      align-content: center;
      align-items: center;

      width: 100vw;
      height: 100vh;
      box-sizing: border-box;

      padding: 8vw;
    }

    .signup_graph_statis_section {
      grid-area: graph;
      justify-self: center;
      align-self: center;

      width: 100%;
      height: 100%;
    }

    .signup_button {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
      z-index: 50;

      width: 18vh;
      height: 8vh;
      background-color: #DD4A43;

      color: white;
      border: none;
      outline: none;
      text-decoration: none;
      font-size: 3vh;
      line-height: 8vh;

      cursor: pointer;
      transition: transform .2s ease-in-out, filter .2s ease-in-out;
      &:hover {
        transform: scale(1.08);
        filter: brightness(120%);
      }
    }

    .external_circle {
      position: absolute;
      width: 45vh;
      height: 45vh;

      margin: auto;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;

      border-radius: 100%;
      border: 3px solid #DD4A43;
    }

    .signup_bike {
      position: absolute;
      width: 55vh;
      height: 55vh;

      margin: auto;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;

      background-image: url("../assets/signup/bike.svg");
      background-repeat: no-repeat;
      background-position: 0% 50%;
      background-size: 7.5% 12%;

      animation: roll 4s linear infinite;

    }

    .signup_decoration_top {
      grid-area: top;
      justify-self: center;
      align-self: flex-start;

      background-image: url("../assets/decoration_top.svg");
      background-repeat: no-repeat;
      background-position: 50% 50%;
      background-size: 100% 100%;

      width: 11vw;
      height: 13vw;
    }

    .signup_decoration_bottom {
      grid-area: bottom;
      justify-self: center;
      align-self: flex-end;

      background-image: url("../assets/decoration_bottom.svg");
      background-repeat: no-repeat;
      background-position: 50% 50%;
      background-size: 100% 100%;

      width: 10vw;
      height: 10vw;
    }

    .signup_return_button {
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

    .signup_title {
      position: absolute;
      z-index: 20;
      left: 0;
      right: 0;
      margin: 0 auto;
      bottom: 4vh;
      display: inline-block;
      border-radius: 50px;
      text-align: center;
      color: #DD4A43;
      font-size: 4vh;
      font-weight: 500;
      letter-spacing: 0.5vw;
      line-height: 4vh;
    }
  }
</style>
