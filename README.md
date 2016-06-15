# dih-webapp

## Building with Docker

The initial building of the web app can be done using the following command:

```bash
$ docker build -t geit/dih-webapp .
```

After build, the project can be ran using:

```bash
$ docker run -p 49160:3000 -d geit/dih-webapp
```

The project can now be reached by navigating your browser to
[http://localhost:49160](http://localhost:49160).
