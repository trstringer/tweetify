var twitterMaxCharCount = 140;

function formatHashtag(hashtag) {
    if (hashtag.substring(0, 1) !== '#') {
        hashtag = '#' + hashtag;
    }
    hashtag.replace(' ', '');
    return hashtag;
}

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
    
    var hashtagText = '';
    if (tweet.hashtags !== undefined) {
        for (var i = 0; i < tweet.hashtags.length; i++) {
            hashtagText += ' ' + formatHashtag(tweet.hashtags[i]);
        }
    }
    
    if ((formattedTweet.length + hashtagText.length) > twitterMaxCharCount) {
        if (formattedTweet[twitterMaxCharCount - cutOff.length - hashtagText.length - 1] === ' ') {
            formattedTweet = formattedTweet.substring(0, twitterMaxCharCount - cutOff.length - hashtagText.length - 1) + cutOff + hashtagText;
        }
        else {
            formattedTweet = formattedTweet.substring(0, formattedTweet.substring(0, twitterMaxCharCount - cutOff.length - hashtagText.length - 1).lastIndexOf(' ')) + cutOff + hashtagText;
        }
    }
    
    return formattedTweet;
}

module.exports = formatTweet;