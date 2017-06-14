let _data = null

const sources = {
  book: [
    {
      _id: '1',
      title: 'Harry Potter and the Sorcerer\'s Stone',
      type: 'book',
      createdAt: new Date(),
    },
    {
      _id: '2',
      title: 'Perfect IELTS',
      type: 'book',
      createdAt: new Date(),
    },
  ],
  web: [
    {
      _id: '3',
      title: 'Google',
      type: 'web',
      createdAt: new Date(),
    },
    {
      _id: '4',
      title: 'Facebook',
      type: 'web',
      createdAt: new Date(),
    },
  ],
  video: [
    {
      _id: '5',
      title: 'Star Words',
      type: 'video',
      createdAt: new Date(),
    },
    {
      _id: '6',
      title: 'The Modern Family',
      type: 'video',
      createdAt: new Date(),
    },
  ],
  own: [
    {
      _id: '7',
      title: 'Talpi',
      type: 'own',
      createdAt: new Date(),
    },
    {
      _id: '8',
      title: 'IELTS',
      type: 'own',
      createdAt: new Date(),
    },
  ],
}

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
  },

  getSources: (sourceType) => (
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(sources[sourceType])
      }, 1000)
    })
  )
}

export default mockApi
