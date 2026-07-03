const NavBar = () => {
  return `
    <nav class="navbar">
      <ul class="navbar__menu">
        <li class="navbar__menu-item">
          <a href="../LoginForm/loginform.html" class="navbar__menu-link">1 · Login</a>
        </li>
        <li class="navbar__menu-item">
          <a href="../RegisterForm/registerform.html" class="navbar__menu-link">2 · Register</a>
        </li>
        <li class="navbar__menu-item">
          <a href="#" class="navbar__menu-link">3 · Forgot password</a>
        </li>
        <li class="navbar__menu-item">
          <a href="#" class="navbar__menu-link">4 · Reset password</a>
        </li>
        <li class="navbar__menu-item">
          <a href="#" class="navbar__menu-link">5 · Verify email</a>
        </li>
        <li class="navbar__menu-item">
          <a href="#" class="navbar__menu-link">6 · Success</a>
        </li>
      </ul>
      <button class="navbar__menu-button"><img src="../Assets/menu.svg" alt="Menu" width="24" height="24" /></button>
    </nav>
    `;
};

export default NavBar;
