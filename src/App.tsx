import "./App.css";
import { motion, type Variants } from "motion/react";
import { useState } from "react";

import Navbar from "./components/Navbar";
import Ticker from "./components/Ticker";

import gitgudheader from "./assets/images/gitgudheader.png";
import octocat from "./assets/images/octocat.png";
import meme1 from "./assets/images/Group 33.png";
import meme2 from "./assets/images/Group 34.png";
import meme3 from "./assets/images/Group 35.png";
import meme4 from "./assets/images/Group 36.png";
import meme5 from "./assets/images/Group 33-1.png";
import meme6 from "./assets/images/Group 34-1.png";
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const pages = [
  {
    label: "Step One",
    title: "MAKE A\nGITHUB ACCOUNT",
    type: "github-account",
  },
  {
    label: "Step Two",
    title: "SETUP GIT",
    type: "setup-git",
  },
  {
    label: "Step Three",
    title: "FORK",
    type: "fork",
  },
  {
    label: "Step 3.1",
    title: "SELECT NO. OF MEMBERS\nIN YOUR TEAM",
    type: "team-size",
  },
  {
    label: "3.2",
    title: "ENTER TEAM NAME",
    type: "team-name",
  },
  {
    label: "3.3",
    title: "WHICH TEAM MEMBER\nARE YOU?",
    type: "team-member",
  },
  {
    label: "3.4",
    title: "MEMES AVAILABLE",
    type: "memes-available",
  },
  {
    label: "Step Four",
    title: "CHANGE BRANCH",
    type: "push",
  },
  {
    label: "/memes",
    title: "MEMES PUSHED",
    type: "memes-pushed",
  },
];

function ArrowButton({
  direction,
  onClick,
}: {
  direction: "left" | "right";
  onClick: () => void;
}) {
  return (
    <motion.button
      className="page-arrow"
      onClick={onClick}
      whileHover={{
        scale: 1.08,
        y: direction === "left" ? -2 : 2,
      }}
      whileTap={{
        scale: 0.92,
      }}
      aria-label={
        direction === "left"
          ? "Previous page"
          : "Next page"
      }
    >
      {direction === "left" ? "←" : "→"}
    </motion.button>
  );
}

