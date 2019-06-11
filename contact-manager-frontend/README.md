# contacts manager

### Install, Build, Run

### install
```
npm install -g gulp
typings install
npm install
```

### Run
Only run gulp on the project's root directory (contact-manager-frontend), otherwise the build will fail.
Also, don't forget to run the rest API before running the frontend. You can find instructions on the __"contact-manager-backend"__ directory.
```
gulp
```
### Build dist

```
gulp build
```

### Run dist
You can run the dist using the http-server npm module
```
npm install http-server -g
```
Go to the dist folder and run the server
````
cd dist
http-server
````

Access the project through the provided url.
