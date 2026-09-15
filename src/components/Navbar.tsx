import { useState } from "react";

type NavbarProps = {
onThemeChange: () => void;
onMemesClick: () => void;
memesLocked: boolean;
};

export default function Navbar({
onThemeChange,
onMemesClick,
memesLocked,
}: NavbarProps) {
const [menuOpen, setMenuOpen] = useState(false);

const closeMenu = () => {
setMenuOpen(false);
};

const handleMemesClick = () => {
closeMenu();
onMemesClick();
};

return (
<header className="navbar">
<a href="/" className="logo" aria-label="OSDC" onClick={closeMenu} >
<img src="https://links.osdc.dev/assets/logo-pixel.svg" alt="OSDC" />
</a>

  <nav
    id="mobile-navigation"
    className={`navitems ${
      menuOpen ? "navitems-open" : ""
    }`}
  >
    <a href="/" onClick={closeMenu}>
      Home
    </a>

    <a
      href="https://links.osdc.dev"
      onClick={closeMenu}
    >
      Socials
    </a>

    <button
      type="button"
      className={`nav-link-button${
        memesLocked ? " nav-link-locked" : ""
      }`}
      onClick={handleMemesClick}
      aria-label={
        memesLocked
          ? "Memes are locked"
          : "Go to memes"
      }
    >
      Memes
      {memesLocked && (
        <span
          className="nav-lock"
          aria-hidden="true"
        >
          🔒
        </span>
      )}
    </button>

    <a
      href="https://github.com/kuwushagra/git-gud-osdc"
      onClick={closeMenu}
    >
      Repo
    </a>
  </nav>

  <div className="navbar-actions">
    <button
      type="button"
      className="theme-button"
      onClick={onThemeChange}
      aria-label="Change color theme"
    >
      Theme
    </button>

    <button
      type="button"
      className={`menu-button ${
        menuOpen ? "menu-button-open" : ""
      }`}
      onClick={() =>
        setMenuOpen((open) => !open)
      }
      aria-label={
        menuOpen
          ? "Close navigation menu"
          : "Open navigation menu"
      }
      aria-expanded={menuOpen}
      aria-controls="mobile-navigation"
    >
      <span className="menu-label">
        MENU
      </span>

      <span
        className="menu-icon"
        aria-hidden="true"
      >
        <span />
        <span />
        <span />
      </span>
    </button>
  </div>
</header>

);
}