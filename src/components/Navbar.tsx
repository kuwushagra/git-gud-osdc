const links = [
  {
    name: "HOME",
    url: "/",
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
      <a href="https://osdc.dev" className="logo">
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
        className="bigbutton"
        href="https://github.com/kuwushagra/git-gud-osdc"
      >
        Repo
      </a>
    </header>
  );
}