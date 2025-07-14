function submitEmail() {
  const email = document.getElementById('email').value;
  if (!email) {
    alert("Silakan masukkan email terlebih dahulu.");
    return;
  }

  alert(`Link reset password telah dikirim ke ${email}`);
}
