import { formatDate } from './formatDate.js'

const host = 'https://wedev-api.sky.pro/api/v1/dmitriy-usynin'
export const fetchComments = () => {
    return fetch(host + '/comments')
        .then((res) => {
            return res.json()
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
        body: JSON.stringify({
            text,
            name,
            forceError: true,
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

