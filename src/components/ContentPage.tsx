import { motion, type Variants } from "motion/react";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Ticker from "./Ticker";
import { pages, type TerminalStep } from "../pages";
import "./ContentPage.css";
import LONE_WOLF_IMAGE from "../assets/images/lonewolf.jpg";
import { getMemesForTeamSize } from "../data/memes";
import { API_BASE_URL } from "../config";


const STORAGE_KEYS = {
  teamName: "gitgud-team-name",
  teamSize: "gitgud-team-size",
  memberNumber: "gitgud-member-number",
  selectedTemplate: "gitgud-selected-template",
};

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

type ContentPageProps = {
  pageIndex: number;
  onPrevious: () => void;
  onNext: () => void;
  onThemeChange: () => void;
  teamName: string;
  teamSize: number | null;
  teamMemberNumber: number | null;
  onTeamNameChange: (value: string) => void;
  onTeamSizeChange: (value: number) => void;
  onTeamMemberChange: (value: number) => void;
  showLockMessage: boolean;
  onMemesClick: () => void;
  maxAllowedPage: number;
};

type SubmittedMeme = {
  team: string;
  imageUrl: string;
};

function readStorage(key: string): string {
  try {
    return localStorage.getItem(key)?.trim() || "";
  } catch {
    return "";
  }
}

function writeStorage(key: string, value: string): void {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Ignore storage errors.
  }
}

