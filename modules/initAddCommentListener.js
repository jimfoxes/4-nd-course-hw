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
            postComment(sanitizeHtml(text), sanitizeHtml(name)).then((data) => {
                updateComments(data)
                renderComments()
                nameInput.value = ''
                textInput.value = ''
            })
        }
    })
}