function HomePage({
  onNext,
}: {
  onNext: () => void;
}) {
  return (
    <section className="page home-page">
      <motion.div
        className="main-card home-card"
        initial={{
          opacity: 0,
          y: 40,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.7,
          ease: "easeOut",
        }}
      >
        <Navbar />

        <main>
          <section className="hero wenoselect">
            <motion.div
              className="hero-content"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="hero-left">
                <motion.img
                  className="hero-small-image"
                  src={gitgudheader}
                  alt="GitGud"
                  variants={itemVariants}
                />

                <motion.h1
                  variants={itemVariants}
                  animate={{
                    rotate: [-2, 0, -2],
                    scale: [1, 1.01, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  GitGud
                </motion.h1>

                <motion.div
                  className="hero-text"
                  variants={itemVariants}
                >
                  <p>
                    Learn Git. Make Memes. Make Your First Contribution.
                  </p>

                  <p>
                    Hosted by OSDC, this fun hands-on session introduces
                    you to Git and GitHub through a shared meme project.
                    No experience needed, just bring your creativity.
                  </p>

                  <motion.button
                    className="bigbutton"
                    onClick={onNext}
                    whileHover={{
                      scale: 1.06,
                      y: -3,
                      boxShadow: "5px 5px 0 var(--black)",
                    }}
                    whileTap={{
                      scale: 0.95,
                      y: 0,
                      boxShadow: "2px 2px 0 var(--black)",
                    }}
                  >
                    Get Started ➜
                  </motion.button>
                </motion.div>
              </div>

              <motion.div
                className="hero-image"
                variants={itemVariants}
                animate={{
                  y: [0, -12, 0],
                  rotate: [-2, 2, -2],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <img
                  src={octocat}
                  alt="Octocat"
                />
              </motion.div>
            </motion.div>
          </section>

          <Ticker />

          <motion.section
            className="about wenoselect"
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.2,
            }}
            variants={containerVariants}
          >
            <motion.div
              className="about-image"
              variants={itemVariants}
            >
              <motion.div
                className="illustration"
                animate={{
                  y: [0, -12, 0],
                  rotate: [-2, 2, -2],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <img
                  src="https://links.osdc.dev/assets/logo-pixel.svg"
                  alt="OSDC"
                />
              </motion.div>
            </motion.div>

            <motion.div
              className="about-text"
              variants={itemVariants}
            >
              <h2>OSDC</h2>

              <p>
                We are an Open Source Community based in
                and around Jaypee Institute of Information
                Technology, Noida, India.
              </p>

              <p>
                A community of web developers, android
                freaks, machine learning enthusiasts,
                hackers, designers, game developers and
                most significantly Explorers.
              </p>

              <p>
                We welcome those who believe in the open
                source philosophy and are willing to
                sacrifice their naps in order to change
                the world.
              </p>

              <motion.a
                className="bigbutton"
                href="https://discord.gg/QUWfMS4HXX"
                whileHover={{
                  scale: 1.06,
                  y: -3,
                  boxShadow: "5px 5px 0 var(--black)",
                }}
                whileTap={{
                  scale: 0.95,
                  y: 0,
                  boxShadow: "2px 2px 0 var(--black)",
                }}
              >
                Say Hello!
              </motion.a>
            </motion.div>
          </motion.section>
        </main>
      </motion.div>
    </section>
  );
}

function PageBody({ type }: { type: string }) {
  switch (type) {
    case "github-account":
      return (
        <div className="step-body centered-body">
          <a
            className="figma-button"
            href="https://github.com/signup"
            target="_blank"
            rel="noreferrer"
          >
            CLICK HERE
          </a>
        </div>
      );

    case "setup-git":
      return (
        <div className="step-body setup-body">
          <a
            className="download-label"
            href="https://git-scm.com/install/windows"
            target="_blank"
            rel="noreferrer"
          >
            DOWNLOAD
          </a>

          <div className="step-highlight">
            CONNECT WITH
            <br />
            GITHUB
          </div>

          <div className="terminal-flow">
            <div className="terminal-box">
              <span>Set your email</span>
              <code>git config --global user.email "your_email@example.com"</code>
            </div>

            <div className="terminal-line" />

            <div className="terminal-box">
              <span>Set username</span>
              <code>git config --global user.name "your_username</code>
            </div>
          </div>
        </div>
      );

    case "fork":
      return (
        <div className="step-body fork-body">
          <p>
            Go to the PROJECT'S PAGE ON GITHUB and click
            <br />
            the FORK button.
          </p>

          <a
            className="figma-button"
            href="https://en.wikipedia.org/wiki/Cat"
            target="_blank"
            rel="noreferrer"
          >
            CLICK HERE TO GO TO GITHUB REPO
          </a>

          <div className="terminal-flow fork-terminal-flow">
            <div className="terminal-box">
              <span>Initialize a repo</span>
              <code>git init</code>
            </div>

            <div className="terminal-line" />

            <div className="terminal-box">
              <span>Add origin</span>
              <code>git remote add origin (your-fork-url)</code>
            </div>
          </div>
        </div>
      );
    
    case "team-size":
      return (
        <div className="step-body centered-body">
          <div className="choice-list">
            <button>1</button>
            <button>2</button>
            <button>3</button>
          </div>
        </div>
      );

    case "team-name":
      return (
        <div className="step-body centered-body">
          <input
            className="figma-input"
            type="text"
            placeholder="ENTER TEAM NAME"
          />
        </div>
      );

    case "team-member":
      return (
        <div className="step-body centered-body">
          <p>
            Which team member are you?
            <br />
            <small>Eg: #1 for team member 1</small>
          </p>

          <input
            className="figma-input"
            type="text"
            placeholder="ENTER MEMBER ID"
          />
        </div>
      );

    case "memes-available":
      return (
        <div className="step-body meme-grid">
          <Meme src={meme1} />
          <Meme src={meme2} />
          <Meme src={meme3} />
          <Meme src={meme4} />
          <Meme src={meme5} />
          <Meme src={meme6} />
        </div>
      );

    case "push":
      return (
        <div className="step-body push-body">
          <div className="terminal-flow">
            <div className="terminal-box">
              <span>Change branch</span>
              <code>git checkout -b memes</code>
            </div>

            <div className="terminal-line" />

            <div className="terminal-box">
              <span>Add file</span>
              <code>git add .</code>
            </div>

            <div className="terminal-line" />

            <div className="terminal-box">
              <span>Do your first commit</span>
              <code>git commit -m "first commit"</code>
            </div>

            <div className="terminal-line" />

            <div className="terminal-box">
              <span>Push your commit</span>
              <code>git push origin memes</code>
            </div>
          </div>
        </div>
      );

    case "memes-pushed":
      return (
        <div className="step-body meme-grid pushed-grid">
          <Meme src={meme1} />
          <Meme src={meme2} />
          <Meme src={meme3} />
          <Meme src={meme4} />
          <Meme src={meme5} />
          <Meme src={meme6} />
        </div>
      );

    default:
      return null;
  }
}

function Meme({ src }: { src: string }) {
  return <img className="meme-image" src={src} alt="Meme" />;
}

function ContentPage({
  pageIndex,
  onPrevious,
  onNext,
}: {
  pageIndex: number;
  onPrevious: () => void;
  onNext: () => void;
}) {
  const page = pages[pageIndex - 1];

  return (
    <section className="page content-page">
      <div className="content-card">
        <Navbar />

        <main className="content-content wenoselect">
          <motion.div
            className="content-inner"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.span
              className="eyebrow"
              variants={itemVariants}
            >
              {page.label}
            </motion.span>

            <motion.h2 variants={itemVariants}>
              {page.title.split("\n").map((line, index) => (
                <span key={`${line}-${index}`}>
                  {line}
                  <br />
                </span>
              ))}
            </motion.h2>

            <motion.div
              className="content-placeholder"
              variants={itemVariants}
            >
              <PageBody type={page.type} />
            </motion.div>
          </motion.div>
        </main>

        <Ticker />

        <PageNavigation
          currentPage={pageIndex}
          onPrevious={onPrevious}
          onNext={onNext}
        />
      </div>
    </section>
  );
}

function PageNavigation({
  currentPage,
  onPrevious,
  onNext,
}: {
  currentPage: number;
  onPrevious: () => void;
  onNext: () => void;
}) {
  return (
    <div className="page-navigation">
      <ArrowButton
        direction="left"
        onClick={onPrevious}
      />

      <div className="page-counter">
        {String(currentPage ).padStart(2, "0")} / 9
      </div>

      <ArrowButton
        direction="right"
        onClick={onNext}
      />
    </div>
  );
}

function App() {
  const [currentPage, setCurrentPage] = useState(0);
  const [themeIndex, setThemeIndex] = useState(0);

  const goToPage = (page: number) => {
    const nextPage = Math.min(9, Math.max(0, page));

    setCurrentPage(nextPage);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const changeTheme = () => {
    setThemeIndex(
      (current) => (current + 1) % themes.length
    );
  };
  return (
    <div className={`website ${themes[themeIndex]}`}>
      {currentPage === 0 && (
        <HomePage
          onNext={() => goToPage(1)}
        />
      )}

      {currentPage > 0 && (
        <ContentPage
          pageIndex={currentPage}
          onPrevious={() =>
            goToPage(currentPage - 1)
          }
          onNext={() =>
            goToPage(currentPage + 1)
          }
        />
      )}

      <button
        className="theme-switcher"
        onClick={changeTheme}
        aria-label="Change color theme"
      >
        Theme
      </button>
    </div>
  );
}

export default App;
