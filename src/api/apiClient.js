import mockApi from './mockApi'
import realApi from './realApi'

const exportedApi = whichApiIsUsed() ? mockApi : realApi

function whichApiIsUsed() {
  if (window.location.href.indexOf('useMockApi') !== -1)
    return true
  else
    return false
}

export default exportedApi
