
import { comments } from './comments.js'
import { sanitizeHtml } from "./sanitizeHtml.js";
import { formatDate } from "./formatDate.js";
export const initAddCommentListener = (renderComments) => {
    const nameInput = document.querySelector(".add-form-name");
    const textInput = document.querySelector(".add-form-text");
    const btnEl = document.querySelector(".add-form-button");

    btnEl.addEventListener("click", () => {
        const name = nameInput.value.trim();
        const text = textInput.value.trim();
        const nameError = document.getElementById('name-error');
        const commentError = document.getElementById('comment-error');
        const newComment = {
          name: sanitizeHtml(name),
          date: formatDate(new Date()),
          text: sanitizeHtml(text),
          likes: 0,
          isLiked: false,
        };
        let isValid = true;
    
        function validate(valueInput, input, errorText) { 
          const hasError = !valueInput; 
          input.classList.toggle('error', hasError); 
          errorText.style.display = hasError ? 'block' : 'none'; 
          return isValid = hasError ? false : true ;
        }
    
        let isValidName = validate(name, nameInput, nameError);
        let isValidText = validate(text, textInput, commentError);
    
        if (isValidName && isValidText) {
          comments.push(newComment);
          nameInput.value = '';
          textInput.value = '';
          renderComments();
        }
      });
}