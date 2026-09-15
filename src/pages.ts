export type TerminalStep = {
  label: string;
  code: string;
};

export type PageContent =
  | {
      kind: "button";
      text: string;
      href: string;
    }
  | {
      kind: "setup-git";
      download: {
        text: string;
        href: string;
      };
      highlight: string;
      steps: TerminalStep[];
    }
  | {
      kind: "fork";
      description: string[];
      button: {
        text: string;
        href: string;
      };
      steps: TerminalStep[];
    }
  | {
      kind: "input";
      placeholder: string;
    }
  | {
      kind: "choices";
      description?: string;
      choices: string[];
    }
  | {
      kind: "lone-wolf";
      message: string;
      captionMessage: string;
      image: string;
    }
  | {
      kind: "memes";
    }
  | {
      kind: "terminal";
      steps: TerminalStep[];
    };

export type Page = {
  label: string;
  title: string;
  content: PageContent;
};

export const pages: Page[] = [
  {
    label: "Step One",
    title: "MAKE A\nGITHUB ACCOUNT",
    content: {
      kind: "button",
      text: "CLICK HERE",
      href: "https://github.com/signup",
    },
  },

  {
    label: "Step Two",
    title: "SETUP GIT",
    content: {
      kind: "setup-git",
      highlight: "CONNECT WITH GITHUB",
      download: {
        text: "DOWNLOAD",
        href: "https://git-scm.com/install/windows",
      },
      steps: [
        {
          label: "Set your email",
          code: 'git config --global user.email "your_email@example.com"',
        },
        {
          label: "Set username",
          code: 'git config --global user.name "your_username"',
        },
      ],
    },
  },

  {
    label: "Step Three",
    title: "FORK",
    content: {
      kind: "fork",
      description: [
        "Go to the PROJECT'S PAGE ON GITHUB and click",
        "the FORK button.",
      ],
      button: {
        text: "CLICK HERE TO GO TO GITHUB REPO",
        href: "https://github.com/kartinul/GitGud",
      },
      steps: [
        {
          label: "Initialize a repo",
          code: "git init",
        },
        {
          label: "Add origin",
          code: "git remote add origin (your-fork-url)",
        },
      ],
    },
  },

  {
    label: "Step Four",
    title: "ENTER TEAM NAME",
    content: {
      kind: "input",
      placeholder: "ENTER TEAM NAME",
    },
  },

  {
    label: "Step Five",
    title: "SELECT NO. OF MEMBERS\nIN YOUR TEAM",
    content: {
      kind: "choices",
      choices: ["1", "2", "3"],
    },
  },

  {
    label: "Step Six",
    title: "WHICH TEAM MEMBER\nARE YOU?",
    content: {
      kind: "choices",
      description: "Which team member are you?",
      choices: [],
    },
  },

  {
    label: "Choose your template!",
    title: "MEMES AVAILABLE:",
    content: {
      kind: "memes",
    },
  },

  {
    label: "Step Seven",
    title: "CHANGE BRANCH",
    content: {
      kind: "terminal",
      steps: [
        {
          label: "Change branch",
          code: "git checkout -b memes",
        },
        {
          label: "Add file",
          code: "git add .",
        },
        {
          label: "Do your first commit",
          code: 'git commit -m "first commit"',
        },
        {
          label: "Push your commit",
          code: "git push origin memes",
        },
      ],
    },
  },

  {
    label: "You did it!",
    title: "MEMES PUSHED",
    content: {
      kind: "memes",
    },
  },
];