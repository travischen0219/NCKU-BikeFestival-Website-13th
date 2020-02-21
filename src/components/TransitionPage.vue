<template lang="pug">
  transition(
    v-bind:name="transitionName"
    v-bind:mode="transitionMode"
    v-bind:enter-active-class="transitionEnterActiveClass"
    v-bind:beforeLeave="beforeLeave"
    v-bind:enter="enter"
    v-bind:afterEnter="afterEnter")
    slot
</template>

<script>
const DEFAULT_TRANSITION = 'fade'
const DEFAULT_TRANSITION_MODE = 'out-in'

export default {
  name: 'TransitionPage',
  data: function () {
    return {
      prevHeight: 0,
      transitionName: DEFAULT_TRANSITION,
      transitionMode: DEFAULT_TRANSITION_MODE,
      transitionEnterActiveClass: ''
    }
  },
  created: function () {
    this.$router.beforeEach((to, from, next) => {
      let transitionName = to.meta.transitionName || from.meta.transitionName || DEFAULT_TRANSITION

      if (transitionName === 'slide') {
        const toDepth = to.path.split('/').filter(target => target !== '').length
        const fromDepth = from.path.split('/').filter(target => target !== '').length
        transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
      }

      this.transitionMode = DEFAULT_TRANSITION_MODE
      this.transitionEnterActiveClass = `${transitionName}-enter-active`

      if (to.meta.transitionName === 'zoom') {
        this.transitionMode = 'in-out'
        this.transitionEnterActiveClass = 'zoom-enter-active'
        document.body.style.overflow = 'hidden'
      }

      if (from.meta.transitionName === 'zoom') {
        this.transitionMode = null
        this.transitionEnterActiveClass = null
        document.body.style.overflow = null
      }

      this.transitionName = transitionName

      next()
    })
  },
  methods: {
    beforeLeave: function (element) {
      this.prevHeight = getComputedStyle(element).height
    },
    enter: function (element) {
      const { height } = getComputedStyle(element)

      element.style.height = this.prevHeight

      setTimeout(function () {
        element.style.height = height
      })
    },
    afterEnter: function (element) {
      element.style.height = 'auto'
    }
  }
}
</script>

<style scoped lang="scss">
  @keyframes zoom {
    from {
      opacity: 0;
      transform: scale3d(.3, .3, .3);
    }

    100% {
      opacity: 1;
      transform: scale3d(1, 1, 1);
    }
  }

  .fade-enter-active,
  .fade-leave-active {
    transition-duration: 0.3s;
    transition-property: height, opacity;
    transition-timing-function: ease;
    overflow: hidden;
  }

  .fade-enter,
  .fade-leave-active {
    opacity: 0
  }

  .slide-left-enter-active,
  .slide-left-leave-active,
  .slide-right-enter-active,
  .slide-right-leave-active {
    transition-duration: .5s;
    transition-property: opacity, transform;
    transition-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55);;
    overflow: hidden;
    will-change: transform, opacity;
  }

  .slide-left-enter,
  .slide-right-leave-active {
    opacity: 0;
    transform: translate(3vw, 0) translateZ(0);
  }

  .slide-left-leave-active,
  .slide-right-enter {
    opacity: 0;
    transform: translate(-3vw, 0) translateZ(0);
  }

  .zoom-enter-active,
  .zoom-leave-active {
    animation-duration: .4s;
    animation-fill-mode: both;
    animation-name: zoom;
  }

  .zoom-leave-active {
    animation-direction: reverse;
  }

</style>
