const links = [
  {
    name: "REPO",
    url: "https://github.com/osdc",
  },
  {
    name: "SOCIALS",
    url: "https://links.osdc.dev",
  },
  {
    name: "MEMES",
    url: "/memes",
  },
];

export default function Navbar() {
  return (
    <header className="navbar">
      <a href="/" className="logo">
        <img
          src="https://fossunited.org/files/osdc_logo.jpg"
          alt="OSDC"
        />
      </a>

      <nav className="navitems">
        {links.map((link) => (
          <a
            key={link.name}
            href={link.url}
          >
            {link.name}
          </a>
        ))}
      </nav>

      <a
        className="hello-button"
        href="/repo-link-here"
      >
        Repo
      </a>
    </header>
  );
}