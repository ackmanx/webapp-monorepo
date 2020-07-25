# Webapp Mono-Repo

Express application that hosts multiple apps using a single Heroku instance.

## Developing an Application

Start the Express server with `yarn start` from project root. Then start the FE build for whichever application you want to develop.


## Adding a New Application

There are multiple `package.json` files in this repo:
* `packagejson`: This is the main application and contains the server-side dependencies for every hosted app and some tooling
* `apps/<app-name>/package.json`: This is primarily the front-end side of each hosted app

To add a new application, you need to configure a few things:

1. Scaffold the app
    - `/apps/<app-name>/server/routes/router.js` to point the app to a template file
    - `/apps/<app-name>/client/index.js` as a starting point for the UI
    - `/apps/<app-name>/client/images/fav-icon.png`
        - If using a custom domain
1. Register the new router with `app`
1. Update `heroku.sh` for deployment
1. Set up DNS if using a custom domain (see below)
1. Add a link to it in `app-selector.ejs`

These apps are all currently SPAs and do not have their own custom server side templates

## Deploying

1. Just push to Heroku, `git push heroku`
1. Heroku will install dependencies then run `heroku-postbuild`
    - This will build all FE bundles
1. Heroku will then run `yarn start`
    - There's no build step for node

### DNS

#### Heroku (Host)

1. Go to settings for this application and find the Domains section
1. Add Domain
    - Example: www.majerus.me
1. Heroku will provide a DNS target after you add it
    - Example: asymmetrical-turtle-alw166i127vwd2j995ucszcp.herokudns.com

#### Namecheap (DNS provider)

1. Go to domain settings (manage domain)
1. Go to Advanced DNS
1. Edit the CNAME record so that the "value" points to the DNS target Heroku provided
    - TTL: Automatic

## Cavet

One big disadvantage, and maybe deal-breaker is this limits your node applications to the same stack and library versions. Being there's a single Express server running we have to have all dependencies for the backend of all apps in this one instance. So, if node app A runs an older version of library X, then node app B may not be able to use latest versions if library X has breaking changes.

But, maybe this is also an advantage!
