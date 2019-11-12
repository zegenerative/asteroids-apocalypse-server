# ✨ Asteroid Apocalypse - Game Server

## What this project is about

Asteroid Apocalypse is a game project built in 4 days during the Codaisseur web development bootcamp. The aim of the assignment was to build a full-stack multiplayer game app from scratch, implementing technology that supports multiple simultaneous games with a lobby system. The goal of our project was to implement a new technology (p5js) for the creation of custom graphics, and data streams.

- **[Related repos: Game Client](https://github.com/zegenerative/asteroid-apocalypse-client)**
  Game UI: players can sign-up and login, create new rooms and play the game.

## Table of contents:

- **[How to install](#how-to-install)**
- **[Technologies used](#technologies-used)**
- **[Contributors](#contributors)**

## How to install

1. Clone the git repository:

`git@github.com:zegenerative/asteroid-apocalypse-server.git`

2. In your terminal, run the following commands:

`npm install`

3. To start the terminal with nodemon, use the following command (this assumes nodemon is installed globally)

`nodemon index.js`

4. To start the code without tracking saved changes, you can simply run:

`node index`

As a standard we are using port 4000 for this server.

5. Checkout the **[Client ReadMe](https://github.com/zegenerative/asteroid-apocalypse-client/blob/development/README.md)** to install and run the client.

TESTING:
Room dummy data will automatically be added to your database (3 default rooms)

If you are currently running nodemon with the command mentioned above, nodemon index, the dummy data will be automatically added to your database, otherwise, you can simply run node index in your terminal.

## Technologies used

- PostgreSQL
- Sequelize
- Express
- JWT

For a more detailed overview of what's completed and what still needs to be implemented check: **[Project Board](https://github.com/zegenerative/asteroid-apocalypse-server/projects/1)**

## Contributors

- **[Ivana H](https://github.com/future-ruins)**
- **[Zeger de Vos](https://github.com/zegenerative)**
