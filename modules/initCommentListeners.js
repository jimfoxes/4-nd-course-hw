import { comments } from './comments.js'

export const initLikeListeners = (renderComments) => {
    const likeButtons = document.querySelectorAll('.like-button')
    likeButtons.forEach((button) => {
        button.addEventListener('click', (event) => {
            event.stopPropagation()
            const index = button.dataset.index
            const currentComment = comments[index]
            if (currentComment.isLiked) {
                currentComment.likes--
            } else {
                currentComment.likes++
            }
            currentComment.isLiked = !currentComment.isLiked
            renderComments()
        })
    })
}

export const initReplyListeners = () => {
    const textInput = document.querySelector('.add-form-text')
    const commentsEllements = document.querySelectorAll('.comment')

    commentsEllements.forEach((commentElement) => {
        commentElement.addEventListener('click', () => {
            const currentComment = comments[commentElement.dataset.index]
            textInput.value = `${currentComment.name}:\n «${currentComment.text}»\n `
            textInput.focus()
        })
    })
}
