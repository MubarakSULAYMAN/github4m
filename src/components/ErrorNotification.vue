<template>
  <transition name="fly">
    <div :class="['warning', isError ? 'error-notif' : '']" v-if="isError">
      <p>
        <slot></slot>
      </p>
    </div>
  </transition>
</template>

<script>
import { mapState } from 'vuex';

export default {
  watch: {
    isError() {
      if (this.oldRoute === '/') {
        setTimeout(() => {
          this.$router.push('/').catch((err) => {
            if (err.name !== 'NavigationDuplicated') {
              console.log(err);
            }
          });
        }, 3500);
        // console.log(this.isError);
      } else if (this.errorMessage.includes('not exist')) {
        this.$router.push('/user/not-found');
      }
    },
  },

  computed: {
    ...mapState(['isError', 'oldRoute', 'username', 'errorMessage']),
  },
};
</script>

<style scoped>
.warning {
  position: fixed;
  bottom: 3rem;
  left: 4rem;
  display: inline-block;
  padding: 5px 10px;
  border: 1px solid red;
  border-radius: 5px;
  font-size: 20px;
  color: red;
  background-color: rgba(255, 255, 255, 0.8);
  box-shadow: 4px 4px red;
  transition: all 0.5s ease-in-out;
  z-index: 9999;
}

@supports (-webkit-backdrop-filter: none) or (backdrop-filter: none) {
  .warning {
    background-color: transparent;
    -webkit-backdrop-filter: blur(2px);
    backdrop-filter: blur(2px);
  }
}

.fly-enter {
  transform: scaleY(0) translate(-999px);
}

.fly-enter-active,
.fly-leave-active {
  transition: transform 0.5s ease-in-out;
}

.fly-leave-to {
  transform: scaleY(0) translate(-999px);
}

.warning:hover {
  transform: translate(4px, 4px);
  box-shadow: none;
}

.warning p {
  margin: 0;
}

.error-notif {
  animation: kf_shake 0.4s 1 linear;
  -webkit-animation: kf_shake 0.4s 1 linear;
  -moz-animation: kf_shake 0.4s 1 linear;
  -o-animation: kf_shake 0.4s 1 linear;
}

@keyframes kf_shake {
  0% {
    transform: translate(30px);
  }
  20% {
    transform: translate(-30px);
  }
  40% {
    transform: translate(15px);
  }
  60% {
    transform: translate(-15px);
  }
  80% {
    transform: translate(8px);
  }
  100% {
    transform: translate(0px);
  }
}

@-webkit-keyframes kf_shake {
  0% {
    -webkit-transform: translate(30px);
  }
  20% {
    -webkit-transform: translate(-30px);
  }
  40% {
    -webkit-transform: translate(15px);
  }
  60% {
    -webkit-transform: translate(-15px);
  }
  80% {
    -webkit-transform: translate(8px);
  }
  100% {
    -webkit-transform: translate(0px);
  }
}

@-moz-keyframes kf_shake {
  0% {
    -moz-transform: translate(30px);
  }
  20% {
    -moz-transform: translate(-30px);
  }
  40% {
    -moz-transform: translate(15px);
  }
  60% {
    -moz-transform: translate(-15px);
  }
  80% {
    -moz-transform: translate(8px);
  }
  100% {
    -moz-transform: translate(0px);
  }
}

@-o-keyframes kf_shake {
  0% {
    -o-transform: translate(30px);
  }
  20% {
    -o-transform: translate(-30px);
  }
  40% {
    -o-transform: translate(15px);
  }
  60% {
    -o-transform: translate(-15px);
  }
  80% {
    -o-transform: translate(8px);
  }
  100% {
    -o-origin-transform: translate(0px);
  }
}
</style>
