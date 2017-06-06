let _data = null

const mockApi = {
  loadSenetences: function() {
    return {
      then: function(cb) {
        setTimeout(() => {
          console.log('mockApi')
          _data = JSON.parse(localStorage.sentences || '[]', (k, v) => {
            if (k === 'createdAt') {
              return new Date(v)
            } else {
              return v
            }
          })
          cb(_data)
        }, 1000)
      }
    }
  },

  saveSentence: function(sentence) {
    let success = true;
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!success) return reject({ success })
        _data.push(sentence)
        localStorage.sentences = JSON.stringify(_data)
        return resolve({ success })
      }, 1000)
    })
  }
}

export default mockApi
