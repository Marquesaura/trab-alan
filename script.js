const MAX_SIZE = 500 * 1024; // 500KB
const ALLOWED_TYPES = ['image/jpeg', 'image/png'];
const HINT_TEXT = 'Upload your photo (JPG or PNG, max size: 500KB).';

const form = document.getElementById('ticket-form');
const formView = document.getElementById('form-view');
const ticketView = document.getElementById('ticket-view');

const dropzone = document.getElementById('dropzone');
const avatarInput = document.getElementById('avatar');
const avatarPreview = document.getElementById('avatar-preview');
const dropzoneText = document.getElementById('dropzone-text');
const dropzoneActions = document.getElementById('dropzone-actions');
const removeBtn = document.getElementById('remove-btn');
const changeBtn = document.getElementById('change-btn');
const avatarMessage = document.getElementById('avatar-message');

const nomeInput = document.getElementById('nome');
const emailInput = document.getElementById('email');
const userInput = document.getElementById('username');

const UPLOAD_ICON = 'assets/images/icon-upload.svg';
let avatarUrl = null;

/* ---------- Mensagens ---------- */
function setAvatarMessage(text, isError) {
  avatarMessage.querySelector('.message__text').textContent = text;
  avatarMessage.classList.toggle('is-error', isError);
  dropzone.classList.toggle('is-invalid', isError);
}

function setFieldError(input, text) {
  const message = document.getElementById(`${input.id}-message`);
  if (text) {
    message.querySelector('.message__text').textContent = text;
    message.hidden = false;
    input.classList.add('is-invalid');
    input.setAttribute('aria-invalid', 'true');
  } else {
    message.hidden = true;
    input.classList.remove('is-invalid');
    input.removeAttribute('aria-invalid');
  }
}

/* ---------- Upload de avatar ---------- */
function clearAvatar() {
  if (avatarUrl) URL.revokeObjectURL(avatarUrl);
  avatarUrl = null;
  avatarInput.value = '';
  avatarPreview.src = UPLOAD_ICON;
  dropzone.classList.remove('has-image');
  dropzoneText.hidden = false;
  dropzoneActions.hidden = true;
}

function handleFile(file) {
  if (!file) return;

  if (!ALLOWED_TYPES.includes(file.type)) {
    clearAvatar();
    setAvatarMessage('Invalid file type. Please upload a JPG or PNG photo.', true);
    return;
  }
  if (file.size > MAX_SIZE) {
    clearAvatar();
    setAvatarMessage('File too large. Please upload a photo under 500KB.', true);
    return;
  }

  if (avatarUrl) URL.revokeObjectURL(avatarUrl);
  avatarUrl = URL.createObjectURL(file);
  avatarPreview.src = avatarUrl;
  dropzone.classList.add('has-image');
  dropzoneText.hidden = true;
  dropzoneActions.hidden = false;
  setAvatarMessage(HINT_TEXT, false);
}

avatarInput.addEventListener('change', () => handleFile(avatarInput.files[0]));

removeBtn.addEventListener('click', () => {
  clearAvatar();
  setAvatarMessage(HINT_TEXT, false);
});

changeBtn.addEventListener('click', () => avatarInput.click());

// Drag and drop
['dragenter', 'dragover'].forEach((type) => {
  dropzone.addEventListener(type, (e) => {
    e.preventDefault();
    dropzone.classList.add('is-dragging');
  });
});

['dragleave', 'drop'].forEach((type) => {
  dropzone.addEventListener(type, () => dropzone.classList.remove('is-dragging'));
});

dropzone.addEventListener('drop', (e) => {
  e.preventDefault();
  handleFile(e.dataTransfer.files[0]);
});

// Evita que o navegador abra a imagem se soltarem fora da área
['dragover', 'drop'].forEach((type) => {
  window.addEventListener(type, (e) => e.preventDefault());
});

/* ---------- Validação ---------- */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const GITHUB_REGEX = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i;

function validateName() {
  const value = nomeInput.value.trim();
  const error = value ? '' : 'Please enter your full name.';
  setFieldError(nomeInput, error);
  return !error;
}

function validateEmail() {
  const value = emailInput.value.trim();
  const error = EMAIL_REGEX.test(value) ? '' : 'Please enter a valid email address.';
  setFieldError(emailInput, error);
  return !error;
}

function getGithubUser() {
  return userInput.value.trim().replace(/^@/, '');
}

function validateGithub() {
  const value = getGithubUser();
  let error = '';
  if (!value) error = 'Please enter your GitHub username.';
  else if (!GITHUB_REGEX.test(value)) error = 'Please enter a valid GitHub username.';
  setFieldError(userInput, error);
  return !error;
}

function validateAvatar() {
  if (avatarUrl) return true;
  // Mantém a mensagem de erro de tamanho/tipo, se já existir
  if (!dropzone.classList.contains('is-invalid')) {
    setAvatarMessage('Please upload your photo.', true);
  }
  return false;
}

nomeInput.addEventListener('input', () => nomeInput.classList.contains('is-invalid') && validateName());
emailInput.addEventListener('input', () => emailInput.classList.contains('is-invalid') && validateEmail());
userInput.addEventListener('input', () => userInput.classList.contains('is-invalid') && validateGithub());

/* ---------- Gerar ingresso ---------- */
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const results = [validateAvatar(), validateName(), validateEmail(), validateGithub()];
  if (results.includes(false)) {
    const firstInvalid = form.querySelector('.is-invalid');
    if (firstInvalid) {
      const target = firstInvalid.classList.contains('dropzone') ? avatarInput : firstInvalid;
      target.focus();
    }
    return;
  }

  const nome = nomeInput.value.trim();
  const email = emailInput.value.trim();
  const user = getGithubUser();
  const numero = String(Math.floor(Math.random() * 99999) + 1).padStart(5, '0');

  document.getElementById('t-name').textContent = nome;
  document.getElementById('t-email').textContent = email;
  document.getElementById('t-fullname').textContent = nome;
  document.getElementById('t-github').textContent = `@${user}`;
  document.getElementById('t-number').textContent = `#${numero}`;

  const ticketAvatar = document.getElementById('t-avatar');
  ticketAvatar.src = avatarUrl;
  ticketAvatar.alt = `Photo of ${nome}`;

  formView.hidden = true;
  ticketView.hidden = false;

  const title = document.getElementById('ticket-title');
  title.focus({ preventScroll: true });
  window.scrollTo({ top: 0 });
});
