# dih-webapp

__Build status:__

| `dev` | `master`|
| :--  |:--|
|[![CircleCI](https://circleci.com/gh/capraconsulting/dih-webapp/tree/dev.svg?style=svg&circle-token=a63cb3349231317b6f5e6d298f3f49a82a7f382a)](https://circleci.com/gh/capraconsulting/dih-webapp/tree/dev)|[![CircleCI](https://circleci.com/gh/capraconsulting/dih-webapp/tree/master.svg?style=svg&circle-token=a63cb3349231317b6f5e6d298f3f49a82a7f382a)](https://circleci.com/gh/capraconsulting/dih-webapp/tree/master)|

## Setup

1. Install Node and Npm.
2. Setup [dih-api](http://github.com/capraconsulting/dih-api).
3. Run `npm install`.
4. Run `npm run dev`.
5. Reach the app on port 3000.

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
