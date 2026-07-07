const NavBar = () => {
  return `
    <nav>
      <ul id="navbar__menu">
        <li>
          <a href="../login-form/login-form.html">1 · Login</a>
        </li>
        <li>
          <a href="../register-form/register-form.html">2 · Register</a>
        </li>
        <li>
          <a href="../forgot-password-form/forgot-password-form.html">3 · Forgot password</a>
        </li>
        <li>
          <a href="../reset-password-form/reset-password-form.html">4 · Reset password</a>
        </li>
        <li>
          <a href="../verify-gmail-form/verify-gmail-form.html">5 · Verify email</a>
        </li>
        <li>
          <a href="../success-form/success-form.html">6 · Success</a>
        </li>
      </ul>
      <button id="navbar__menu-button"><img src="../assets/menu.svg" alt="Menu" width="24" height="24" /></button>
    </nav>
    `;
};

export default NavBar;
