<template lang="pug">
  div(class="activity_page")
    div(class="activity_background")
    div(class="activity_layout")
      div(class="activity_title")
      div(class="activity_waterfall")
        section(v-for="(iter, index) of activities" v-bind:key="iter.title" class="activity_waterfall_item" v-on:click="currentIndex = currentIndex == -1 ? index : (currentIndex == index ? -1 : index)")
          time {{iter.time}}
          h1 {{iter.title}}
          section(v-show-slide:300:example-easing="currentIndex === index")
            label 地點：《{{iter.place}}》
            p {{iter.description}}
      section(class="activity_back")
        router-link(tag="button" to="/" class="activity_exit_button")
</template>

<script>
import Waterfall from 'vue-waterfall/lib/waterfall'
import WaterfallSlot from 'vue-waterfall/lib/waterfall-slot'

export default {
  components: {
    Waterfall,
    WaterfallSlot
  },
  data: function () {
    return {
      currentIndex: -1,
      activities: [
        {
          title: '科系博覽會',
          time: '0900-1700',
          place: '雲平大道',
          description: '45科系攤位向高中生展示各系特色。',
          width: 1,
          height: 0.5
        },
        {
          title: '開幕式',
          time: '0900-1000',
          place: '雲平大道',
          description: '邀請校內長官為單車節揭開序幕。',
          width: 1,
          height: 1
        },
        {
          title: '主舞台表演',
          time: '1000-1700',
          place: '雲平大道',
          description: '邀請高中大學各社團展演，增添單車節活力。',
          width: 1,
          height: 1
        },
        {
          title: '單車遊成大',
          time: '0900-1600',
          place: '全成大',
          description: '與 CKbike 合作讓高中生藉單車節了解成大之美。',
          width: 1,
          height: 1
        },
        {
          title: '青谷市集',
          time: '0900-1700',
          place: '一活前廣',
          description: '邀請校內校外各種團隊，提供學生對未來的各種可能。',
          width: 1,
          height: 1
        },
        {
          title: '學術特色展',
          time: '0900-1630',
          place: '一活一樓',
          description: '比較易混淆科系間的異同，讓高中生能更清楚自己所好並選擇所愛。',
          width: 1,
          height: 2
        },
        {
          title: '模擬面試',
          time: '0950-1620',
          place: '唯農大樓',
          description: '大學入學必備關卡之一，提供高中生一個機會得到經驗。',
          width: 1,
          height: 1
        },
        {
          title: '備審資料全攻略',
          time: '1000-1600',
          place: '交管系館教室',
          description: '大學入學必備關卡之一，讓高中生學習製作好的備審。',
          width: 1,
          height: 1
        },
        {
          title: '教育工作坊',
          time: '1030-1610',
          place: '國二講',
          description: '以時下教育議題為主，專業講者引導為輔，從不同層面思考現今因教育而起的問題。',
          width: 1,
          height: 2
        },
        {
          title: '大學生閃電秀',
          time: '1000-1635',
          place: '工資系館教室',
          description: '建立高中生和大學生的橋樑，打破隔閡破解迷思。',
          width: 1,
          height: 1
        },
        {
          title: '祈福牆',
          time: '0900-1700',
          place: '一活前草皮',
          description: '寫下自己的期望與憧憬，帶著夢想往未來前進。',
          width: 1,
          height: 1
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>

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
    .activity_page {
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      width: 100vw;
      margin: 0;
      padding: 0;
      background: #F8F6E8;
    }
    .activity_background {
      display: none;
    }
    .activity_title {
      grid-area: select;
      z-index: 20;

      width: 64vw;
      height: 30vw;
      left: 18vw;
      top: 6vh;
      margin-bottom: 2vw;
      background-image: url("../assets/activity/activity_title.svg");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      background-position: 50% 50%;
    }
    .activity_layout {
      display: grid;
      grid-template-columns: 100vw;
      grid-template-rows: 25vh 3.5fr;
      grid-template-areas: "select"
        "list";
      justify-content: center;
      justify-items: center;
      align-content: center;
      align-items: center;
      width: 100vw;
      min-height: 100vh;
    }
    .activity_waterfall {
      grid-area: list;
      z-index: 20;
      width: 100vw;
      height: 75vh;
      padding: 0 10vw;
      padding-bottom: 5vh;
      box-sizing: border-box;
      overflow-y: scroll;
      .activity_waterfall_item {
        background-color: #DD4A43;

        width: 100%;

        margin: 1vh 0;
        padding: 1.5vh 2vw;
        box-sizing: border-box;
        border-radius: 2vh;
        box-sizing: border-box;

        line-height: 2.5vh;
        font-size: 2.5vh;
        color: white;
        text-align: left;

        cursor: pointer;
        transition: filter .3s ease;
        overflow-y: hidden;

        &:hover {
          filter: brightness(120%);
        }
        &:active {
          filter: brightness(80%);
        }
        h1 {
          display: inline-block;
          margin: 0;
          margin-bottom: .5vw;
        }
        time {
          margin-right: 1vw;
        }
        p {
          min-width: 10.8vw;
          max-width: 100vw;
        }
        section > * {
          margin: .5vw 0;
        }
      }
    }
    .activity_back {
      grid-area: select;

      display: flex;
      align-items: flex-start;
      justify-items: flex-end;
      justify-content: flex-end;

      width: 100vw;
      height: 100%;

      .activity_exit_button {
        grid-area: exit;

        width: 7vw;
        height: 7vw;
        background-color: transparent;
        background-image: url("../assets/exit.svg");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        background-position: 50% 50%;

        margin: 7vw 7vw;
        z-index: 20;

        outline: none;
        border: none;

        cursor: pointer;

        transition: filter .3s ease;

        filter: brightness(130%);

        &:hover {
          filter: brightness(150%);
        }
        &:active {
          filter: brightness(80%);
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
    .activity_page {
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
    .activity_background {
      position: absolute;
      z-index: 1;
      top: 0;
      right: -10vw;
      background: #F8F6E8;
      height: 100vh;
      width: 50vw;
      transform: skewX(5deg);
    }
    .activity_title {
      grid-area: title;
      align-self: flex-end;
      z-index: 20;

      width: 17vw;
      height: 8vw;
      margin-bottom: 2vw;
      background-image: url("../assets/activity/activity_title.svg");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      background-position: 50% 50%;
    }
    .activity_layout {
      display: grid;
      grid-template-columns: 1fr 1.5fr 1fr;
      grid-template-rows: 15vw 60vh 15vw;
      grid-template-areas: ". title select"
        ". list ."
        ". . .";
      width: 100%;
      height: 100%;
    }
    .activity_waterfall {
      grid-area: list;
      display: flex;
      justify-content: flex-start;
      justify-items: flex-start;
      align-content: flex-start;
      align-items: flex-start;
      flex-wrap: wrap;
      z-index: 20;
      width: 80vw;
      .activity_waterfall_item {
        background-color: #DD4A43;

        min-width: 5vw;
        max-width: 60vw;
        min-height: 3vw;

        margin: 1vh;
        padding: 1.5vh 2vw;
        border-radius: 2vh;
        box-sizing: border-box;

        line-height: 2.5vh;
        font-size: 2.5vh;
        color: white;
        text-align: left;

        cursor: pointer;
        transition: filter .3s ease;
        overflow-y: hidden;

        &:hover {
          filter: brightness(120%);
        }
        &:active {
          filter: brightness(80%);
        }
        h1 {
          display: inline-block;
          margin: 0;
          margin-bottom: .5vw;
        }
        time {
          margin-right: 1vw;
        }
        p {
          min-width: 10.8vw;
          max-width: 100vw;
        }
        section > * {
          margin: .5vw 0;
        }
      }
    }
    .activity_back {
      grid-area: select;

      display: flex;
      align-items: flex-start;
      justify-items: center;
      justify-content: center;

      width: 100%;
      height: 100%;

      .activity_exit_button {
        grid-area: exit;

        width: 6vw;
        height: 6vw;
        background-color: transparent;
        background-image: url("../assets/exit.svg");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        background-position: 50% 50%;

        margin-top: 6vh;
        z-index: 20;

        outline: none;
        border: none;

        cursor: pointer;

        transition: filter .3s ease;

        filter: brightness(130%);

        &:hover {
          filter: brightness(150%);
        }
        &:active {
          filter: brightness(80%);
        }
      }
    }

  }
</style>
