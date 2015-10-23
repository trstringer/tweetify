var twitterMaxCharCount = 140;

function formatTweet(tweet) {
    var cutOff;
    if (tweet.cutOff === undefined) {
        cutOff = ' ...';
    }
    else {
        cutOff = tweet.cutOff;
    }
    
    var formattedTweet = '';
    
    if (tweet.prefix !== undefined) {
        if (tweet.prefix.text !== undefined) {
            switch (tweet.prefix.container) {
                case 'curley-brackets':
                    formattedTweet = '{' + tweet.prefix.text + '}';
                    break;
                case 'brackets':
                default:
                    formattedTweet = '[' + tweet.prefix.text + ']';
                    break;
            }
            formattedTweet += tweet.prefix.divider === undefined ? ': ' : tweet.prefix.divider;
        }
    }
    
    formattedTweet += tweet.text;
    
    if (formattedTweet.length > twitterMaxCharCount) {
        if (formattedTweet[twitterMaxCharCount - cutOff.length - 1] === ' ') {
            formattedTweet = formattedTweet.substring(0, twitterMaxCharCount - cutOff.length - 1) + cutOff;
        }
        else {
            formattedTweet = formattedTweet.substring(0, formattedTweet.substring(0, twitterMaxCharCount - cutOff.length - 1).lastIndexOf(' ')) + cutOff;
        }
    }
    
    return formattedTweet;
}

module.exports = formatTweet;