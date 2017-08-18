const baseUrl = `http://${process.env.REACT_APP_API_SERVER}/api`

const realApi = {
  loadSenetences: function() {
    return get('/sentences', true)
  },

  saveSentence: function(sentence) {
    return post('/sentences', sentence, true)
  },

  getSources: function(type) {
    if (type) {
      return get(`/sources/types/${type}`, true)
    } else {
      return get('/sources', true)
    }
  },

  saveSource: function(source) {
    return post('/sources', source, true)
  },

  signin: function(creds) {
    return post('/signin', creds, false)
  },
  signup: function(newUser) {
    return post('/users', newUser, false)
  }
}

function get(url, isNeedToken) {
  let config = {
    accept: 'application/json',
  }
  if (isNeedToken) {
    config['headers'] = getTokenHeader()
  }
  return fetch(baseUrl + url, config)
    .then(onSuccess, onError)
}

function post(url, data, isNeedToken) {
  let headerConfig = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
  if (isNeedToken) {
    headerConfig['Authorization'] = `Bearer ${getToken()}`
  }
  const request = new Request(baseUrl + url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: new Headers(headerConfig)
  })
  return fetch(request)
    .then(handleErrors)
    .then(onSuccess, onError)
}

// https://www.tjvantoll.com/2015/09/13/fetch-and-errors/
// https://stackoverflow.com/questions/29473426/fetch-reject-promise-with-json-error-object
function handleErrors(response) {
  if (!response.ok) {
    return response.json().then(err => { throw err })
  }
  return response
}

function onSuccess(response) {
  return response.json()
    .then(convertStringToDate)
}

function onError(error) {
  console.log(error)
  throw error
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

const getTokenHeader = () => ({
    'Authorization': `Bearer ${getToken()}`
})

const getToken = () => localStorage.getItem('token') || null

export default realApi
