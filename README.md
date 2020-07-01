# Heroku Controller

# Apps

This mini mono-repo contains all the applications I host on my single Heroku instance. Each folder in the `apps` directory is a separate application. They have to first be registered with `master-slave` before you can serve them.


# Adding a New Application

To add a new application, you need to configure a few things:

1. Scaffold the app
    * `/apps/<app-name>/server/routes/router.js` to point the app to a template file
    * `/apps/<app-name>/client/index.js` as a starting point for the UI
    * `/apps/<app-name>/client/images/fav-icon.png`
1. Register the new router with the `master-server`
1. Create npm scripts in `package.json`
    * `<app-name>:build:prod`
    * `<app-name>:build:watch`
    * `<app-name>:clean`
1. Add a subdomain entry to `/etc/hosts` so you can access it
    * If there's no TLD in the URL, Express won't pick up the subdomain in the request object
1. Add a link to it in `app-selector.ejs`


# Developing

When developing, always start the node server at `npm start` and then whichever FE app you want to work on.


# Deploying

Add instructions here on updating heroku and namecheap
