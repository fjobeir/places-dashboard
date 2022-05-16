import { useContext } from "react"
import { AuthContext } from "context/AuthContext"

export const useRequest = (url, headers, body, config = {}, method = 'GET') => {
    const ctx = useContext(AuthContext)
    const options = {}
    options.method = method
    if (config?.auth) {
        options.headers.Authorization = 'Bearer ' + ctx.token
    }
    if (config.type === 'json') {
        options.headers['Content-Type'] = 'application/json'
        options.body = JSON.stringify(body)
    }
    
    options.headers = {...options.headers, ...headers}

    return fetch(url, options)
        .then(response => {
            return response.json().then(data => {
                return data
            })
        })
        .catch(e => console.log(e))
}
