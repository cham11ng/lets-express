# Lets express

[![Build Status](https://travis-ci.org/cham11ng/lets-express.svg?branch=master)](https://travis-ci.org/cham11ng/lets-express)

Application for building APIs with [Express.js](http://expressjs.com/)

Comes with:

* [ES6](http://babeljs.io/learn-es2015/) features/modules
* [Bookshelf](http://bookshelfjs.org/) ORM and [Knex](http://knexjs.org/) migrations
* PostgreSQL (default) with support for MySQL and SQLite
* [ESLint](http://eslint.org/) for code linting
* Application configuration using [dotenv](https://github.com/motdotla/dotenv)
* Pretty error reporting using [youch](https://github.com/poppinss/youch)

---

## Prerequisite

* [Node.js](https://yarnpkg.com/en/docs/install) - 8.9.2 or above
* [Yarn](https://yarnpkg.com/en/docs/install) - 1.3.2 or above
* [NPM](https://docs.npmjs.com/getting-started/installing-node) - 5.6.0 or above

## Setup

Clone the repository, install the dependencies and get started right away.

    $ git clone git@github.com:cham11ng/lets-express.git <application-name>
    $ cd <application-name>
    $ yarn
    
Make a copy of `.env.example` as `.env` and update your application details and database credentials. Now, run the migrations and seed the database.

    $ yarn migrate
    $ yarn seed

Finally, start the application.

    $ yarn start:dev (For development)
    $ yarn start (For production)

Navigate to http://localhost:8000/api/ to verify installation.

## Contributing

For contribution and feature requests, please create an [issue](https://github.com/cham11ng/lets-express/issues) first.

## License

lets-express is under [MIT License](LICENSE).
