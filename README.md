# New York Times React Search

This application allows users to search for articles from the New York Times and save the links into a data base so users can read those articles later.

## DEMO

[New York Times React app](https://utnytreact.herokuapp.com/)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

You are required to have installed the following software:

* Node.js and NPM
* MongoDB

### Installing

**Install dependencies**

Go to the root of the project and run the following code:
```
npm install
```

**Change Port (Optional)**

Go to `/bin` and open the file `www` in a text editor.
Then look for the line:

```
app.set('port', process.env.PORT || 3000);
```

and change `3000` for the desired port.

**Change MongoDB URI**

Go to the root of the project and open 'server.js' in a text editor.
Then look for the line:
```
var dbConnection = process.env.MONGODB_URI || "mongodb://localhost/nytreact";
```

and change
```
"mongodb://localhost/nytreact"
```
for the desired MongoDB URI.

## Deployment

**Start MongoDB**

This step varies depending on how MongoDB was installed.

Example:

Open a terminal and run the following code:

```
mongod
```

For more information visit [MongoDB documentation](https://docs.mongodb.com/)

**Start the server**
Go to the root of the project and run the following code:

```
npm run start
```

## Built With

* [Express](http://expressjs.com/) - Node.js framework used
* [React](https://facebook.github.io/react/reactis) - JavaScript Library
* [Webpack](https://webpack.github.io/) - Module bundler
* [MongoDB](https://www.mongodb.com/) - NOSQL data base used
* [Mongoose](http://mongoosejs.com/) - MongoDB object modeling for node.js

## Authors

* **Kevin Angeles** - [nytreact](https://github.com/KevinAngeles/nytreact)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
