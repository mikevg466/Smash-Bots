# Smash-Bots

## Deployed at

https://smashbots.herokuapp.com

## Description

Smash-Bots is a 2-D multiplayer online fighting game loosely based off the game Super Smash Brothers. 

Users are able to join an online lobby of 2-4 players.  Together, players enter a battle arena and use their customized robot to hit each other off of the screen until one player remains.

Technologies used are: Phaser, React, and Redux for the front end; Node, Express, and PostgreSQL for the backend; Socket.io for multiplayer functionality.

We really wanted our users to feel invested in their robot, so we implemented a weapon store where users can purchase different items with gold they earn on their accounts to customize their robot.


## To start from codebase
```
yarn install
createdb smash-bots
yarn seed
create a secrets.js with keys for:
 * process.env.GOOGLE_CLIENT_ID
 * process.env.GOOGLE_CLIENT_SECRET
 * process.env.GOOGLE_CALLBACK
yarn start-dev
```

## To test
```
yarn install
createdb smash-bots-test
yarn test
```
