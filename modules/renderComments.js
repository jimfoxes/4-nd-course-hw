import { comments } from './comments.js'
import { name, token } from './api.js'
import { initLikeListeners, initReplyListeners, } from './initCommentListeners.js'
import { renderLogin } from './renderLogin.js'
import { initAddCommentListener } from './initAddCommentListener.js'
export const renderComments = () => {
    const container = document.querySelector('.container')

    const commentsHtml = comments
        .map((comment, index) => {
            return `<li class="comment" data-index="${index}"> 
                <div class="comment-header"> 
                  <div>${comment.name}</div> 
                  <div>${comment.date}</div> 
                </div> 
                <div class="comment-body"> 
                  <div class="comment-text">${comment.text}</div> 
                </div> 
                <div class="comment-footer"> 
                  <div class="likes"> 
                    <span class="likes-counter">${comment.likes}</span> 
                    <button class="like-button ${comment.isLiked ? '-active-like' : ''} ${comment.isLikeLoading ? '-loading-like' : ''}" data-index="${index}"></button> 
                  </div> 
                </div>
              </li> `
        })
        .join('')

    const addCommentsHtml = `
    <div class="add-form">
      <input type="text" class="add-form-name" placeholder="Введите ваше имя" readonly value="${name}"/>
      <div class="error-message" id="name-error">Заполните это поле</div>
      <textarea type="textarea" class="add-form-text" placeholder="Введите ваш коментарий" rows="4"></textarea>
      <div class="error-message" id="comment-error">Заполните это поле</div>
      <div class="add-form-row">
        <button class="add-form-button">Написать</button>
        <div class="comment-posting">Добавляется...</div>
      </div>
    </div>`

    const linkToLoginText = `<p>чтобы отправить комментарий, <span
    class="link-login">войдите</span></p>`

    const baseHtml = `
    <ul class="comments">${commentsHtml}</ul>
    ${token ? addCommentsHtml : linkToLoginText}
    `

    container.innerHTML = baseHtml

    if (token) {
        initLikeListeners(renderComments)
        initReplyListeners()
        initAddCommentListener(renderComments)
    } else {
        document.querySelector('.link-login').addEventListener('click', () => {
            renderLogin()
        })
    }
}
