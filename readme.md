# Moxie Fitness Node Backend

API project for the Moxie Fitness mobile & web applications to consume.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

Clone the repository

```
git clone url
```

Install the dependencies in packages.json

```
npm install
```

**Setting up CI/CD with GCP**

- Go your Google Cloud Console
- Go to APIs & Services
- Credentials > Create credentials > Service account key
- Select Google Compute Engine & Create
- Go to your GitLab project
- Go to Settings > CI/CD > variables 'GCLOUD_SERVICE_KEY' value to be the google service json value outputted on the previous step
- Go to Google Cloud Console > Create Bucket & create a new bucket (bucket name used on last step)
- Set your `GCP_PROJECT_ID` variable in `.gitlab-ci.yml`
- Set your `GCP_BUCKET` variable in `.gitlab-ci.yml`

### Database

For help with sequelize : http://docs.sequelizejs.com/manual/installation/getting-started.html

###### Installing sequelize (if required)

- Run `npm install --save sequelize` in `/backend`
- Run `npm install -g sequelize-cli`

**Setting up Database**

- Rename the `config/config.example.js` file to `config/config.js`
- Otherwise, just update the config.js file with your Database enviroment credentials (by replacing the `process.env.*` variables).
- Go to .gitignore and uncomment the config files
- Note (not required): Ideally, you should set the `process.env.*` variables via an encrypted cloud variable at deployment time.
- **UPDATE:** You can now do this via setting the following on your gitlab variables:
  -- For Development: `DEV_DB_USERNAME, DEV_DB_PASSWORD, DEV_DB_NAME, DEV_DB_HOSTNAME`
  -- For Production: `PROD_DB_USERNAME, PROD_DB_PASSWORD, PROD_DB_NAME, PROD_DB_HOSTNAME`

**Squelize**

- [Sequelize Docs](http://docs.sequelizejs.com/) are life.
- I have added the following helpful scripts to easily handle migrations, seeding etc. They are found in packages.json
  -- Example: `npm run sql:migrate`
- Create a `config.json` file in `src/config/`, make it according to the sequelize docs so that sequelize cli can run against this json.

```
    "sql:migrate:undo": "npm run sql db:migrate:undo:all",
    "sql:migrate": "npm run sql db:migrate",
    "sql:seed:undo": "npm run sql db:seed:undo:all",
    "sql:seed": "npm run sql db:seed:all",
    "sql:s": "npm run sql:migrate:undo && npm run sql:migrate && npm run sql:seed",
    "sql": "./node_modules/sequelize-cli/lib/sequelize",
    "sqlize:s": "sequelize db:migrate:undo:all && sequelize db:migrate && sequelize db:seed:all"
```

## Setting Up Firebase Auth (opt)

Update the Firebase Credentials : Project Overview > Project Settings > Service Accounts

- Generate New Private Key and put file in `src/config` - Verify file name matches with what's in `src/server/middleware/index.js` - Rename the keys file to : `firebase.json`

**Running in Development**

- Don't forget to locally set your process.env variables if you're using them in `./config/config.js`
  -- Ex (`npm install cross-env -g` if you want to use cross-env): `cross-env DEV_DB_USERNAME=username DEV_DB_PASSWORD=password DEV_DB_NAME=dbname DEV_DB_HOSTNAME=hostname npm run start`
- This will start the application and create an sqlite database in your app dir.
  Just open [http://localhost:8000](http://localhost:8000).

```
npm install

npm start

```

## Project Structure

##### /migrations

Contains all the migrations for the databse, the order of the files is the order they will be
ran, top down.

##### /models

Maps all the tables to appropriate models. Set up the model relations ships here as well.

##### /seeders

Contains all the seeders for the database, again, order matter heres due to key contraints & all.
We use faker for randomly generated data.

##### /server/controllers

Controllers for our API. Each model will have a controller, and a list of mothods to be
used bye the /routes/index.js router.

##### /server/routes

Contains the router information for our API and mapping to the appropriate controller
function.

## Built With

- [Sequelize](http://docs.sequelizejs.com/) - Database ORM

## Authors

**Alan Negrete** -- [github](https://github.com/anegrete)
