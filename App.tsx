import "./App.css";
import { motion, type Variants } from "motion/react";
import { useState } from "react";

import Navbar from "./components/Navbar";
import Ticker from "./components/Ticker";

import gitgudheader from "./assets/images/gitgudheader.png";
import octocat from "./assets/images/octocat.png";

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
    title: "Make account",
  },
  {
    label: "Step Two",
    title: "Setup Git",
  },
  {
    label: "Step Three",
    title: "Fork",
  },
  {
    label: "Step Four",
    title: "Something",
  },
  {
    label: "Step Five",
    title: "Something",
  },
  {
    label: "Step Six-",
    title: "Something",
  },
  {
    label: "-Seven :D",
    title: "Something",
  },
  {
    label: "Step Eight",
    title: "Something",
  },
  {
    label: "Step Nine",
    title: "Something",
  },
];

const themes = [
  "theme-green",
  "theme-blue",
  "theme-high-contrast",
];

function App() {
  const [currentPage, setCurrentPage] = useState(0);
  const [themeIndex, setThemeIndex] = useState(0);

  const changeTheme = () => {
    setThemeIndex((current) => (current + 1) % themes.length);
  };

  const goToPage = (page: number) => {
    const nextPage = page > 9 ? 1 : Math.max(0, page);

    setCurrentPage(nextPage);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className={`website ${themes[themeIndex]}`}>
      {currentPage === 0 && (
        <HomePage onNext={() => goToPage(1)} />
      )}

      {currentPage > 0 && (
        <ContentPage
          pageIndex={currentPage}
          onPrevious={() => goToPage(currentPage - 1)}
          onNext={() => goToPage(currentPage + 1)}
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
                  alt="GitGud header"
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
                    Learn Git. Make Memes. Make Your First
                    Contribution.
                  </p>

                  <p>
                    Hosted by OSDC, this fun hands-on session
                    introduces you to Git and GitHub through a
                    shared meme project. No experience needed,
                    just bring your creativity.
                  </p>

                  <motion.button
                    className="bigbutton"
                    onClick={onNext}
                    whileHover={{
                      scale: 1.06,
                      y: -3,
                      boxShadow: "5px 5px 0 #111",
                    }}
                    whileTap={{
                      scale: 0.95,
                      y: 0,
                      boxShadow: "2px 2px 0 #111",
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
            className="about"
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
              className="about-text wenoselect"
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
                  boxShadow: "5px 5px 0 #111",
                }}
                whileTap={{
                  scale: 0.95,
                  y: 0,
                  boxShadow: "2px 2px 0 #111",
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

        <main className="content-content">
          <motion.div
            className="content-inner wenoselect"
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
              {page.title.split("\n").map((line) => (
                <span key={line}>
                  {line}
                  <br />
                </span>
              ))}
            </motion.h2>

            <motion.div
              className="content-placeholder"
              variants={itemVariants}
            />
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
        {String(currentPage).padStart(2, "0")} / 09
      </div>

      <ArrowButton
        direction="right"
        onClick={onNext}
      />
    </div>
  );
}

export default App;
