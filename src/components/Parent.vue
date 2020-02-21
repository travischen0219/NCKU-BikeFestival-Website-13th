<template lang="pug">
  div(class="parent_page")
    div(class="parent_background")
    div(class="parent_title")
    div(class="parent_layout")
      section(v-show="currentIndex !== -1" class="parent_article_section")
        article(id="article")
        div(class="parent_article_scrollbar")
          span
        button(v-show="currentIndex !== -1 && clientWidth < 552" class="parent_return_list_button" v-on:click="returnChoose") 返回列表
      section(class="parent_menu_section")
        div(v-show="type === -1" class="parent_type")
          transition-group(tag="ul" name="list" appear)
            li(v-for="(type, index) in typeEText" v-bind:key="type + index" v-bind:data-text="typeCText[index]" v-on:click="clickType(index)" v-bind:style="{'backgroundImage': 'url(' + require(`../assets/parent/type_${index + 1}.svg`) + ')'}")
        section(v-show="(type !== -1 && clientWidth > 551) || (type !== -1 && currentIndex === -1 && clientWidth < 552)" class="parent_articles_list_section")
          div(class="parent_filter")
            button(id="time_re-arrange" v-on:click="arrangeList(0)") 由新到舊
            button(id="hot_re-arrange" v-on:click="arrangeList(1)") 熱門程度
            label
          div(v-show="showArticlesList" class="parent_articles_list")
            transition-group(tag="ul" name="list")
              li(v-for="(iter, index) in rearrangeArticles" v-bind:key="`${index} - ${iter.Title}`" v-on:click="clickArticle(index)" v-bind:class="{activeArticle: index === currentIndex}")
                section
                  p {{iter.Title}}
                  label {{iter.Count}}
          button(v-if="type !== -1 && clientWidth < 552" class="parent_return_type_button" v-on:click="returnChoose") 返回列表
      section(class="parent_back")
        div(v-show="type !== -1" id="type-title" class="parent_type_title")
        button(v-show="type !== -1 && clientWidth > 551" class="parent_return_button" v-on:click="returnChoose")
        router-link(tag="button" to="/" class="parent_exit_button")
</template>

<script>
import axios from 'axios'

