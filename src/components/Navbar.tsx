import { useState } from "react";

const links = [
  {
    name: "Home",
    url: "/",
  },
  {
    name: "Socials",
    url: "https://links.osdc.dev",
  },
  {
    name: "Memes",
    url: "/memes",
  },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="navbar">
      <a
        href="https://osdc.dev"
        className="logo"
        aria-label="OSDC"
      >
        <img
          src="https://links.osdc.dev/assets/logo-pixel.svg"
          alt="OSDC"
        />
      </a>

      <nav className={`navitems ${menuOpen ? "navitems-open" : ""}`}>
        {links.map((link) => (
          <a key={link.name} href={link.url} onClick={() => setMenuOpen(false)}>
            {link.name}
          </a>
        ))}

        <a
          className="mobile-repo"
          href="https://github.com/kuwushagra/git-gud-osdc"
          onClick={() => setMenuOpen(false)}
        >
          Repo
        </a>
      </nav>

      <a
        className="bigbutton repo-button"
        href="https://github.com/kuwushagra/git-gud-osdc"
      >
        Repo
      </a>


      <button
        className={`menu-button ${
          menuOpen ? "menu-button-open" : ""
        }`}
        onClick={() => setMenuOpen((open) => !open)}
        aria-label={
          menuOpen
            ? "Close navigation menu"
            : "Open navigation menu"
        }
        aria-expanded={menuOpen}
      >
        <span className="menu-label">
          MENU
        </span>

        <span className="menu-icon" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
      </button>
    </header>
  );
}
