```js
cd sample-mflix/server/
pm2 stop backend // dont forget this
git pull
yarn install
pm2 start backend
// if env changes garechau vani
pm2 start backend --update-env

pm2 log // for logs
```
