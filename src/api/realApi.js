const baseUrl = `http://${process.env.REACT_APP_API_SERVER}/api`

const realApi = {
  loadSenetences: function() {
    return get('/sentences')
  },

  saveSentence: function(sentence) {
    return post('/sentences', sentence)
  },

  getSources: function(type) {
    if (type) {
      return get(`/sources/types/${type}`)
    } else {
      return get('/sources')
    }
  },

  saveSource: function(source) {
    return post('/sources', source)
  },

  signin: function(creds) {
    return post('/signin', creds)
  },
}

function get(url) {
  return fetch(baseUrl + url, { accept: 'application/json', })
    .then(onSuccess, onError)
}

function post(url, data) {
  const request = new Request(baseUrl + url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: new Headers({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    })
  })
  return fetch(request)
    .then(onSuccess, onError)
}

function onSuccess(response) {
  return response.json()
    .then(convertStringToDate)
}

function onError(error) {
  console.log(error)
}

function convertStringToDate(json) {
  if (Array.isArray(json)) {
    return json.map(v => {
      v['createdAt'] = new Date(v['createdAt'])
      return v
    })
  } else {
    return json
  }
}

export default realApi
