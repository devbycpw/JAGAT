let isVisible = false;

function togglePassword() {
  const passwordInput = document.getElementById("password");
  const eyeIcon = document.getElementById("eye-icon");

  isVisible = !isVisible;
  passwordInput.type = isVisible ? "text" : "password";
  eyeIcon.className = isVisible ? "bi bi-eye-slash" : "bi bi-eye";
}
