  const pinInputs = document.querySelectorAll(".pin-input");

  pinInputs.forEach((input, index) => {
    input.addEventListener("input", () => {
      if (input.value.length === 1 && index < pinInputs.length - 1) {
        pinInputs[index + 1].focus();
      }
    });

    input.addEventListener("keydown", (e) => {
      if (e.key === "Backspace" && input.value === "" && index > 0) {
        pinInputs[index - 1].focus();
      }
    });
  });
