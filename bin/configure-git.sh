#!/usr/bin/env bash

# Configure git for project only

# Useful cheat sheet - http://cheat.errtheblog.com/s/git
# More readable version - https://gist.github.com/iansheridan/870778
# A few git tips you didn't know about - http://mislav.uniqpath.com/2010/07/git-tips
# Best git workflow seen - https://gist.github.com/jbenet/ee6c9ac48068889b0912
# Workflow alternative - http://docs.scipy.org/doc/numpy/dev/gitwash/development_setup.html
# Git merge vs. rebase - http://mislav.uniqpath.com/2013/02/merge-vs-rebase/

# NOTE: Add --global flag if you want changes across whole system, not just repository
GC='git config'

# Default user
$GC user.name "CoderDojo mentor"
$GC user.email "someone@coderdojoscotland.com"

# Settings

# 'git pull' rebases by default (alternative is confusing merge commits)
# https://gist.github.com/jbenet/ee6c9ac48068889b0912
# http://mislav.uniqpath.com/2010/07/git-tips/
$GC branch.autosetuprebase always

# Ensure 'git push' only pushes current local branch, not all local branches that have same name on remote
# http://mislav.uniqpath.com/2010/07/git-tips/
$GC push.default tracking

# 'git pull' rebases by default. May duplicate autosetuprebase above
# http://mislav.uniqpath.com/2013/02/merge-vs-rebase
$GC --bool pull.rebase true


# Display
# https://gist.github.com/jbenet/ee6c9ac48068889b0912

# Print out the ref names of any commits that are shown by the log command.
# If short is specified, the ref name prefixes refs/heads/, refs/tags/ and refs/remotes/ will not be printed
$GC log.decorate short

# true or auto if you want such output to use color when written to the terminal
$GC color.ui auto

# true or auto, use colors only when the output is to the terminal
$GC color.interactive auto

# true or auto, patch commands will only use color when output is to the terminal
$GC color.diff auto

# auto (or true), in which case colors are used only when the branch output is to a terminal
$GC color.branch auto

# auto (or true), in which case colors are used only when the status output is to a terminal
$GC color.status auto

# A boolean to enable/disable colored output when the pager is in use
$GC pager.status true

# A boolean to enable/disable color in the output of git-show-branch(1).
$GC pager.show-branch true

# A boolean which can enable or disable sequence numbers in patch subjects.
# It defaults to "auto" which enables it only if there is more than one patch
$GC format.numbered auto

# Set whitespace fixing settings to both prevent trailing whitespace an not mangle indentation
# see http://stackoverflow.com/questions/3372822/git-trim-whitespace
$GC core.whitespace trailing-space,space-before-tab
$GC apply.whitespace fix


# Aliases
# https://gist.github.com/jbenet/ee6c9ac48068889b0912

# Detailed short log
$GC alias.slog "log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit --"

# View file status
$GC alias.staged "diff --cached"
$GC alias.unstaged diff
$GC alias.both "diff HEAD"

# Amend last commit
$GC alias.amend "commit --amend"

# Undo :-)
$GC alias.undo "reset --hard HEAD^"