export default {
  name: 'ParentPage',
  data: function () {
    return {
      type: -1,
      arrangeType: 0,
      currentIndex: -1,
      typeEText: ['exam', 'institution', 'relationship', 'health', 'future'],
      typeCText: ['考試資訊', '制度變動', '親子關係', '孩子健康', '未來趨勢'],
      allArticles: {
        exam: [],
        institution: [],
        relationship: [],
        health: [],
        future: []
      },
      tempArticles: [],
      loader: null,
      currentCount: [],
      showArticlesList: false
    }
  },
  computed: {
    rearrangeArticles: function () {
      if (this.arrangeType === 0) {
        return this.tempArticles.slice(0).sort((a, b) => b.Timestamp._seconds - a.Timestamp._seconds)
      }
      return this.tempArticles.slice(0).sort((a, b) => b.Count - a.Count)
    },
    clientWidth: function () {
      return document.body.clientWidth
    }
  },
  mounted: async function () {
    this.loader = this.$loading.show()
    for (let index of [...Array(5).keys()]) {
      try {
        // fetch the articles from database
        const url = `https://us-central1-ncku-bikefestival-12th.cloudfunctions.net/getParentArticles?type=${index}`
        const result = await axios.get(url)
        this.allArticles[this.typeEText[index]] = result.data
      } catch (error) {
        console.log(error)
      }
    }
    this.loader.hide()
  },
  methods: {
    clickType: async function (index) {
      this.type = index
      // display the first articles at left side and replace text at right side
      const target = document.querySelector('#type-title')
      const targetImage = require(`../assets/parent/type_${index + 1}.svg`)
      target.style.setProperty('background-image', `url(${targetImage})`)
      // set tempArticles
      this.tempArticles = this.allArticles[this.typeEText[index]]
      this.showArticlesList = true
    },
    clickArticle: async function (index) {
      const oldNode = document.querySelector('#article')
      // clone a new node from old node.
      const newNode = oldNode.cloneNode(false)
      newNode.innerHTML = this.rearrangeArticles[index].Content
      // replace the old node with new node.
      oldNode.parentNode.replaceChild(newNode, oldNode)
      // refresh scrollbar
      this.scrollbarRefresh()
      // update current index
      this.currentIndex = index
      // add Count of the article
      if (!this.currentCount.find(target => target === this.rearrangeArticles[index].Id)) {
        const url = `https://us-central1-ncku-bikefestival-12th.cloudfunctions.net/addArticleCount?id=${this.rearrangeArticles[index].Id}`
        axios.get(url)
        this.currentCount.push(this.rearrangeArticles[index].Id)
        this.rearrangeArticles[index].Count = this.rearrangeArticles[index].Count + 1
      }
    },
    returnChoose: function () {
      if (this.currentIndex !== -1 && document.body.clientWidth < 552) {
        this.currentIndex = -1
        return
      }
      this.type = -1
      this.tempArticles = []
      // remove article content
      const oldNode = document.querySelector('#article')
      // clone a new node from old node.
      const newNode = oldNode.cloneNode(false)
      newNode.innerHTML = ''
      // replace the old node with new node.
      oldNode.parentNode.replaceChild(newNode, oldNode)
      // hide scrollbar
      const scrollbar = document.querySelector('.parent_article_scrollbar')
      scrollbar.style.setProperty('display', 'none')
      this.currentIndex = -1
    },
    arrangeList: function (value) {
      this.arrangeType = value
      if (document.body.clientWidth < 552) {
        return
      }
      // update currentIndex
      const targetContent = this.$el.querySelector('#article').textContent
      const target = this.rearrangeArticles.find(target => {
        const article = document.createElement('article')
        article.innerHTML = target.Content
        return article.textContent === targetContent
      })
      this.currentIndex = this.rearrangeArticles.indexOf(target)
    },
    scrollbarRefresh: function () {
      if (document.body.clientWidth < 552) {
        return
      }
      const target = document.querySelector('#article')
      const scrollbar = document.querySelector('.parent_article_scrollbar')
      const thumb = document.querySelector('.parent_article_scrollbar span')
      const articleHeight = target.clientHeight
      const viewportRatio = articleHeight / target.scrollHeight
      // reset scrollbar thumbs
      thumb.style.setProperty('transform', `translateY(0px) skewX(7.5deg)`)
      target.scrollTop = 0
      if (viewportRatio < 0.9357615262321145) {
        scrollbar.style.setProperty('display', 'block')
        let _prerventEvent = false
        // config scroll event
        target.addEventListener('scroll', function () {
          if (_prerventEvent) {
            return
          }
          const newPercent = Math.min(1, (target.scrollTop / (target.scrollHeight - articleHeight - 40)))
          const currentPosition = Math.floor(articleHeight * newPercent * (articleHeight - 70) / articleHeight)
          thumb.style.setProperty('transform', `translateY(${Math.floor(currentPosition)}px) skewX(7.5deg)`)
        })
        // config scrollbar thumbs drag event
        thumb.addEventListener('mousedown', function (event) {
          event.preventDefault()
          event.stopPropagation()
          _prerventEvent = true
          const previousY = event.pageY
          const percent = (target.scrollTop / (target.scrollHeight - articleHeight - 40))
          const moveMoveEvent = function (event) {
            const dif = event.pageY - previousY
            const newPercent = Math.min(1, Math.max(percent + dif / (articleHeight), 0))
            const currentPosition = Math.floor(1 / Math.sin(82.5 / 180 * Math.PI) * articleHeight * newPercent * (articleHeight - 70) / articleHeight)
            target.scrollTop = newPercent * (target.scrollHeight - articleHeight)
            thumb.style.setProperty('transform', `translateY(${Math.floor(currentPosition)}px) skewX(7.5deg)`)
          }
          document.addEventListener('mousemove', moveMoveEvent)
          const mouseUpEvent = function () {
            _prerventEvent = false
            document.removeEventListener('mousemove', moveMoveEvent)
            document.removeEventListener('mouseup', mouseUpEvent)
          }
          document.addEventListener('mouseup', mouseUpEvent)
        })
      } else {
        scrollbar.style.setProperty('display', 'none')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .list {
    backface-visibility: hidden;
  }
  .list-enter-active,
  .list-leave-active,
  .list-move {
    transition: .3s ease-in-out !important;
    transition-property: opacity, transform !important;
    transform-origin: right center !important;
  }

  .list-enter {
    opacity: 0 !important;
    transform: translateX(2.5vw) scaleY(0.5) !important;
  }

  .list-enter-active {
    transition-delay: .3s !important;
  }

  .list-enter-to {
    opacity: 1 !important;
    transform: translateX(0) scaleY(1) !important;
  }

  .list-leave-to {
    opacity: 0 !important;
    transform: translateX(-2.5vw) scaleY(0.5) !important;
  }

  @-moz-document url-prefix() {
    #article {
      scrollbar-width: none;
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
    .parent_page {
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      height: 100vh;
      width: 100vw;
      margin: 0;
      padding: 0;

      background-color: #F8F6E8;

    }

    .parent_background {
      display: none;
    }

    .parent_layout {
      display: grid;
      grid-template-columns: 100vw;
      grid-template-rows: 45vw 1fr;
      grid-template-areas: "select"
        "main";
      align-items: center;
      justify-content: center;
      justify-items: center;

      width: 100vw;
      height: 100vh;
    }

    .parent_title {
      position: absolute;
      z-index: 20;
      left: 18vw;
      top: 6vh;

      width:  64vw;
      height: 30vw;
      background-image: url("../assets/parent/parent_title.svg");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      background-position: 50% 50%;
    }

    .parent_article_section {
      grid-area: main;
      align-self: flex-end;

      display: flex;
      flex-wrap: wrap;
      justify-items: center;
      justify-content: center;
      align-content: space-between;
      align-items: space-between;

      width: 100vw;
      height: 75vh;
      background-image: url("../assets/parent/parent_background.svg");
      background-repeat: no-repeat;
      background-size: 34vw 30vw;
      background-position: 50% 50%;

      overflow: hidden;

      article {
        width: 100%;
        height: 83%;

        margin: 0 5vw;

        font-size: 1.5em;
        text-align: left;
        color: #DD4A43;
        overflow-y: scroll;
        overflow-x: hidden;
        &::-webkit-scrollbar {
          width: 0px;
          background: transparent;
        }
        & /deep/ img {
          max-width: 90vw;
          width: 90vw;
          object-fit: cover;
        }
        & /deep/ a {
          color: #1E556D;
          text-decoration: none;
        }
        & /deep/ p a {
          color: #1E556D;
          text-decoration: none;
        }
      }

      .parent_article_scrollbar {
        display: none;
      }

      .parent_return_list_button {
        width: 90%;
        height: 12vw;
        background-color: #DD4A43;

        margin: 5vw;

        color: white;
        font-size: 5vw;

        outline: none;
        border: none;
        border-radius: 2vw;

        cursor: pointer;

        transition: filter .3s ease;

        &:hover {
          filter: brightness(130%);
        }
        &:active {
          filter: brightness(80%);
        }
      }
    }

    .parent_menu_section {
      grid-area: main;

      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      justify-items: center;
      align-items: center;

      overflow: hidden;

      .parent_type {
        display: inline-block;

        width: 66%;
        margin: 0;
        padding: 0;
        ul {
          list-style-type: none;
          margin: 0;
          padding: 0;
          width: 100%;
          height: 100%;

          li {
            float: left;
            width: 60vw;
            height: 15vw;
            margin: 3vw;
            background-image: none !important;
            background-color: #DD4A43;
            background-repeat: no-repeat;
            background-size: 100% 100%;
            background-position: 50% 50%;

            color: white;

            cursor: pointer;

            transform: skewX(-5deg);
            transition: filter .3s ease;

            &:after {
              display: block;
              content: attr(data-text);

              font-size: 6vw;
              margin: 4vw;

              transform: skewX(5deg);

            }
            &:hover {
              filter: brightness(150%);
            }
            &:active {
              filter: brightness(70%);
            }

          }
        }
      }

      .parent_articles_list_section {
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;

        .parent_filter {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          grid-template-areas: "time hot icon";
          grid-gap: 3vw;

          margin: 1.5vw 6vw;
          button {
            width: 100%;
            height: 10vw;

            box-sizing: border-box;

            background-color: #DD4A43;

            outline: none;
            border: none;
            border-radius: 2vw;

            color: white;
            font-size: 4.5vw;

            cursor: pointer;

            transition: filter .3s ease;

            &:hover {
              filter: brightness(150%);
            }
            &:active {
              filter: brightness(70%);
            }

          }

          label {
            grid-area: icon;
            justify-self: flex-end;

            width: 10vw;
            height: 10vw;

            background-image: url("../assets/parent/visit.svg");
            background-repeat: no-repeat;
            background-size: 100% 100%;
            background-position: 50% 50%;
          }
        }

        .parent_articles_list {
          display: flex;
          flex-wrap: wrap;
          align-content: space-between;

          height: 55vh;
          ul {
            list-style-type: none;
            margin: 0;
            padding: 0;

            li {
              margin: 3vw 8vw;
              padding: 0 2vw;

              font-size: 6vw;
              color: #DD4A43;
              text-align: left;

              cursor: pointer;

              border-left: 0px solid #DD4A43;

              transition: filter .3s ease, border-left-width .2s ease;
              transform-origin: left;

              &:hover {
                filter: brightness(150%);
                border-left-width: 1vw;
              }
              &:active {
                filter: brightness(70%);
              }

              section {
                display: grid;
                grid-template-columns: 4fr 1fr;
                grid-template-areas: "article-title number";
                justify-content: flex-start;
                justify-items: flex-start;
                align-items: center;

                p {
                  display: inline-block;

                  margin: 0;
                  padding: 0;

                  text-align: left;
                }
                label {
                  justify-self: flex-end;
                }
              }
            }
          }
        }

        .parent_return_type_button {
          width: 90%;
          height: 12vw;
          background-color: #DD4A43;

          margin: 5vw;

          color: white;
          font-size: 5vw;

          outline: none;
          border: none;
          border-radius: 2vw;

          cursor: pointer;

          transition: filter .3s ease;

          &:hover {
            filter: brightness(130%);
          }
          &:active {
            filter: brightness(80%);
          }
        }

      }

    }

    .parent_back {
      grid-area: select;

      display: grid;
      grid-template-columns: 2fr 1fr;
      grid-template-rows: 1fr 1fr;
      grid-template-areas: "type-title exit"
        "type-title type-back ";
      align-items: flex-start;
      justify-items: flex-end;
      justify-content: flex-end;

      width: 100%;
      height: 100%;

      .parent_type_title {
        display: none;
      }

      .parent_exit_button {
        grid-area: exit;

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
    .parent_page {
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

    .parent_background {
      position: absolute;
      z-index: 1;
      top: 0;
      left: -10vw;
      background: #F8F6E8;
      height: 100vh;
      width: 75vw;
      transform: skewX(-5deg);
      pointer-events: none;
    }

    .parent_layout {
      display: grid;
      grid-template-columns: 2fr 1fr;
      grid-template-rows: 1fr 66vh 1fr;
      grid-template-areas: "title select"
        "article menu"
        "article .";
      align-items: center;
      justify-items: center;

      width: 100vw;
      height: 100vh;

    }

    .parent_title {
      position: absolute;
      z-index: 20;
      left: 10vw;
      top: 8vh;

      width: 17vw;
      height: 8vw;
      background-image: url("../assets/parent/parent_title.svg");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      background-position: 50% 50%;
    }

    .parent_article_section {
      grid-area: article;

      width: 45vw;
      height: 66vh;
      background-image: url("../assets/parent/parent_background.svg");
      background-repeat: no-repeat;
      background-size: 34vw 30vw;
      background-position: 50% 57%;

      overflow: hidden;

      z-index: 5;

      article {
        width: 45vw;
        height: 66vh;

        font-size: 1.2vw;
        line-height: 130%;
        text-align: left;
        color: #DD4A43;
        overflow-y: scroll;
        overflow-x: hidden;
        &::-webkit-scrollbar {
          width: 0px;
          background: transparent;
        }

        & /deep/ a {
          color: #1E556D !important;
        }
        & /deep/ p a {
          color: #1E556D !important;
        }
      }

      .parent_article_scrollbar {
        position: fixed;
        display: none;
        background-color: #e3dfc1;
        border-radius: 5px;
        color: #DD4A43;
        font-size: 1.5em;
        line-height: 1.2em;
        top: 26%;
        left: 60%;
        z-index: 510;
        width: 10px;
        height: 66vh;
        margin-left: 20px;
        transform: skewX(-5deg);

        span {
          position: absolute;
          left: -2.6vw;
          width: 3.6vw;
          height: 3.6vw;
          background-image: url("../assets/scrollbarThumb.svg");
          background-repeat: no-repeat;
          background-position: 50% 40%;
          background-size: 60%;
          transform: skewX(7.5deg);
          cursor: pointer;
          z-index: 510;
        }
      }
    }

    .parent_menu_section {
      grid-area: menu;

      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      justify-items: center;
      align-items: center;

      overflow: hidden;

      .parent_type {
        display: inline-block;

        margin: 0;
        padding: 0;
        ul {
          list-style-type: none;
          margin: 0;
          padding: 0;
          width: 85%;
          height: 100%;

          li {
            display: inline-block;
            width: 17vw;
            height: 5vw;
            margin: 0.2vw;
            background-repeat: no-repeat;
            background-size: 100% 100%;
            background-position: 50% 50%;

            cursor: pointer;

            transition: filter .3s ease;
            &:hover {
              filter: brightness(150%);
            }
            &:active {
              filter: brightness(70%);
            }
          }
        }
      }

      .parent_articles_list_section {
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;

        .parent_filter {
          display: grid;
          grid-template-columns: 1fr 1fr 2fr;
          grid-template-areas: "time hot icon";
          grid-gap: 1vw;

          margin: 1.5vw 3vw;
          button {
            width: 100%;
            height: 2.5vw;

            background-color: #DD4A43;

            outline: none;
            border: none;
            border-radius: .8vw;

            color: white;
            font-size: 1.1vw;

            cursor: pointer;

            transition: filter .3s ease;

            &:hover {
              filter: brightness(150%);
            }
            &:active {
              filter: brightness(70%);
            }

          }

          label {
            grid-area: icon;
            justify-self: flex-end;

            width: 2.5vw;
            height: 2.5vw;

            background-image: url("../assets/parent/visit.svg");
            background-repeat: no-repeat;
            background-size: 100% 100%;
            background-position: 50% 50%;
          }
        }

        .parent_articles_list {
          ul {
            list-style-type: none;
            margin: 0;
            padding: 0;

            li {
              margin: 1vw 3vw;
              margin-right: 4vw;
              padding: 0;
              padding-left: 12px;

              font-size: 1.5vw;
              color: #DD4A43;
              text-align: left;

              cursor: pointer;

              border-left: 0px solid #DD4A43;

              transition: filter .3s ease, border-left-width .2s ease;
              transform-origin: left;

              &:hover {
                filter: brightness(150%);
                border-left-width: .4vw;
              }
              &:active {
                filter: brightness(70%);
              }

              section {
                display: grid;
                grid-template-columns: 4fr 1fr;
                grid-template-areas: "article-title number";
                justify-content: flex-start;
                justify-items: flex-start;
                align-items: center;

                p {
                  display: inline-block;

                  margin: 0;
                  padding: 0;

                  text-align: left;
                }
                label {
                  justify-self: flex-end;
                }
              }
            }
          }
        }
      }

    }

    .parent_back {
      grid-area: select;

      display: grid;
      grid-template-columns: 2fr 1fr 1fr;
      grid-template-rows: 1fr;
      grid-template-areas: "type-title type-back exit";
      align-items: center;
      justify-items: center;
      justify-content: center;

      width: 90%;
      height: 100%;

      .parent_type_title {
        grid-area: type-title;

        width: 17vw;
        height: 5vw;
        margin: 1vw;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        background-position: 50% 50%;
      }

      .parent_return_button {
        grid-area: type-back;

        width: 2.5vw;
        height: 2.5vw;
        background-color: transparent;
        background-image: url("../assets/return.svg");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        background-position: 50% 50%;

        outline: none;
        border: none;

        cursor: pointer;

        transition: filter .3s ease;

        &:hover {
          filter: brightness(110%);
        }
        &:active {
          filter: brightness(80%);
        }
      }

      .parent_exit_button {
        grid-area: exit;

        width: 6vw;
        height: 6vw;
        background-color: transparent;
        background-image: url("../assets/exit.svg");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        background-position: 50% 50%;

        outline: none;
        border: none;

        cursor: pointer;

        transition: filter .3s ease;

        &:hover {
          filter: brightness(110%);
        }
        &:active {
          filter: brightness(80%);
        }
      }
    }

    .activeArticle {
      border-left: .4vw solid #DD4A43 !important;
    }
  }

</style>
