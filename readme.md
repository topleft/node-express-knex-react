### Setup


## Postgres

Install postgreSQL

```sh
$ brew update
$ brew install postgresql
```

### Develop locally

We need to run this postgres server in the background so that we can access it from our application. For this we will use a *brew service*.

```sh
$ brew tap homebrew/services
```

To see a list of your services and their statuses:

```sh
$ brew services list
```

To start up the postgres server:

```sh
$ brew services start postgresql
```

Checkout it out:

```sh
$ brew services list
```

Dont do it now, but just so you know...to shut it down:

```sh
$ brew services stop postgresql
```

Using the postgreSQL CLI tools, create a database locally:

```sh
$ createdb boiler
```

If you want a different DB name, update the variable `databaseName` in the *knexfile.js*.

Also there is a handy database browser called (Postico)[https://eggerapps.at/postico/].

Now install dependencies:

```sh
$ npm install
```

To create the *users* table run:

```sh
$ npm run knex migrate:latest
```

Then fire up the app:

```sh
$ gulp
```

This app runs on port 3001. To change that go into _src/server/server.js_
