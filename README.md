# dih-webapp

__Build status:__

| `dev` | `master`|
| :--  |:--|
|[![CircleCI](https://circleci.com/gh/capraconsulting/dih-webapp/tree/dev.svg?style=svg&circle-token=a63cb3349231317b6f5e6d298f3f49a82a7f382a)](https://circleci.com/gh/capraconsulting/dih-webapp/tree/dev)|[![CircleCI](https://circleci.com/gh/capraconsulting/dih-webapp/tree/master.svg?style=svg&circle-token=a63cb3349231317b6f5e6d298f3f49a82a7f382a)](https://circleci.com/gh/capraconsulting/dih-webapp/tree/master)|


## Workflow

1. Get a task on JIRA by talking to you teammates and looking at the sprint backlog.
2. Create a new branch  from the `dev`-branch, naming it using our branch naming strategy described below.
3. Code away and commit often. Try to follow [good commit practice](http://chris.beams.io/posts/git-commit/). Remember to write tests (and run them).
4. When you're done (see definition of done on GitHub), create a pull request with reference to the JIRA-issue (preferably a link) and an overview of what the pull request is about. Await code review (you can tag people or yell for them on Slack to get your review faster).
5. When you've reworked your code after the code review, the pull request will be merged.

### Branch naming strategy
The project has a strategy for what to name our branches, so that changes in them are easily traceable to user stories and issues in our issue tracking system JIRA. Another reason for having a naming strategy is that it makes it easy to find distinct types of proposed changes, as well as what's being worked on.

Name your branches in the following way, where `DIH-num` is a task ID on JIRA:

* If it's a feature (new functionality) name the branch `feature/DIH-num`.
* If it's a bugfix name the branch `bugfix/DIH_num`.
* If it's a technical task, name the branch `tech/DIH-num`.
* If it's a testing task (no implementation), name the branch `test/DIH-num`.

## Setup

1. Install Node and Npm.
2. Setup [dih-api](http://github.com/capraconsulting/dih-api).
3. Run `npm install`.
4. Run `npm run dev`.
5. Reach the app on port 3000.

## Tests
On the webapp we have end-to-end tests with Selenium. It depends on Java, so install that first. Then get started with:

1. Run `npm install`
2. Add environment variables for [SuaceLabs](https://saucelabs.com): `SAUCE_USERNAME` and `SAUCE_ACCESS_KEY`;
2. Run `npm run selenium install`
3. Run `npm test` to run tests


## Building with Docker

The initial building of the web app can be done using the following command:

```bash
$ docker build -t dih-webapp .
```

After build, the project can be ran using:

```bash
$ docker run --name dih-webapp -p 3000:3000 -d dih-webapp npm run dev
```

The project can now be reached by navigating your browser to
[http://localhost:3000](http://localhost:3000).
