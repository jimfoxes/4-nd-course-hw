import { renderComments } from './modules/renderComments.js'
import { initAddCommentListener } from './modules/initAddCommentListener.js'

renderComments()
initAddCommentListener(renderComments)
