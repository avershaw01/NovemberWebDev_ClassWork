# novemberWebDev
November Adv Web Dev work

ClassWork_Nov_11 <- This is the most up to date directory.

First, this repository does not contain the required .env files.
Go into ClassWork_Nov_11, and create a new file in each of the 3 main directories
Name it .env, and copy in the following data:

AuthServer/.env
```
ACCESS_TOKEN_SECRET={_____}
PORT=3001
```

NodeServer/.env
```
PORT=3002
DB_HOST={_____}
DB_USER=CSC3700
DB_PASSWORD={_____}
DB_NAME=CSC3700
CLIENT_ORIGIN=http://localhost:5174
DEBUG=false
```

ReactClient/.env
```
VITE_API_BASE_URL=http://localhost:3002
VITE_AUTH_URL=http://localhost:3001
```

NEXT, fill in all of the `{_____}` lines with your secret information.

Then, open the project in WebStorm, open 3 terminals
UNFINISHED, follow instructions posted