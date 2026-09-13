import "./App.css";
import { motion, type Variants } from "motion/react";
import Navbar from "./components/Navbar";
import Ticker from "./components/Ticker";
import { useState } from "react";

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
      <div className="background-cards">
        <motion.div
          className="background-card card-one"
          initial={{
            opacity: 0,
            x: 100,
            rotate: -12,
          }}
          animate={{
            opacity: 1,
            x: 0,
            rotate: -7,
          }}
          transition={{
            duration: 0.8,
            delay: 0.2,
            ease: "easeOut",
          }}
          whileHover={{
            rotate: -4,
            scale: 1.02,
          }}
        >
        </motion.div>

        <motion.div
          className="background-card card-two"
          initial={{
            opacity: 0,
            x: 120,
            rotate: 14,
          }}
          animate={{
            opacity: 1,
            x: 0,
            rotate: 8,
          }}
          transition={{
            duration: 0.8,
            delay: 0.35,
            ease: "easeOut",
          }}
          whileHover={{
            rotate: 4,
            scale: 1.02,
          }}
        >
        </motion.div>
      </div>

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
          <section className="hero">
            <motion.div
              className="hero-content"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div
                className="hero-placeholder"
                variants={itemVariants}
              >
                <motion.h1
                  animate={{
                    rotate: [-3, -1, -3],
                    scale: [1, 1.02, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  Git
                  Gud
                </motion.h1>
              </motion.div>

              <motion.div
                className="hero-text"
                variants={itemVariants}
              >
                <p>
                 Learn Git. Make Memes. Make Your First Contribution.
                </p>

                <p>
                 Hosted by OSDC, this fun hands-on session introduces you to Git and GitHub through a shared meme project.
                 No experience needed, just bring your creativity.
                </p>
                
                <motion.button
                className="red-button"
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
            </motion.div>
          </section>

          <Ticker /><br></br>

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
                  src="https://freepngimg.com/save/98800-meme-dank-download-hq/861x841"
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
                </p><br></br>

                <p>
                  A community of web developers, android
                  freaks, machine learning enthusiasts,
                  hackers, designers, game developers and
                  most significantly Explorers.
                </p><br></br>
                
                <p>
                  We welcome those who believe in the open
                  source philosophy and are willing to
                  sacrifice their naps in order to change
                  the world.
                </p><br></br>

              <motion.a
                  className="red-button"
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

function BlankPage({
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
    <section className="page blank-page">
      <div className="blank-card">
        <Navbar />

        <main className="blank-content">
          <motion.div
            className="blank-inner"
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
            <br></br>
            <motion.h2 variants={itemVariants}>
              {page.title.split("\n").map((line) => (
                <span key={line}>
                  {line}
                  <br />
                </span>
              ))}
            </motion.h2>

            <motion.div
              className="blank-placeholder"
              variants={itemVariants}
            >
              {/* Intentionally blank */}
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
        {String(currentPage ).padStart(2, "")} / 3
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

  const goToPage = (page: number) => {
    const nextPage = Math.max(0, Math.min(3, page));

    setCurrentPage(nextPage);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="website">
      {currentPage === 0 && (
        <HomePage
          onNext={() => goToPage(1)}
        />
      )}

      {currentPage > 0 && (
        <BlankPage
          pageIndex={currentPage}
          onPrevious={() =>
            goToPage(currentPage - 1)
          }
          onNext={() =>
            goToPage(currentPage + 1)
          }
        />
      )}
    </div>
  );
}

export default App;