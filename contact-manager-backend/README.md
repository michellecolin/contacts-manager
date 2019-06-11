# contacts manager Backend

### Install, Build, Run

#### Install Mongodb
If you don't have mongodb installed on your computer, you need to install it. 
Below are the installation instructions for MacOS, if you're running on another OS check the resources: https://docs.mongodb.com/manual/installation/
```
brew tap mongodb/brew
brew install mongodb-community@4.0
````

#### Run Mongodb

From a terminal, issue the following to run MongoDB (i.e. the mongod process) in the foreground.
```
mongod --config /usr/local/etc/mongod.conf
```

To begin using MongoDB, connect a mongo shell to the running instance. From a new terminal, issue the following:

```
mongo
```


#### Install other dependencies
```
npm i -g nodemon
npm install
```
#### Run
You can run using nodemon or npm. For npm:
````
npm start
````

For nodemon
````
nodemon index
