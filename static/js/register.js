  let isVisible = false;

  function togglePassword() {
    const passwordInput = document.getElementById("password");
    const eyeIcon = document.getElementById("eye-icon");

    isVisible = !isVisible;
    passwordInput.type = isVisible ? "text" : "password";
    eyeIcon.className = isVisible ? "bi bi-eye-slash" : "bi bi-eye";
  }

document.addEventListener('DOMContentLoaded', function() {
  const genderButtons = document.querySelectorAll('.jenis_kelamin button');

  genderButtons.forEach(button => {
    button.addEventListener('click', function() {
      genderButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
    });
  });
});
