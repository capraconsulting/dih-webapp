# dih-webapp

## Setup

1. Install Node and Npm.
2. Setup [dih-api](http://github.com/capraconsulting/dih-api)
3. Run `npm install`
3. Run `npm run dev`
4Reach the app on port 3000.

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
