const formData = {
  email: '',
  message: '',
};

const form = document.querySelector('.feedback-form');
const email = form.elements.email;
const message = form.elements.message;

//  Создаём строку, которая будет использоваться как имя ключа в localStorage
const localStorageKey = 'feedback-form-state';

// Метод позволяет читать из storage и возвращает в json формате
const savedSettings = localStorage.getItem(localStorageKey);
console.log(savedSettings);
// Метод JSON.parse переводит строку из localStorage обратно в объект или массив
// Затем мы вставляем сохранённые значения в поля формы, чтобы восстановить введённые ранее данные
if (savedSettings) {
  const parsedSettings = JSON.parse(savedSettings);
  email.value = parsedSettings.email;
  message.value = parsedSettings.message;
}

form.addEventListener('input', evt => {
  // Получаем имя поля, которое было изменено (например, 'email' или 'message')
  const key = evt.target.name;

  // Читаем текущие сохранённые данные из localStorage и парсим их в объект
  // Если данных нет — создаём пустой объект
  const saved = JSON.parse(localStorage.getItem(localStorageKey)) || {};

  // Обновляем объект новым значением из изменённого поля
  // Например: saved.email = 'новое значение'
  saved[key] = evt.target.value;

  // Сохраняем обновлённый объект обратно в localStorage как строку
  localStorage.setItem(localStorageKey, JSON.stringify(saved));
});

form.addEventListener('submit', evt => {
  evt.preventDefault();
  if (
    form.elements.message.value.trim() === '' ||
    form.elements.email.value.trim() === ''
  ) {
    return alert('Fill please all fields');
  }
  console.log(evt.target.elements.email.value);
  console.log(evt.target.elements.message.value);
  // Очищаются поля после отправки формы
  form.reset();
  // Очищается хранилище
  localStorage.removeItem(localStorageKey);
});
