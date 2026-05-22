# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Git Operations

**Every code change must be committed and pushed to GitHub immediately.**

After any file edit or addition:
1. Stage the changes: `git add <files>`
2. Commit with a descriptive message: `git commit -m "..."`
3. Push to remote: `git push origin <branch>`

If the repository has not been initialized yet:
```
git init
git remote add origin <GITHUB_REPO_URL>
git push -u origin main
```

Always create feature branches for new work:
```
git checkout -b feature/<description>
```

## Project Overview

Real estate application. Stack and commands will be added here as the project is scaffolded.
