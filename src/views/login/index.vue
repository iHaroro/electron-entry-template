<template>
  <div class="login-page">
    <div class="left-box"></div>
    <div class="right-box">
      <div class="logo-box">
        <img class="logo-icon" src="@/assets/images/login_logo.png" alt="云视船舶" />
      </div>
      <div class="title-box">
        <div class="title-box-title">欢迎登录</div>
        <div class="title-box-desc">云视船舶—智慧船舶可视化平台</div>
      </div>

      <div class="form-box">
        <div class="input-box">
          <div class="input-left-box">
            <span>中国大陆（+86）</span>
            <!--<img src="@/assets/images/login_select_down_icon.png" alt="" />-->
          </div>
          <input
            v-model="formState.phoneNo"
            class="input-box-input"
            type="text"
            placeholder="手机号"
            maxlength="11"
          />
        </div>
        <div class="input-box">
          <input
            v-model="formState.verificationCode"
            class="input-box-input"
            type="text"
            placeholder="验证码"
            maxlength="10"
            @keyup.enter="loginHandler"
          />
          <a-button
            v-if="countDownTime === 0"
            class="input-right-box"
            :loading="sendValidateLoading"
            @click="sendVerificationCode"
          >
            获取验证码
          </a-button>
          <div v-else class="input-right-box disabled">{{ countDownTime }}s</div>
        </div>
        <a-button
          :class="`login-btn ${loginBtnState && 'disabled'}`"
          :loading="loginLoading"
          @click="loginHandler"
        >
          登录
        </a-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'
import { phoneLogin, getPhoneCode } from '@/api/user'
import { setTokenToApplication } from '@/utils/userInfo.js'
import { handlerPromise } from '@/utils/utils.js'

defineOptions({ name: 'LoginPage' })

const router = useRouter()
const sendIntervalTime = 60
const countDownTime = ref(0)
const sendValidateLoading = ref(false)
const loginLoading = ref(false)
const formState = reactive({
  phoneNo: '',
  verificationCode: '',
})

/**
 * @function loginBtnState
 * @description 登录按钮是否禁用
 * @returns {boolean} 登录按钮是否禁用
 **/
const loginBtnState = computed(() => {
  return !formState.phoneNo || !formState.verificationCode
})

/**
 * @function sendVerificationCode
 * @description 发送验证码
 **/
const sendVerificationCode = async () => {
  const { phoneNo } = formState
  if (phoneNo) {
    sendValidateLoading.value = true
    const getPhoneCodeRes = await getPhoneCode({ phoneNo })
    console.log(getPhoneCodeRes)
    setTimeout(() => {
      sendValidateLoading.value = false
    }, 500)
    if (getPhoneCodeRes.code === '200') {
      countDownTime.value = sendIntervalTime
      countingDown()
    } else {
      message.warn(getPhoneCodeRes.message)
    }
  } else {
    message.warn('请输入手机号')
  }
}

const countingDown = () => {
  if (countDownTime.value <= 0) {
    return
  }
  setTimeout(() => {
    countDownTime.value--

    countingDown()
  }, 1000)
}

const loginHandler = async () => {
  const { phoneNo, verificationCode } = formState
  if (!phoneNo) {
    message.warn('请输入手机号')
  } else if (!verificationCode) {
    message.warn('请输入验证码')
  } else {
    loginLoading.value = true
    const [loginErr, loginRes] = await handlerPromise(phoneLogin({ phoneNo, verificationCode }))
    setTimeout(() => {
      loginLoading.value = false
    }, 500)
    console.log(loginErr, loginRes)
    if (loginErr) {
      loginLoading.value = false
      message.warn(loginErr.message)
    } else {
      if (loginRes.code === '200') {
        message.success('登录成功')
        setTokenToApplication(loginRes.data)
        router.replace('/')
      }
    }
  }
}
</script>

<style scoped lang="scss">
.login-page {
  box-sizing: border-box;
  display: flex;
  height: 100vh;
  background: linear-gradient(180deg, #000e26 0%, #00225e 66%, #002156 100%);

  .left-box {
    width: vw(1236);
    height: 100%;
    background-image: url('@/assets/images/login_bg.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }

  .right-box {
    padding-top: vh(150);
    flex: 1;

    .logo-box {
      text-align: center;

      .logo-icon {
        width: vh(120);
        height: vh(120);
      }
    }

    .title-box {
      display: flex;
      width: vw(500);
      height: vh(70);
      margin: vh(138) auto 0;
      background-image: url('@/assets/images/login_title_bar_bg.png');
      background-size: vw(501) vh(38);
      background-position: left bottom;
      background-repeat: no-repeat;

      .title-box-title {
        height: vh(45);
        margin-left: vw(20);
        font-weight: 500;
        font-size: vh(32);
        color: rgba(221, 240, 246, 1);
        line-height: vh(45);
        letter-spacing: vw(1);
      }

      .title-box-desc {
        height: vh(28);
        margin-top: vh(5);
        margin-left: vw(23);
        font-weight: 400;
        font-size: vh(20);
        color: rgba(0, 169, 255, 1);
        line-height: vh(28);
      }
    }

    .form-box {
      width: vw(500);
      margin: vh(64) auto;

      .input-box {
        display: flex;
        align-items: center;
        width: 100%;
        height: vh(50);
        padding: vh(12) vw(16);
        margin-bottom: vh(50);
        border: 1px solid;
        border-image: linear-gradient(
            325deg,
            rgba(0, 252, 238, 1),
            rgba(11, 213, 247, 1),
            rgba(16, 196, 251, 0),
            rgba(21, 176, 255, 1)
          )
          1 1;
        background: linear-gradient(
          117deg,
          rgba(0, 212, 255, 0) 0%,
          rgba(0, 168, 254, 0.14) 100%,
          rgba(0, 168, 254, 0.14) 100%
        );
        border-radius: 4px;

        .input-left-box {
          cursor: pointer;
          align-content: flex-start;
          display: flex;
          justify-content: center;
          align-items: center;
          width: vw(169);
          margin-right: vw(16);
          font-weight: 400;
          font-size: vh(18);
          color: rgba(221, 240, 246, 0.4);
          line-height: vh(26);
        }

        .input-name {
          align-content: flex-start;
          margin-right: vw(16);
          font-weight: 400;
          font-size: vh(18);
          color: rgba(221, 240, 246, 1);
          line-height: vh(26);
        }

        .input-right-box {
          cursor: pointer;
          border-radius: 0;
          align-content: flex-end;
          font-weight: 400;
          font-size: vh(18);
          color: rgba(221, 240, 246, 1);
          line-height: vh(26);
          background: transparent;
          border: 0;
        }

        .input-box-input {
          flex: 1;
          height: vh(26);
          font-weight: 400;
          font-size: vh(18);
          color: rgba(221, 240, 246, 1);
          line-height: vh(26);

          &::placeholder {
            color: rgba(221, 240, 246, 0.4);
          }
        }

        .disabled {
          color: rgba(221, 240, 246, 0.4) !important;
        }
      }

      .login-btn {
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        width: vw(500);
        height: vh(50);
        border-radius: 0;
        background: #00a9ff;
        font-weight: 500;
        font-size: vh(24);
        color: rgba(221, 240, 246, 1);
        line-height: vh(33);
        opacity: 1;
        transition: all 0.18s linear;

        &.disabled {
          background: rgba(0, 169, 255, 0.37);
          opacity: 0.59;
        }
      }
    }
  }
}
</style>
