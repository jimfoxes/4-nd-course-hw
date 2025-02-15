import { updateComments } from './comments.js'
import { sanitizeHtml } from './sanitizeHtml.js'
import { postComment } from './api.js'
export const initAddCommentListener = (renderComments) => {
    const nameInput = document.querySelector('.add-form-name')
    const textInput = document.querySelector('.add-form-text')
    const btnEl = document.querySelector('.add-form-button')

    btnEl.addEventListener('click', () => {
        const name = nameInput.value.trim()
        const text = textInput.value.trim()
        const nameError = document.getElementById('name-error')
        const commentError = document.getElementById('comment-error')
        let isValid = true

        function validate(valueInput, input, errorText) {
            const hasError = !valueInput
            input.classList.toggle('error', hasError)
            errorText.style.display = hasError ? 'block' : 'none'
            return (isValid = hasError ? false : true)
        }

        let isValidName = validate(name, nameInput, nameError)
        let isValidText = validate(text, textInput, commentError)

        if (isValidName && isValidText) {
            btnEl.style.display = 'none'
            document.querySelector('.comment-posting').style.display = 'block'
            nameInput.disabled = true
            textInput.disabled = true
            const postCommentWithRetry = (text, name, retries = 3) => {
                postComment(sanitizeHtml(text), sanitizeHtml(name))
                    .then((data) => {
                        updateComments(data)

                        renderComments()
                        btnEl.style.display = 'flex'
                        document.querySelector(
                            '.comment-posting'
                        ).style.display = 'none'
                        nameInput.disabled = false
                        textInput.disabled = false
                        nameInput.value = ''
                        textInput.value = ''
                    })
                    .catch((error) => {
                        btnEl.style.display = 'flex'
                        document.querySelector('.comment-posting').style.display = 'none'
                        nameInput.disabled = false
                        textInput.disabled = false

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
                        } else {
                            alert('Ошибка при отправке комментария: Ошибка сервера')
                        }

                        if (error.message === 'Неверный запрос') {
                            alert(
                                'Имя и комментарий должны быть не менее трёх символов'
                            )

                            nameInput.classList.add('error')
                            textInput.classList.add('error')

                            setTimeout(() => {
                                nameInput.classList.remove('error')
                                textInput.classList.remove('error')
                            }, 2000)
                        }
                    })
            }
            postCommentWithRetry(text, name)
        }
    })
}
