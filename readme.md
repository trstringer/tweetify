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
    //
    // (optional) allows you to specify
    // how the tweet should be prefixed. i.e. if you want 
    // '{Blog Post}: ' in front of your tweet, the below 
    // spec will give you that
    prefix: {
        container: 'curley-brackets', // or 'brackets' for []
        text: 'Blog Post',
        divider: ': ' // other example... ' - ', ' :: ', etc.
    },
    //
    // (optional)
    hashtags: ['javascript', 'node'], // don't need a prefixing '#'
    //
    // (optional) if you only want a single tweet (truncated if too many 
    // chars) then either don't defined 'wrap' or set it to 
    // false. but if you want all of the text to be tweeted 
    // then set 'wrap' to true and overflow text will be broken 
    // into multiple tweets
    wrap: true,
    //
    // (optional) if you want to add a link to the tweet then specify 
    // it here. you can also opt to have it wrap to all wrapped 
    // tweets. if wrap is undefined or false then the link will only 
    // be displayed for the first tweet
    link: {
        url: '<your_url>',
        wrap: true // optional, defaults to false
    }
};

var tweets = tweetify(tweet);

for (var i = 0; i < tweets.length; i++) {
    console.log(tweets[i]);
}
```