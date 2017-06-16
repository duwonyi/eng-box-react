const baseUrl = 'http://localhost:3001/api'

const realApi = {
  loadSenetences: function() {
    return get('/sentences')
  },

  saveSentence: function(sentence) {
    return post('/sentences', sentence)
  },

  getSources: function(source) {
    return get('/sources')
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
