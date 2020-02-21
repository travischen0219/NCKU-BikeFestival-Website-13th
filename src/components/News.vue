<template lang="pug">
  div(class="news_page")
    div(class="news_background")
    div(class="news_title")
    div(class="news_layout")
      section(class="news_list_section")
        ul(id="list")
          li(v-for="(iter, index) of news" v-bind:key="iter.Title" v-on:click="currentIndex = currentIndex == -1 ? index : (currentIndex == index ? -1 : index)")
            p {{iter.Title}}
            time {{parseTimestamp(iter.Timestamp)}}
            div(v-show-slide:300:example-easing="currentIndex === index" v-html="iter.Content")
      section(class="news_counter_section")
        div(class="news_decoration_top")
        div(class="news_counter")
          div(class="news_countdown_number")
            span(id="news_number_1")
            span(id="news_number_2")
          div(class="news_countdown_dot")
            span(id="news_dot_1")
            span(id="news_dot_2")
            span(id="news_dot_3")
        div(class="news_decoration_bottom")
      section(class="news_back")
        router-link(tag="button" to="/" class="news_exit_button")
</template>

<script>
import axios from 'axios'
export default {
  data: function () {
    return {
      news: [],
      currentIndex: -1,
      loader: null
    }
  },
  mounted: async function () {
    setInterval(this.timeCounter, 1000)
    this.numberDom1 = document.querySelector('#news_number_1')
    this.numberDom2 = document.querySelector('#news_number_2')
    this.timeCounter()
    this.loader = this.$loading.show()
    // get news from database
    try {
      // fetch the articles from database
      const url = `https://us-central1-ncku-bikefestival-12th.cloudfunctions.net/getNewsArticles`
      const result = await axios.get(url)
      this.news = result.data.sort((a, b) => b.Timestamp._seconds - a.Timestamp._seconds)
    } catch (error) {
      console.log(error)
    }
    this.loader.hide()
  },
  methods: {
    timeCounter: function () {
      const timeStr = '2019/1/26 00:00'
      const startDate = new Date()
      const endDate = new Date(timeStr)
      const spantime = (endDate - startDate) / 1000
      const day = Math.floor(spantime / (24 * 3600))
      if (spantime > 0) {
        let number = require(`../assets/number_${Math.floor(day / 10)}.svg`)
        this.numberDom1.style.setProperty('background-image', `url(${number})`)
        number = require(`../assets/number_${Math.floor(day % 10)}.svg`)
        this.numberDom2.style.setProperty('background-image', `url(${number})`)
      }
    },
    parseTimestamp: function (timestamp) {
      const time = new Date(timestamp._seconds * 1000)
      const str = `${time.getFullYear()}/${time.getMonth() + 1}/${time.getDate()}`
      return str
    }
  }
}
</script>

