import { renderComments } from './modules/renderComments.js'
import { initAddCommentListener } from './modules/initAddCommentListener.js'
import { fetchComments } from './modules/api.js'
import { updateComments } from './modules/comments.js'

fetchComments().then((data) => {
    updateComments(data);
    renderComments();
})


initAddCommentListener(renderComments)
