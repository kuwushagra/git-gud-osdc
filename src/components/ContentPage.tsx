import { motion, type Variants } from "motion/react";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Ticker from "./Ticker";
import { pages, type TerminalStep } from "../pages";
import "./ContentPage.css";
import LONE_WOLF_IMAGE from "../assets/images/lonewolf.jpg";

/*
 * TESTING SWITCH
 *
 * false = bypass the isUnlock lock.
 * true  = require isUnlock to exist in the source repository.
 */
const LOCK_ENABLED = false;

const GITHUB_REPO_API =
  "https://api.github.com/repos/kartinul/GitGud/contents";

const GITHUB_SUBMISSIONS_API =
  "https://api.github.com/repos/kartinul/GitGud/contents/submissions";

const RAW_GITHUB_BASE =
  "https://raw.githubusercontent.com/kartinul/GitGud/main/submissions";

const MEME_TEMPLATES_API =
  "https://api.memegen.link/templates/";

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
  memesLocked: boolean;
};

type MemeTemplate = {
  id: string;
  name: string;
  lines: number;
  blank: string;
  example: {
    text: string[];
    url: string;
  };
};

type GitHubSubmission = {
  name: string;
  path: string;
  type: string;
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
            className={`terminal-copy${
              copied ? " is-copied" : ""
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

let memeTemplatesPromise:
  Promise<MemeTemplate[]> | null = null;

function fetchMemeTemplates(): Promise<MemeTemplate[]> {
  if (!memeTemplatesPromise) {
    memeTemplatesPromise = fetch(
      MEME_TEMPLATES_API,
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Failed to fetch meme templates: ${response.status}`,
          );
        }

        return response.json();
      })
      .then((data) => {
        if (!Array.isArray(data)) {
          throw new Error(
            "Invalid meme template response.",
          );
        }

        return data as MemeTemplate[];
      });
  }

  return memeTemplatesPromise;
}

