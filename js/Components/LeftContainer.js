const LeftContainer = () => {
  return `
        <div class="container__circle container__circle--big"></div>
        <div class="container__circle container__circle--small"></div>

        <a href="#" class="container__logo">
          <img src="../Assets/Logo.svg" alt="Logo" class="container__logo-img" />
          <span class="container__logo-text">Northwind</span>
        </a>

        <div class="container__title-group">
          <div class="container__title">
            <p class="container__title--big">
              One account for everything your team ships.
            </p>
            <p class="container__title--sm">
              Secure sign-in, instant onboarding, and a verified inbox — all in
              a few clicks.
            </p>
          </div>
          <div class="container__title-bottom">
            <p class="container__title-bottom-item">
              <img src="../Assets/CircleTick.svg" alt="Icon" /> Encrypted credentials
            </p>
            <p class="container__title-bottom-item">
              <img src="../Assets/CircleTick.svg" alt="Icon" /> Email verification
              built-in
            </p>
            <p class="container__title-bottom-item">
              <img src="../Assets/CircleTick.svg" alt="Icon" /> Password recovery flow
            </p>
          </div>
        </div>
    `;
}

export default LeftContainer;