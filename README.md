# dih-webapp

__Build status:__

| `dev` | `master`|
| :--  |:--|
|[![CircleCI](https://circleci.com/gh/dropsintheocean/dih-webapp/tree/dev.svg?style=svg&circle-token=a63cb3349231317b6f5e6d298f3f49a82a7f382a)](https://circleci.com/gh/dropsintheocean/dih-webapp/tree/dev)|[![CircleCI](https://circleci.com/gh/dropsintheocean/dih-webapp/tree/master.svg?style=svg&circle-token=a63cb3349231317b6f5e6d298f3f49a82a7f382a)](https://circleci.com/gh/dropsintheocean/dih-webapp/tree/master)|

## Contribute
Dråpen i Havet/A Drop in the Ocean is a volunteer organization. If you want to contribute, take a look at the issues or contact the head of the organization Trude, at trude [@] drapenihavet [dot] no.


## Workflow
Want to contribute? Do the following:

1. Pick a task from the Issues-page. Want something easy to start with? Look at those labeled "up-for-grabs"
2. Create a new branch  from the `dev`-branch, naming it using our branch naming strategy described below.
3. Code away and commit often. Try to follow [good commit practice](http://chris.beams.io/posts/git-commit/). Remember to write tests (and run them).
4. When you're done (see definition of done below), create a pull request with reference to the GitHub-issue (preferably a link) and an overview of what the pull request is about. Await code review (you can tag people or yell for them on Slack to get your review faster).
5. When you've reworked your code after the code review, the pull request will be merged.

### Branch naming strategy
The project has a strategy for what to name our branches, so that changes in them are easily traceable to user stories and issues in our issue tracking system GitHub. Another reason for having a naming strategy is that it makes it easy to find distinct types of proposed changes, as well as what's being worked on.

Name your branches in the following way, where `#num` is a task ID on GitHub:

* If it's a feature (new functionality) name the branch `feature/#num`.
* If it's a bugfix name the branch `bugfix/#num`.
* If it's a technical task, name the branch `tech/#num`.
* If it's a testing task (no implementation), name the branch `test/#num`.

### Definition of Done
* Approved code review from at least one developer
* Meets coding standards set for the project
    * ESLinting OK
    * Generic code as far as possible
    * Comments where the code does not explain itself
    * Inline documentation (jsdoc)
    * Any relevant documentation added to GitHub Wiki

## Setup

1. Install Node and Npm.
2. Setup [dih-api](http://github.com/capraconsulting/dih-api).
3. Run `npm install`.
4. Run `npm run start:dev`.
5. Reach the app on port 3000.

The project has implemented Redux DevTools in order to make development more convenient. Install the [Chrome extension](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd) to use Redux DevTools.

## Development

We use [redux devtools](https://github.com/gaearon/redux-devtools), you can toggle this toolbar with `ctrl-h`.
## Tests
On the webapp we have end-to-end tests with Selenium, but the tests are run in [SauceLabs](https://saucelabs.com) instead of locally, to ensure that they work the same for everyone.  You want to register at their website, then add the environment variables `SAUCE_USERNAME` and `SAUCE_ACCESS_KEY`. locally. Then get started testing with:

1. Run `npm install`
2. Run `npm test` to run tests

The results can be viewed in your account on Sauce Labs.

`npm test` wil run both linter and end-to-end tests. You can run only end-to-end tests with `npm run test:e2e`.
