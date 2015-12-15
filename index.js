const twitterMaxCharCount = 140;
// need to figure out the best way to cache this daily 
// so that it isn't hardcoded
//
// refs:
//      https://dev.twitter.com/overview/t.co
//      https://dev.twitter.com/rest/reference/get/help/configuration
const urlLength = 23;

function formatHashtag(hashtag) {
    if (hashtag.substring(0, 1) !== '#') {
        hashtag = '#' + hashtag;
    }
    hashtag.replace(' ', '');
    return hashtag;
}

function generatePrefix(prefix) {
    var prefixText = '';
    if (prefix.text !== undefined) {
        switch (prefix.container) {
            case 'curley-brackets':
                prefixText = '{' + prefix.text + '}';
                break;
            case 'brackets':
            default:
                prefixText = '[' + prefix.text + ']';
                break;
        }
        prefixText += prefix.divider === undefined ? ': ' : prefix.divider;
    }
    
    return prefixText;
}

function breakTextOnSpaces(input, maxCharLength, firstMaxCharLength) {
    var brokenInput = [];
    if (input.length > (firstMaxCharLength === undefined ? maxCharLength : firstMaxCharLength)) {
        var progressiveInput = input;
        var sliceAt;
        var i = 0;
        var effectiveMaxCharLength;
        do {
            if (i === 0 && firstMaxCharLength !== undefined) {
                effectiveMaxCharLength = firstMaxCharLength;
            }
            else {
                effectiveMaxCharLength = maxCharLength;
            }
            if (progressiveInput.length > effectiveMaxCharLength) {
                sliceAt = progressiveInput[effectiveMaxCharLength - 1] === ' ' ? effectiveMaxCharLength - 1 : progressiveInput.slice(0, effectiveMaxCharLength - 1).lastIndexOf(' ');
                brokenInput[i] = progressiveInput.slice(0, sliceAt).trim();
                progressiveInput = progressiveInput.slice(sliceAt + 1).trim();
            }
            else {
                brokenInput[i] = progressiveInput;
                progressiveInput = '';
            }
            i++;
        } while (progressiveInput !== '');
    }
    else {
        brokenInput[0] = input;
    }
    
    return brokenInput;
}

function formatTweet(tweet) {
    var cutOff;
    if (tweet.cutOff === undefined) {
        cutOff = ' ...';
    }
    else {
        cutOff = tweet.cutOff;
    }
    
    var prefixText = '';
    
    if (tweet.prefix !== undefined) {
        prefixText += generatePrefix(tweet.prefix);
    }
    
    var hashtagText = '';
    if (tweet.hashtags !== undefined) {
        for (var i = 0; i < tweet.hashtags.length; i++) {
            hashtagText += ' ' + formatHashtag(tweet.hashtags[i]);
        }
    }
        
    var firstTweetCharLength = twitterMaxCharCount - prefixText.length - hashtagText.length - cutOff.length;
    var remainingTweetCharLength = twitterMaxCharCount - hashtagText.length - cutOff.length;
    
    if (tweet.link && tweet.link.url) {
        firstTweetCharLength -= urlLength;
        if (tweet.link.wrap && tweet.link.wrap === true) {
            remainingTweetCharLength -= urlLength;
        }
    }
    
    var brokenText = breakTextOnSpaces(tweet.text, remainingTweetCharLength, firstTweetCharLength);
    
    var formattedTweets = [];
    
    for (var i = 0; i < brokenText.length; i++) {
        if (i === 0) {
            if (brokenText.length === 1) {
                // no need for a cutoff text if there is a single tweet
                formattedTweets[i] = prefixText + brokenText[i] + hashtagText;
            }
            else {
                formattedTweets[i] = prefixText + brokenText[i] + cutOff + hashtagText;
            }
            
            if (tweet.link && tweet.link.url) {
                formattedTweets[i] += ' ' + tweet.link.url;
            }
        }
        else {
            if (tweet.wrap === undefined || !tweet.wrap) {
                break;
            }
            else {
                if (i === brokenText.length - 1) {
                    formattedTweets[i] = brokenText[i] + hashtagText;
                }
                else {
                    formattedTweets[i] = brokenText[i] + cutOff + hashtagText;
                }
                
                if (tweet.link && tweet.link.url && tweet.link.wrap && tweet.link.wrap === true) {
                    formattedTweets[i] += ' ' + tweet.link.url;
                }
            }
        }
    }
    
    return formattedTweets;
}

module.exports = formatTweet;