function getSelectedTemplate(): string {
  return readStorage(STORAGE_KEYS.selectedTemplate);
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
      type="button"
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

function Terminal({
  steps,
}: {
  steps: TerminalStep[];
}) {
  const [copied, setCopied] = useState(false);

  const copyAll = async () => {
    const text = steps.map((step) => step.code).join("\n");

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 1600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="terminal">
      <div className="terminal-header">
        <span className="terminal-title">
          Terminal
        </span>

        <div className="terminal-actions">
          <button
            type="button"
            className={`terminal-copy${copied ? " is-copied" : ""
              }`}
            onClick={copyAll}
            aria-label="Copy terminal commands"
          >
            {copied ? "Copied" : "Copy"}
          </button>

          <div className="terminal-controls">
            <span
              className="terminal-control terminal-control-red"
              aria-hidden="true"
            />
            <span
              className="terminal-control terminal-control-yellow"
              aria-hidden="true"
            />
            <span
              className="terminal-control terminal-control-green"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>

      <div className="terminal-content">
        {steps.map((step, index) => (
          <div
            className="terminal-command"
            key={`${step.label}-${index}`}
          >
            <div className="terminal-label">
              {step.label}
            </div>

            <div className="terminal-code">
              <span
                className="terminal-prompt"
                aria-hidden="true"
              >
                $
              </span>

              <code>{step.code}</code>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MemeGallery({
  teamSize,
}: {
  teamSize: number | null;
}) {
  const [selectedTemplate, setSelectedTemplate] =
    useState(getSelectedTemplate);

  const templates = getMemesForTeamSize(teamSize);

  const selectTemplate = (templateId: string) => {
    setSelectedTemplate(templateId);

    writeStorage(
      STORAGE_KEYS.selectedTemplate,
      templateId,
    );
  };

  const getSubtitle = () => {
    if (teamSize === 1) {
      return "LONE WOLF • ALL TEMPLATES AVAILABLE";
    }
    if (teamSize === 2) {
      return "2-MEMBER TEAM • 2-CAPTION MEMES";
    }
    if (teamSize === 3) {
      return "3-MEMBER TEAM • 3-CAPTION MEMES";
    }
    return "CHOOSE A TEMPLATE";
  };

  if (templates.length === 0) {
    return (
      <div className="meme-loading">
        NO MEME TEMPLATES FOUND.
      </div>
    );
  }

  return (
    <div className="meme-selector">
      <div className="meme-selector-hint">
        {getSubtitle()}
        {selectedTemplate
          ? ` • SELECTED: ${selectedTemplate}`
          : ""}
      </div>

      <div className="meme-horizontal-scroll">
        {templates.map((template) => {
          const isSelected =
            selectedTemplate === template.id;

          return (
            <button
              type="button"
              key={template.id}
              className={`meme-card${isSelected ? " is-selected" : ""
                }`}
              onClick={() =>
                selectTemplate(template.id)
              }
              aria-pressed={isSelected}
            >
              <div className="meme-card-image-wrap">
                {isSelected && (
                  <span className="meme-selected-badge">
                    SELECTED ✓
                  </span>
                )}

                <img
                  className="meme-image"
                  src={template.image}
                  alt={template.name}
                  draggable={false}
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = template.remoteUrl;
                  }}
                />

                <span className="meme-card-name">
                  {template.name}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

async function fetchSubmittedImages(): Promise<string[]> {
  const response = await fetch(`${API_BASE_URL}/image/get`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch images: ${response.status}`);
  }

  const data = await response.json();

  if (!Array.isArray(data)) {
    throw new Error("Invalid image response.");
  }

  return data as string[];
}

function SubmittedMemes() {
  const [memes, setMemes] = useState<
    SubmittedMeme[]
  >([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadSubmissions() {
      try {
        setLoading(true);
        setError(false);

        const paths = await fetchSubmittedImages();

        if (cancelled) {
          return;
        }

        const results = paths.map((path) => {
          // If the backend returns paths like "/image/raw/xyz.png", use it directly.
          // Otherwise, construct it.
          const imageUrl = path.startsWith("/")
            ? `${API_BASE_URL}${path}`
            : `${API_BASE_URL}/image/raw/${path}`;

          // Extract a name for the team from the path
          const filename = path.split("/").pop() || path;
          const team = filename.replace(/\.[^/.]+$/, ""); // Remove extension

          return {
            team,
            imageUrl,
          };
        });

        setMemes(results);
      } catch (e) {
        if (!cancelled) {
          console.error("loadSubmissions failed (likely CORS or Network Error):", e);
          setError(true);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadSubmissions();

    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <div className="meme-loading">
        CHECKING SUBMISSIONS...
      </div>
    );
  }

  if (error) {
    return (
      <div className="meme-loading">
        COULD NOT LOAD SUBMISSIONS.
      </div>
    );
  }

  if (memes.length === 0) {
    return (
      <div className="meme-loading">
        NO MEMES HAVE BEEN PUSHED YET.
      </div>
    );
  }

  return (
    <div className="submitted-meme-scroll">
      {memes.map((meme) => (
        <div
          className="submitted-meme"
          key={meme.team}
        >
          <div className="submitted-meme-frame">
            <img
              className="meme-image"
              src={meme.imageUrl}
              alt={`Meme ${meme.team}`}
              draggable={false}
              loading="lazy"
            />
          </div>

          <div className="submitted-meme-team">
            {meme.team}
          </div>
        </div>
      ))}
    </div>
  );
}

function TeamMemberPage({
  teamSize,
  teamMemberNumber,
  onTeamMemberChange,
}: {
  teamSize: number | null;
  teamMemberNumber: number | null;
  onTeamMemberChange: (value: number) => void;
}) {
  const effectiveTeamSize =
    teamSize && teamSize >= 1 && teamSize <= 3
      ? teamSize
      : 1;

  const memberChoices = Array.from(
    { length: effectiveTeamSize },
    (_, index) => index + 1,
  );

  if (effectiveTeamSize === 1) {
    return (
      <div className="step-body lone-wolf-body">
        <div className="lone-wolf-message">
          <strong>
            Lone wolf, all the best!
          </strong>

          <span>
            You have been assigned as member 1
          </span>

          <span className="caption-work-message">
            You'll work on{" "}
            <strong>caption 1</strong>.
          </span>
        </div>

        <img
          className="lone-wolf-image"
          src={LONE_WOLF_IMAGE}
          alt="Lone wolf"
          draggable={false}
        />
      </div>
    );
  }

  return (
    <div className="step-body centered-body">
      <p className="member-selection-title">
        Which team member are you?
      </p>

      <p className="member-selection-hint">
        Click number to select
      </p>

      <div className="choice-list">
        {memberChoices.map((member) => {
          const selected =
            teamMemberNumber === member;

          return (
            <button
              key={member}
              type="button"
              className={
                selected ? "is-selected" : ""
              }
              aria-pressed={selected}
              onClick={() =>
                onTeamMemberChange(member)
              }
            >
              {member}
            </button>
          );
        })}
      </div>

      {teamMemberNumber && (
        <div className="caption-work-message">
          You'll work on{" "}
          <strong>
            caption {teamMemberNumber}
          </strong>
        </div>
      )}
    </div>
  );
}

function PageBody({
  content,
  pageIndex,
  teamSize,
  teamMemberNumber,
  onTeamNameChange,
  onTeamSizeChange,
  onTeamMemberChange,
}: {
  content: (typeof pages)[number]["content"];
  pageIndex: number;
  teamSize: number | null;
  teamMemberNumber: number | null;
  onTeamNameChange: (value: string) => void;
  onTeamSizeChange: (value: number) => void;
  onTeamMemberChange: (value: number) => void;
}) {
  switch (content.kind) {
    case "button":
      return (
        <div className="step-body centered-body">
          <a
            className="figma-button"
            href={content.href}
            target="_blank"
            rel="noreferrer"
          >
            {content.text}
          </a>
        </div>
      );

    case "setup-git":
      return (
        <div className="step-body setup-body">
          <div className="step-highlight">
            {content.highlight}
          </div><br /><br />

          <a
            className="download-label"
            href={content.download.href}
            target="_blank"
            rel="noreferrer"
          >
            {content.download.text}
          </a>

          <Terminal steps={content.steps} />
        </div>
      );

    case "fork":
      return (
        <div className="step-body fork-body">
          <p>
            {content.description.map(
              (line, index) => (
                <span
                  key={`${line}-${index}`}
                >
                  {line}
                  <br />
                </span>
              ),
            )}
          </p>

          <a
            className="figma-button"
            href={content.button.href}
            target="_blank"
            rel="noreferrer"
          >
            {content.button.text}
          </a>

          <Terminal steps={content.steps} />
        </div>
      );

    case "input":
      return (
        <div className="step-body centered-body">
          <input
            className="figma-input"
            type="text"
            placeholder={content.placeholder}
            defaultValue={readStorage(
              STORAGE_KEYS.teamName,
            )}
            onChange={(event) =>
              onTeamNameChange(
                event.target.value,
              )
            }
          />
        </div>
      );

    case "choices":
      if (pageIndex === 5) {
        return (
          <div className="step-body centered-body">
            <div className="choice-list">
              {content.choices.map((choice) => {
                const size = Number(choice);
                const selected =
                  teamSize === size;

                return (
                  <button
                    key={choice}
                    type="button"
                    className={
                      selected
                        ? "is-selected"
                        : ""
                    }
                    aria-pressed={selected}
                    onClick={() =>
                      onTeamSizeChange(size)
                    }
                  >
                    {choice}
                  </button>
                );
              })}
            </div>
          </div>
        );
      }

      if (pageIndex === 6) {
        return (
          <TeamMemberPage
            teamSize={teamSize}
            teamMemberNumber={
              teamMemberNumber
            }
            onTeamMemberChange={
              onTeamMemberChange
            }
          />
        );
      }

      return (
        <div className="step-body centered-body">
          {content.description && (
            <p>{content.description}</p>
          )}

          <div className="choice-list">
            {content.choices.map((choice) => (
              <button
                key={choice}
                type="button"
              >
                {choice}
              </button>
            ))}
          </div>
        </div>
      );

    case "lone-wolf":
      return (
        <div className="step-body lone-wolf-body">
          <div className="lone-wolf-message">
            <strong>
              {content.message}
            </strong>

            <span>
              {content.captionMessage}
            </span>
          </div>

          <img
            className="lone-wolf-image"
            src={content.image}
            alt="Lone wolf"
            draggable={false}
          />
        </div>
      );

    case "memes":
      if (pageIndex === pages.length) {
        return <SubmittedMemes />;
      }

      return <MemeGallery teamSize={teamSize} />;

    case "terminal":
      return (
        <div className="step-body push-body">
          <Terminal steps={content.steps} />
        </div>
      );

    default:
      return null;
  }
}

function LockedPage({
  onPrevious,
}: {
  onPrevious: () => void;
}) {
  return (
    <section className="locked-area">
      <div className="locked-message">
        <div className="locked-icon">
          🔒
        </div>

        <h2>
          THIS AREA IS NOT YET
          <br />
          AVAILABLE FOR EXPLORATION!
        </h2>

        <p>
          The next part of GitGud has not been
          unlocked yet. Check back when the
          organisers open it up.
        </p>

        <button
          type="button"
          className="figma-button"
          onClick={onPrevious}
        >
          GO BACK
        </button>
      </div>
    </section>
  );
}

export default function ContentPage({
  pageIndex,
  onPrevious,
  onNext,
  onThemeChange,
  onMemesClick,
  maxAllowedPage,
  teamSize,
  teamMemberNumber,
  onTeamNameChange,
  onTeamSizeChange,
  onTeamMemberChange,
  showLockMessage,
}: ContentPageProps) {
  const page = pages[pageIndex - 1];

  const locked = pageIndex > maxAllowedPage;

  if (!page) {
    return null;
  }

  if (locked) {
    return (
      <section className="page content-page">
        <div className="content-card">
          <Navbar
            onThemeChange={onThemeChange}
            onMemesClick={onMemesClick}
            maxAllowedPage={maxAllowedPage}
          />

          <LockedPage
            onPrevious={onPrevious}
          />

          <Ticker />

          <div className="page-navigation">
            <ArrowButton
              direction="left"
              onClick={onPrevious}
            />

            <div className="page-counter">
              {String(pageIndex).padStart(2, "")} /{" "}
              {String(pages.length).padStart(2, "")}
            </div>

            {/* Next button is hidden when locked */}
            <div className="page-arrow page-arrow-placeholder" style={{ visibility: "hidden" }}>
              →
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="page content-page">
      <div className="content-card">
        <Navbar
          onThemeChange={onThemeChange}
          onMemesClick={onMemesClick}
          maxAllowedPage={maxAllowedPage}
        />

        {showLockMessage && (
          <div className="lock-toast">
            THIS AREA IS NOT YET AVAILABLE
            FOR EXPLORATION!
          </div>
        )}

        <main className="content-content">
          <motion.div
            className="content-inner"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.span
              className="eyebrow wenoselect"
              variants={itemVariants}
            >
              {page.label}
            </motion.span>

            <motion.h2
              className="wenoselect"
              variants={itemVariants}
            >
              {page.title
                .split("\n")
                .map((line, index) => (
                  <span
                    key={`${line}-${index}`}
                  >
                    {line}
                    <br />
                  </span>
                ))}
            </motion.h2>

            <motion.div
              className="content-placeholder"
              variants={itemVariants}
            >
              <PageBody
                content={page.content}
                pageIndex={pageIndex}
                teamSize={teamSize}
                teamMemberNumber={
                  teamMemberNumber
                }
                onTeamNameChange={
                  onTeamNameChange
                }
                onTeamSizeChange={
                  onTeamSizeChange
                }
                onTeamMemberChange={
                  onTeamMemberChange
                }
              />
            </motion.div>
          </motion.div>
        </main>

        <Ticker />

        <div className="page-navigation">
          <ArrowButton
            direction="left"
            onClick={onPrevious}
          />

          <div className="page-counter">
            {String(pageIndex).padStart(2, "")} /{" "}
            {String(pages.length).padStart(2, "")}
          </div>

          <ArrowButton
            direction="right"
            onClick={onNext}
          />
        </div>
      </div>
    </section>
  );
}