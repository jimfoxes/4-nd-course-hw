import { comments } from "./comments.js";
import { initLikeListeners, initReplyListeners } from "./initCommentListeners.js";
export const renderComments = () => {
    const commentsList = document.querySelector('.comments')

    commentsList.innerHTML = comments
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

        initLikeListeners(renderComments)
        initReplyListeners()

        
}
