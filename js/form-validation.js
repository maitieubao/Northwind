document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("#container__form").forEach((form) => {
    initSharedValidation(form);
  });
});

function initSharedValidation(form) {
  const emailInput = form.querySelector('#email');
  const passwordInput = form.querySelector('#password');
  const fullnameInput = form.querySelector('#fullname');
  const confirmPasswordInput = form.querySelector('#confirm-password');
  const togglePasswordBtn = form.querySelector("#togglePassword");

  if (togglePasswordBtn) {
    togglePasswordBtn.addEventListener("click", () => {
      const targetInput = document.querySelector('#password');
      const typeValue = targetInput.getAttribute('type') === 'password' ? 'text' : 'password';
      
      targetInput.setAttribute('type', typeValue);
    });
  }

  function showError(input, message) {
    if (!input) return;

    const formGroup = document.getElementById(input.id + "-group");
    if (!formGroup) return;

    formGroup.classList.add("error");

    let errorText = document.getElementById(input.id + "-error");
    if (!errorText) {
      errorText = document.createElement("small");
      errorText.id = input.id + "-error";
      errorText.style.color = "#ef4444";
      errorText.style.fontSize = "12px";
      errorText.style.marginTop = "5px";
      errorText.style.display = "block";
      formGroup.appendChild(errorText);
    }

    errorText.innerText = message;
    input.style.borderColor = "#ef4444";
  }

  function removeError(input) {
    if (!input) return;

    const formGroup = document.getElementById(input.id + "-group");
    if (!formGroup) return;

    formGroup.classList.remove("error");
    const errorText = document.getElementById(input.id + "-error");
    if (errorText) {
      errorText.remove();
    }

    input.style.borderColor = "";
  }

  function setSuccess(input) {
    if (!input) return;
    removeError(input);
  }

  function isValidEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  function validateForm() {
    let isValid = true;

    removeError(emailInput);
    removeError(passwordInput);
    removeError(fullnameInput);
    removeError(confirmPasswordInput);

    if (fullnameInput) {
      const nameValue = fullnameInput.value.trim();
      if (!nameValue) {
        showError(fullnameInput, "Họ tên không được để trống");
        isValid = false;
      } else if (nameValue.length < 2) {
        showError(fullnameInput, "Họ tên phải có ít nhất 2 ký tự");
        isValid = false;
      }
    }

    if (emailInput) {
      const emailValue = emailInput.value.trim();
      if (!emailValue) {
        showError(emailInput, "Email không được để trống");
        isValid = false;
      } else if (!isValidEmail(emailValue)) {
        showError(emailInput, "Email không đúng định dạng");
        isValid = false;
      }
    }

    if (passwordInput) {
      const passwordValue = passwordInput.value.trim();
      if (!passwordValue) {
        showError(passwordInput, "Mật khẩu không được để trống");
        isValid = false;
      } else if (passwordValue.length < 6) {
        showError(passwordInput, "Mật khẩu phải ít nhất 6 ký tự");
        isValid = false;
      }
    }

    if (confirmPasswordInput && passwordInput) {
      const confirmValue = confirmPasswordInput.value.trim();
      const passwordValue = passwordInput.value.trim();
      if (!confirmValue) {
        showError(confirmPasswordInput, "Vui lòng xác nhận mật khẩu");
        isValid = false;
      } else if (confirmValue !== passwordValue) {
        showError(confirmPasswordInput, "Mật khẩu xác nhận không khớp");
        isValid = false;
      }
    }

    return isValid;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (validateForm()) {
      const isRegisterForm = Boolean(fullnameInput || confirmPasswordInput);
      if (isRegisterForm) {
        alert("Đăng ký thành công!");
      } else {
        alert("Đăng nhập thành công! Đang chuyển hướng...");
      }
    }
  });

  const fieldsToWatch = [
    fullnameInput,
    emailInput,
    passwordInput,
    confirmPasswordInput,
  ].filter(Boolean);

  fieldsToWatch.forEach((input) => {
    input.addEventListener("input", () => {
      const value = input.value.trim();

      if (!value) {
        removeError(input);
        return;
      }

      if (input === emailInput) {
        if (isValidEmail(value))
          setSuccess(input);
        else
          showError(input, "Email không đúng định dạng");
      } else if (input === passwordInput) {
          if (value.length >= 6)
            setSuccess(input);
          else
            showError(input, "Mật khẩu phải ít nhất 6 ký tự");
        
      } else if (input === fullnameInput) {
          if (value.length >= 2)
            setSuccess(input);
          else
            showError(input, "Họ tên phải có ít nhất 2 ký tự");
        
      } else if (input === confirmPasswordInput && passwordInput) {
          if (value === passwordInput.value.trim())
            setSuccess(input);
          else
            showError(input, "Mật khẩu xác nhận không khớp");
      }
    });
  });
}
