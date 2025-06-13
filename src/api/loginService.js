import axios from 'axios'

export const getTokenService = async () => {
  return axios.post('https://djys.dajvision.com/djys/user/phoneLogin', {
    "phoneNo": "18119921782",
    "verificationCode": "147258"
  })
}