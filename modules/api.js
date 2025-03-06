import { formatDate } from './formatDate.js'

const host = 'https://wedev-api.sky.pro/api/v2/dmitriy-usynin'
const authHost = 'https://wedev-api.sky.pro/api/user'

export let token = localStorage.getItem('token')

export const setToken = (nameStorage, newToken) => {
    localStorage.setItem(nameStorage, newToken)
    token = localStorage.getItem('token')
}

export const clearToken = () => {
    token = ''
}

export let name = localStorage.getItem('name')

export const setName = (nameStorage, newName) => {
    localStorage.setItem(nameStorage, newName)
    name = localStorage.getItem('name')
}

export const fetchComments = () => {
    return fetch(host + '/comments')
        .then((res) => {
            if (res.status === 500) {
                throw new Error('Ошибка сервера')
            }
            if (res.status === 200) {
                return res.json()
            }
        })
        .then((responseData) => {
            const appComments = responseData.comments.map((comment) => {
                return {
                    name: comment.author.name,
                    date: formatDate(new Date(comment.date)),
                    text: comment.text,
                    likes: comment.likes,
                    isLiked: false,
                }
            })

            return appComments
        })
}

export const postComment = (text, name) => {
    return fetch(host + '/comments', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            text,
            name,
        }),
    }).then((response) => {
        if (response.status === 500) {
            throw new Error('Ошибка сервера')
        }
        if (response.status === 400) {
            throw new Error('Неверный запрос')
        }
        if (response.status === 200) {
            return response.json()
        }
    }).then(() => {
        return fetchComments()
    })
}

export const login = (login, password) => {
    return fetch(authHost + '/login', {
        method: 'POST',
        body: JSON.stringify({
            login: login,
            password: password,
        }),
    })
}

export const registration = (name, login, password) => {
    return fetch(authHost, {
        method: 'POST',
        body: JSON.stringify({
            name: name,
            login: login,
            password: password,
        }),
    })
}
