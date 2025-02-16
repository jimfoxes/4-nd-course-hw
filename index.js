import { renderComments } from './modules/renderComments.js'
import { initAddCommentListener } from './modules/initAddCommentListener.js'
import { fetchComments } from './modules/api.js'
import { updateComments } from './modules/comments.js'

document.querySelector('.comments').innerHTML =
    'Пожалуйста подождите, загружаю комментарии...'
const fetchCommentWithRetry = (retries = 3) => {
    fetchComments()
        .then((data) => {
            updateComments(data)
            renderComments()
        })
        .catch((error) => {
            if (error.message === 'Failed to fetch') {
                alert('Нет интернета, попробуйте снова')
            }

            if (error.message === 'Ошибка сервера' && retries > 0) {
                console.log(
                    `Ошибка 500. Повторная попытка... Осталось попыток: ${retries}`
                )

                setTimeout(() => {
                    postCommentWithRetry(text, name, retries - 1)
                }, 1000)
            } else if (error.message === 'Ошибка сервера' && retries === 0) {
                alert('Ошибка при отправке комментария: Ошибка сервера')
            }
        })
}
fetchCommentWithRetry()

initAddCommentListener(renderComments)
