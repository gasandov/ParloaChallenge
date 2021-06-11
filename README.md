# ParloaChallenge

NodeJs/TypeScript Challenge

## Routes

_/customers/invite_

Optional Params:
  - radius: {number} Distance that we can compare 
  - metricUnit: {string} In some future this can be an array of units, where we could determine if we sent the data in km, mts, ft, etc

## ENV Vars

- PARLOA_COORD_LAT: I'm storing both coordinates as env vars since I believe they could be change over time (e.g. if there are new offices);
- PARLOA_COORD_LONG
- NODE_ENV: development | test | production
- PORT