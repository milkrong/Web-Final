# Postify Music (PM)

## Introduction

The social and comment website to share personal interest about music. 
Customers can share their idea about popular music and share resources.

## Build Status
Success

## Build Setup

``` bash
# install dependencies
npm install
```
## Before Running
Add `key.js` in 'express-server/confog' as following:
``` javascript
module.exports = {
  mongoURI: '<mongdbURL>',
  secretKey: 'postify',
  osskey: '<OSSkey of Aliyun',
};
```

## Run
``` bash
npm start
```

## Pages

- Home page: On the main section, there are the most popular and recommended posts. On the left side, it is a profile card or login/register entry
- Personal page: Landing picture is on the top of page. And following section is history posts by user itself.
- Setting page: A list of seetings include:
    - Account setting: password and personal login information
    - Recommendation setting: seting users' preferences about music like choosing music categories.
    - Preference setting: Set theme in the users' home page
    - Communcations: Add and delete friends
- Admin Page: 
    - Administrator uses it to set what posts are recommended and stick to top.
    - Collecting website data.

## Framework and stack

- Boostrap4 https://getbootstrap.com/
- Font-awesome icons https://fontawesome.com/
- Hand write icons https://www.flaticon.com/packs/hand-drawn/
- Google fonts https://fonts.google.com/e
- Vue JS https://cn.vuejs.org/
- MongoDB https://www.mongodb.com
- Express https://expressjs.com
- Socket IO https://socket.io/
- Docker https://www.docker.com/

## To-do list

- Comment Function


## Last Update

2018-10-27
2018-12-10