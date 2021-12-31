# Backend

11 iternal api's created and used for this project.
2 external api's were used for this project (not shown in list below: cloudinary api and google maps api.)

| endpoint                  | method   | Description                    |
| --------------------------|----------|--------------------------------|
| `/captures`               | `GET`    | Get Captures For Google Map    |
| `/capture/vote`           | `PUT`    | Updates Capture/Author/Voter   |
| --------------------------|----------|--------------------------------|
| `/image/uploadCapture`    | `POST`   | Upload Captured Image to cloud |
| `/image/uploadAvatar`     | `POST`   | Upload Avatar Image to cloud   |
| --------------------------|----------|--------------------------------|
| `/user/signIn`            | `POST`   | Sign in User / Update Stats    |
| `/user/new`               | `POST`   | Register new user              |
| `/user/info`              | `POST`   | Get User Info                  |
| `/user/add`               | `PUT`    | Update 2 User's friend request |
| `/user/reply`             | `PUT`    | Update 2 User's friend request |
| `/user/names`             | `GET`    | Get all unique names           |
| `/users`                  | `GET`    | Get all Users                  |
| --------------------------|----------|--------------------------------|

## Installation

First run `yarn install` in the cd server.
Make sure you .env is all set up with: PORT, MONGO_URI, and Cloudinary.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:7777](http://localhost:7777) to view it in the browser.