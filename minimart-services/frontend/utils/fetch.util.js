// https://jasonwatmore.com/post/2021/04/20/next-js-10-crud-example-with-react-hook-form#fetch-wrapper-js

export const fetchUtils = {
  get,
  post,
  put,
  delete: _delete,
}

function get(url) {
  const requestOptions = {
    method: 'GET',
  }
  return fetch(url, requestOptions).then(handleResponse)
}

function post(url, body) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }
  return fetch(url, requestOptions).then(handleResponse)
}

function put(url, body) {
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }
  return fetch(url, requestOptions).then(handleResponse)
}

function _delete(url) {
  const requestOptions = {
    method: 'DELETE',
  }
  return fetch(url, requestOptions).then(handleResponse)
}

function parseJSON(response) {
  return new Promise((resolve) =>
    response.json().then((json) =>
      resolve({
        status: response.status,
        ok: response.ok,
        json,
      })
    )
  )
}

function handleResponse(response) {
  console.log(response)
  return new Promise(async (resolve, reject) => {
    return parseJSON(response)
      .then((response) => {
        if (response.ok) {
          return resolve(response.json)
        }
        return reject(response.json)
      })
      .catch((error) => {
        reject({
          networkError: error.message,
        })
      })
  })
}
