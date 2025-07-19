/**
 * build Related to compilation, such as publishing versions, or changes to project builds or dependencies
 * chore Other changes, such as changes to the build process, or additions of dependencies, tools, etc.
 * docs Documentation changes
 * feat New features, new functionalities
 * fix Bug fixes
 * perf Optimizations, such as improving performance or user experience
 * refactor Code refactoring
 * revert Revert to a previous version
 * style Code formatting changes
 * test Test case changes
 */
/* eslint-env node */
module.exports = {
  extends: ['@commitlint/config-conventional'],
}