<style lang="scss" scoped>

  #news_dot_1 {
    animation: dot-loading 1.2s ease-in-out;
    animation-iteration-count: infinite;
  }
  #news_dot_2 {
    animation: dot-loading 1.2s ease-in-out;
    animation-delay: 0.4s;
    animation-iteration-count: infinite;
  }
  #news_dot_3 {
    animation: dot-loading 1.2s ease-in-out;
    animation-delay: 0.8s;
    animation-iteration-count: infinite;
  }

  /*
    mobile layout css
  */
  @media only screen and (max-width: 551px) {
    .news_page {
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      height: auto;
      width: 100vw;
      margin: 0;
      padding: 0;
      background: #F8F6E8;
    }
    .news_background {
      display: none;
    }
    .news_title {
      position: absolute;
      z-index: 20;
      left: 18vw;
      top: 6vh;

      width: 64vw;
      height: 30vw;
      background-image: url("../assets/news/news_title.svg");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      background-position: 50% 50%;
    }

    .news_layout {
      display: grid;
      grid-template-rows: 1.2fr 3fr .5fr;
      grid-template-areas: "select"
        "list"
        "list";
      justify-content: center;
      justify-items: center;
      align-items: center;

      width: 100vw;
      height: 100vh;

      .news_list_section {
        grid-area: list;
        justify-self: center;
        align-self: flex-start;

        width: 100%;
        height: 100%;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;

        &::-webkit-scrollbar {
          width: 10px;
          border-radius: 5px;
        }
        &::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        &::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 5px;
        }
        &::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
        ul {
          list-style-type: none;

          margin: 4vw 5vw;
          padding: 0;
          box-sizing: border-box;

          li {
            width: 100%;

            background-color: #DD4A43;

            margin: 0;
            padding: 2vh 4vw;
            border-radius: 2vh;
            box-sizing: border-box;

            line-height: 2.5vh;
            font-size: 2.5vh;
            color: white;
            text-align: left;

            cursor: pointer;
            transition: filter .3s ease;

            &:hover {
              filter: brightness(120%);
            }
            &:active {
              filter: brightness(80%);
            }
            time {
              float: right;
              font-size: 2vh;
            }
            p {
              display: inline-block;
              margin: 0;
            }

            div {
              background-color: transparent;

              line-height: 2vh;
              text-align: left;
              font-size: 2vh;
              color: white;

              transform-origin: top;
              transition: transform .3s ease;
              /deep/ p {
                line-height: 200%;
                font-size: 2vh;
              }
            }

          }
          li+li {
            margin-top: 4vw;
          }
        }
      }
      .news_counter_section {
        display: none;
      }
    }

    .news_back {
      grid-area: select;

      display: flex;
      align-items: center;
      justify-items: flex-end;
      justify-content: flex-end;

      width: 100vw;
      height: 100%;

      .news_exit_button {
        grid-area: exit;
        align-self: flex-start;

        width: 15vw;
        height: 15vw;
        background-color: transparent;
        background-image: url("../assets/exit.svg");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        background-position: 50% 50%;

        margin: 7vw 7vw;

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
    .news_page {
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
    .news_background {
      position: absolute;
      z-index: 1;
      top: 0;
      right: -10vw;
      background: #F8F6E8;
      height: 100vh;
      width: 50vw;
      transform: skewX(5deg);
    }
    .news_title {
      position: absolute;
      z-index: 20;
      left: 10vw;
      top: 8vh;

      width: 17vw;
      height: 8vw;
      background-image: url("../assets/news/news_title.svg");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      background-position: 50% 50%;
    }

    .news_layout {
      display: grid;
      grid-template-columns: 1.5fr 1fr;
      grid-template-rows: 20vh 60vh 20vh;
      grid-template-areas: "empty select"
        "list time"
        ". .";
      justify-content: center;
      justify-items: center;
      align-items: center;

      width: 100vw;
      height: 100vh;

      .news_list_section {
        grid-area: list;
        justify-self: center;
        align-self: flex-start;

        display: flex;
        justify-content: center;

        width: 90%;
        height: 100%;
        margin-top: 5vh;
        max-height: 60vh;
        overflow-y: auto;

        &::-webkit-scrollbar {
          width: 10px;
          border-radius: 5px;
        }
        &::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        &::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 5px;
        }
        &::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
        ul {
          list-style-type: none;

          padding: 0 3vw 0 8vw;

          width: 100%;

          li {
            width: 100%;

            background-color: #DD4A43;

            margin-top: 3vw;
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

            time {
              float: right;
              font-size: 2vh;
            }
            p {
              display: inline-block;
              margin: 0;
            }

            div {
              background-color: transparent;

              text-align: left;
              font-size: 2vh;
              color: white;

              transform-origin: top;
              transition: transform .3s ease;
              /deep/ p {
                line-height: 200%;
                font-size: 2vh;
              }
            }
          }
          li+li {
            margin-top: 2vw;
          }
        }
      }
      .news_counter_section {
        grid-area: time;

        display: grid;
        grid-template-columns: 1fr 2fr 1fr;
        grid-template-rows: 1fr 2fr 1fr;
        grid-template-areas: ". decoration-top ."
          ". counter ."
          ". decoration-bottom .";
        justify-content: center;
        justify-items: center;
        align-items: center;

        width: 100%;

        z-index: 5;

        .news_decoration_top {
          grid-area: decoration-top;
          justify-self: flex-end;

          display: inline-block;
          width: 6vw;
          height: 6vw;
          //background-image: url("../assets/news/news_decoration_top.svg");
          background-repeat: no-repeat;
          background-size: 100% 100%;
        }

        .news_decoration_bottom {
          grid-area: decoration-bottom;
          justify-self: flex-start;

          display: inline-block;
          width: 6vw;
          height: 6vw;
          //background-image: url("../assets/news/news_decoration_bottom.svg");
          background-repeat: no-repeat;
          background-size: 100% 100%;
        }

        .news_counter {
          grid-area: counter;
          justify-self: center;
          align-self: center;

          display: grid;
          grid-template-columns: 1.2fr 1fr;
          grid-template-rows: 1fr 1fr;
          grid-template-areas: "number dot";
          background-image: url("../assets/countdown.svg");
          background-repeat: no-repeat;
          background-position: right bottom;
          background-size: 100% 100%;

          width: 20vw;
          height: 20vw;

          .news_countdown_number {
            grid-area: number;

            display: flex;
            flex-wrap: nowrap;
            justify-content: flex-end;
            align-items: flex-end;
            span {
              display: inline-block;
              width: 46.75%;
              height: 85%;
              background-size: 125% 125%;
              background-position: 50% 50%;
            }
          }

          .news_countdown_dot {
            grid-area: dot;

            display: flex;
            justify-items: flex-end;
            justify-content: flex-end;
            align-items: flex-end;
            span {
              width: 1vw;
              height: 1vw;
              margin: 0.8vw;
              margin-bottom: 5vw;
              background-repeat: no-repeat;
              background-size: 100% 100%;
            }
          }
        }
      }
    }

    .news_back {
      grid-area: select;

      display: flex;
      align-items: center;
      justify-items: flex-end;
      justify-content: flex-end;

      width: 100%;
      height: 100%;

      z-index: 5;

      .news_exit_button {
        grid-area: exit;
        align-self: flex-start;

        width: 6vw;
        height: 6vw;
        background-color: transparent;
        background-image: url("../assets/exit.svg");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        background-position: 50% 50%;

        margin: 3.5vw 4.2vw;

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
