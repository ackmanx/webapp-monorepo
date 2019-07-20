# 干净 Ganjing

# Apps

This mini mono-repo contains all the applications I host on my single Heroku instance. Each folder in the `apps` directory is a separate application. They have to first be registered with `master-slave` before you can serve them.

# Developing

To add a new application, you need to configure a few things:

1. Add a subdomain entry to `/etc/hosts` so you can access it
1. Register the application with the `master-server`
1. ??? Do I put npm scripts for each app in root `package.json` or run npm from each app's folder?
1. Update `webpack.config.js` `output.path` for the new application

# Deploying

Add instructions here on updating heroku and namecheap
