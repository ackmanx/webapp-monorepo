# Webapp Mono-Repo
Express application that hosts multiple apps using a single Heroku instance.

## Entry Points
`https://webapp-monorepo.herokuapp.com`: Heroku-hosted main app entry point
`http://www.majerus.me`: Custom domain example main app entry point
`http://www.ialreadydidthat.com`: Custom domain app-specific entry point

## Developing an Application
Start the Express server with `yarn start` from project root. Then start the FE build for whichever application you want to develop.

If you aren't seeing server logs, make sure you have `DEBUG=mr:*` set for the debug module to output

## Adding a New Application
The idea is that all applications run off the same server and then add their own custom server code scoped to their app. Being a FE is just a built JS app, all FE should be able to be written however I want as long as they result a predictable bundle to reference.

There are multiple `package.json` files in this repo:
* `package.json`: This is the main application and contains the server-side dependencies for every hosted app and some tooling
* `apps/<app-name>/package.json`: The package file of a hosted app. This contains all FE dependencies as well as any imported BE dependencies used within this app folder. Yarn 2 requires dependencies to be explicitly listed if they are used, so you cannot just bank off of a parent `package.json` file.

To add a new application, you need to do a few things:

1. Copy/modify an existing app to use
1. Update the `package.json`
1. Update `build-all-frontends.sh` for deployment
1. Set up DNS if using a custom domain (see below)

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
