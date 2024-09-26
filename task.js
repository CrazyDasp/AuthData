const signinForm = document.getElementById('signin__form');
const welcome = document.getElementById('welcome');
const userIdSpan = document.getElementById('user_id');

const storedUserId = localStorage.getItem('user_id');
if (storedUserId) {
  showWelcomeMessage(storedUserId);
}

signinForm.addEventListener('submit', (event) => {
  event.preventDefault(); 

  const formData = new FormData(signinForm);
  const xhr = new XMLHttpRequest();

  xhr.open('POST', signinForm.action, true);

  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      if (xhr.status === 200 || xhr.status === 201) {
        const response = JSON.parse(xhr.responseText); 

        if (response.success) {
          localStorage.setItem('user_id', response.user_id);

          showWelcomeMessage(response.user_id);

          signinForm.reset();
        } else {
          alert('Неверный логин/пароль');
        }
      } else {
        const statusText = xhr.statusText || "Текст ошибки не предоставлен сервером";
        console.error('Ошибка авторизации:', `Код статуса: ${xhr.status}`, `Текст ошибки: ${statusText}`);
        alert(`Произошла ошибка при авторизации. Код статуса: ${xhr.status} - ${statusText}`);
      }
    }
  };

  xhr.onerror = function() {
    console.error('Ошибка сети или запроса.');
    alert('Произошла ошибка сети или сервера.');
  };

  xhr.send(formData);
});

function showWelcomeMessage(userId) {
  document.getElementById('signin').classList.remove('signin_active');
  welcome.classList.add('welcome_active');
  userIdSpan.textContent = userId;
}

const logoutBtn = document.getElementById('logout__btn');
if (logoutBtn) {
  logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('user_id');
    welcome.classList.remove('welcome_active');
    document.getElementById('signin').classList.add('signin_active');
  });
};
