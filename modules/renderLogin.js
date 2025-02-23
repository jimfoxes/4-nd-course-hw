import { fetchCommentWithRetry } from '../index.js'
import { login, setName, setToken } from './api.js'
import { renderRegistration } from './renderRegistration.js'
export const renderLogin = () => {
    const container = document.querySelector('.container')

    const loginHtml = `
    <section class="add-form">
    <h1>Форма входа</h1>
    <input type="text" class="add-form-name" placeholder="Введите логин" id="login" required />
    <input type="password" class="add-form-name" placeholder="Введите пароль" id="password" required />
    <div class="error-message" id="name-error">Вы ввели неправильный логин или пароль</div>
    <fieldset class="add-form-registry">
    <button class="add-form-button-main button-main" type="submit">Войти</button>
    <u class="add-form-button-link registry">
    Зарегистрироваться
    </u>
    </fieldset>
    </section>
    `

    container.innerHTML = loginHtml

    document.querySelector('.registry').addEventListener('click', () => {
        renderRegistration()
    })

    const loginEl = document.querySelector('#login')
    const passwordEl = document.querySelector('#password')
    const submitButtonEl = document.querySelector('.button-main')

    submitButtonEl.addEventListener('click', () => {
        login(loginEl.value, passwordEl.value)
            .then((response) => {
                if (response.status === 400) {
                    throw new Error('Неправильный логин или пароль')
                }
                if (response.status === 201) {
                    return response.json()
                }
            })
            .then((data) => {
                setToken(data.user.token)
                setName(data.user.name)
                fetchCommentWithRetry()
            })
            .catch((error) => {
                if (error.message === 'Неправильный логин или пароль') {
                    const nameError = document.getElementById('name-error')
                    nameError.style.display = 'block'
                }
            })
    })
}
