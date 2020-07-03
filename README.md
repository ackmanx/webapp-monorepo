# Webapp Mono-Repo

POC for hosting my applications on a single Heroku instance that allows you to pay for one hobby dyno only

## Apps

This mini mono-repo contains all the applications I host on my single Heroku instance. Each folder in the `apps` directory is a separate application. They have to first be registered with `master-slave` before you can serve them.


## Adding a New Application

To add a new application, you need to configure a few things:

1. Scaffold the app
    * `/apps/<app-name>/server/routes/router.js` to point the app to a template file
    * `/apps/<app-name>/client/index.js` as a starting point for the UI
    * `/apps/<app-name>/client/images/fav-icon.png`
        * If using a custom domain
1. Register the new router with `app`
1. Create npm scripts in `package.json`
    * `<app-name>:build:prod`
    * `<app-name>:build:watch`
    * `<app-name>:clean`
1. Set up DNS if using a custom domain (see below)
1. Add a link to it in `app-selector.ejs`


## Deploying

### Building
1. Deploy the application
1. Tell Heroku via package script to build the front-ends (not tested yet)

### DNS
#### Heroku (Host)
1. Go to settings for this application and find the Domains section
1. Add Domain
    * Example: www.majerus.me
1. Heroku will provide a DNS target after you add it
    * Example: asymmetrical-turtle-alw166i127vwd2j995ucszcp.herokudns.com

#### Namecheap (DNS provider)
1. Go to domain settings (manage domain)
1. Go to Advanced DNS
1. Edit the CNAME record so that the "value" points to the DNS target Heroku provided
    * TTL: Automatic

## Cavet

One big disadvantage, and maybe deal-breaker is this limits your node applications to the same stack and library versions. Being there's a single Express server running we have to have all dependencies for the backend of all apps in this one instance. So, if node app A runs an older version of library X, then node app B may not be able to use latest versions if library X has breaking changes.

But, maybe this is also an advantage!
