## Test Runner

## Components 

1) Containers - Test runner component is used to build the business logic
2) Components - 
    a) Test summary - Shows different Status and its associated count ex. total, running etc
    b) Test Card - Displays the table structure of the test description and current status

## Approach
Time spent - 3 hours.

Used promises to run the asynchronous tasks. Since we have to track the each async task we have subscribe to promise in loop. I tried using Promise.all but could not get hold of every async tasks status.

## Extention

Writting test cases
Testing edge cases

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

