# Tweetify

*The tweet-formatting module to make it easy*

## Install

```
npm install tweetify
```

## Usage

```javascript
var tweetify = require('tweetify');

var tweet = {
    text: 'this is my really long tweet that i want the ENTIRE world to read no matter what if you know what i mean and i think you know exactly what i mean every single time',
    // this prefix is optional, but it allows you to specify
    // how the tweet should be prefixed. i.e. if you want 
    // '{Blog Post}: ' in front of your tweet, the below 
    // spec will give you that
    prefix: {
        container: 'curley-brackets', // or 'brackets' for []
        text: 'Blog Post',
        divider: ': ' // other example... ' - ', ' :: ', etc.
    },
    hashtags: ['javascript', 'node'] // don't need prefixing #
};

var formattedTweet = tweetify(tweet);

console.log(formattedTweet);
```