function encodeMemeText(value: string): string {
  return value
    .trim()
    .replace(/~/g, "~~")
    .replace(/_/g, "__")
    .replace(/-/g, "--")
    .replace(/ /g, "_")
    .replace(/\?/g, "~q")
    .replace(/&/g, "~a")
    .replace(/%/g, "~p")
    .replace(/#/g, "~h")
    .replace(/\//g, "~s")
    .replace(/\\/g, "~b")
    .replace(/</g, "~l")
    .replace(/>/g, "~g")
    .replace(/"/g, "~d")
    .replace(/'/g, "~r")
    .replace(/\n/g, "~n");
}

function MemeGallery() {
  const [templates, setTemplates] = useState<
    MemeTemplate[]
  >([]);

  const [selectedTemplate, setSelectedTemplate] =
    useState(getSelectedTemplate);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    fetchMemeTemplates()
      .then((allTemplates) => {
        if (!cancelled) {
          setTemplates(allTemplates);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setError(true);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const selectTemplate = (templateId: string) => {
    setSelectedTemplate(templateId);

    writeStorage(
      STORAGE_KEYS.selectedTemplate,
      templateId,
    );
  };

  if (loading) {
    return (
      <div className="meme-loading">
        LOADING MEME TEMPLATES...
      </div>
    );
  }

  if (error) {
    return (
      <div className="meme-loading">
        COULD NOT LOAD MEME TEMPLATES.
      </div>
    );
  }

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
        CLICK A TEMPLATE TO SELECT IT
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
              className={`meme-card${
                isSelected ? " is-selected" : ""
              }`}
              onClick={() =>
                selectTemplate(template.id)
              }
              aria-pressed={isSelected}
              title={`Select ${template.name} (${template.id})`}
            >
              <div className="meme-card-image-wrap">
                <img
                  className="meme-image"
                  src={template.blank}
                  alt={template.name}
                  draggable={false}
                  loading="lazy"
                />

                {isSelected && (
                  <span className="meme-selected-badge">
                    SELECTED ✓
                  </span>
                )}

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

async function fetchGitHubSubmissions(): Promise<
  GitHubSubmission[]
> {
  const response = await fetch(
    GITHUB_SUBMISSIONS_API,
    {
      headers: {
        Accept: "application/vnd.github+json",
      },
    },
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch submissions: ${response.status}`,
    );
  }

  const data = await response.json();

  if (!Array.isArray(data)) {
    throw new Error(
      "Invalid GitHub submissions response.",
    );
  }

  return data.filter(
    (item): item is GitHubSubmission =>
      item &&
      item.type === "dir" &&
      typeof item.name === "string",
  );
}

async function fetchSubmissionText(
  submissionName: string,
  filename: string,
): Promise<string> {
  const response = await fetch(
    `${RAW_GITHUB_BASE}/${encodeURIComponent(
      submissionName,
    )}/${filename}`,
  );

  if (!response.ok) {
    return "";
  }

  return (await response.text()).trim();
}

async function buildSubmissionImage(
  submissionName: string,
): Promise<string | null> {
  const memeName = await fetchSubmissionText(
    submissionName,
    "meme_name.txt",
  );

  if (!memeName) {
    return null;
  }

  const captions: string[] = [];

  for (let index = 1; index <= 10; index += 1) {
    const caption = await fetchSubmissionText(
      submissionName,
      `caption${index}.txt`,
    );

    if (!caption) {
      break;
    }

    captions.push(encodeMemeText(caption));
  }

  const captionPath =
    captions.length > 0
      ? `/${captions.join("/")}`
      : "";

  return `https://api.memegen.link/images/${encodeMemeText(
    memeName,
  )}${captionPath}.png`;
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

        const submissions =
          await fetchGitHubSubmissions();

        const results = await Promise.all(
          submissions.map(async (submission) => {
            const imageUrl =
              await buildSubmissionImage(
                submission.name,
              );

            if (!imageUrl) {
              return null;
            }

            return {
              team: submission.name,
              imageUrl,
            };
          }),
        );

        if (cancelled) {
          return;
        }

        setMemes(
          results.filter(
            (
              result,
            ): result is SubmittedMeme =>
              Boolean(result),
          ),
        );
      } catch {
        if (!cancelled) {
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
        CHECKING GITHUB SUBMISSIONS...
      </div>
    );
  }

  if (error) {
    return (
      <div className="meme-loading">
        COULD NOT LOAD GITHUB SUBMISSIONS.
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
              alt={`Meme submitted by ${meme.team}`}
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

function isUnlockAvailable(): Promise<boolean> {
  if (!LOCK_ENABLED) {
    return Promise.resolve(true);
  }

  return fetch(
    `${GITHUB_REPO_API}/isUnlock`,
    {
      headers: {
        Accept: "application/vnd.github+json",
      },
      cache: "no-store",
    },
  )
    .then((response) => response.ok)
    .catch(() => false);
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
          </div><br/><br/>

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

      return <MemeGallery />;

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
  memesLocked,
  teamName,
  teamSize,
  teamMemberNumber,
  onTeamNameChange,
  onTeamSizeChange,
  onTeamMemberChange,
  showLockMessage,
}: ContentPageProps) {
  const page = pages[pageIndex - 1];

  const [unlocked, setUnlocked] =
    useState(!LOCK_ENABLED);

  const [checkingLock, setCheckingLock] =
    useState(LOCK_ENABLED);

  useEffect(() => {
    let cancelled = false;

    if (!LOCK_ENABLED) {
      setUnlocked(true);
      setCheckingLock(false);
      return;
    }

    setCheckingLock(true);

    isUnlockAvailable().then((available) => {
      if (!cancelled) {
        setUnlocked(available);
        setCheckingLock(false);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [pageIndex]);

  const locked =
    LOCK_ENABLED &&
    pageIndex > 3 &&
    (!unlocked || checkingLock);

  if (!page) {
    return null;
  }

  if (locked && !checkingLock) {
    return (
      <section className="page content-page">
        <div className="content-card">
          <Navbar
            onThemeChange={onThemeChange}
            onMemesClick={onMemesClick}
            memesLocked={memesLocked}
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

            <ArrowButton
              direction="right"
              onClick={onNext}
            />
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
            memesLocked={memesLocked}
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