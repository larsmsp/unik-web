const BADGES = [
        {name: 'Early bird', hashtag: 'earlybird', value: 100, description: 'Få kontakt med din første device', image:'http://lorempixel.com/300/200/technics/1'},
        {name: 'Getting started', hashtag: 'getting_started', value: 25, description: 'Få kontakt med din første device', image:'http://lorempixel.com/300/200/technics/2'},
        {name: 'Moar powa!', hashtag: 'moar_powa', value: 25, description: 'Få kontakt med Wall Plug', image:'http://lorempixel.com/300/200/technics/3'},
        {name: 'Soundcheck', hashtag: 'soundcheck', value: 25, description: 'Spill av en lyd fra høytaleren', image:'http://lorempixel.com/300/200/technics/4'},
        {name: 'Pull request', hashtag: 'pull_request', value: 400, description: 'Skriv kode for et annet lag, som ikke er del av ditt lag sin løsning (og få den godkjent som en del av deres løsning!)', image:'http://lorempixel.com/300/200/technics/5'},
        {name: 'Open source', hashtag: 'open_source', value: 300, description: 'Noe kode i løsningen deres er så god at et annet lag tar den i bruk som en del av deres løsning', image:'http://lorempixel.com/300/200/technics/6'},
        {name: 'Open sorcerer', hashtag: 'open_sourcerer', value: 600, description: 'Koden i løsningen deres er så god at minst to andre lag tar den i bruk', image:'http://lorempixel.com/300/200/technics/7'},
        {name: 'Language elitist', hashtag: 'languaguge_elitist', value: 500, description: 'Tildeles til det laget som til en hver tid benytter flest ulike programmeringsspråk i løsningen', image:'http://lorempixel.com/300/200/technics/8'}
    ],

    TEAMS = [
        {name: 'Team winners!', hashtag: 'TeamWinners', points: 0},
        {name: 'SmallTalkers', hashtag: 'SmallTalkers', points: 0},
        {name: 'Laget til Petter', hashtag: 'Laget_til_Petter', points: 0},
        {name: 'SummerStudentzzzz', hashtag: 'SummerStudentzzzz', points: 0},
        {name: 'Lambic laget', hashtag: 'Lambic_laget', points: 0}
    ],

    CONFIRM_TAG = 'confirmed';

var fs = require('fs'),
    tweets = JSON.parse(fs.readFileSync('test_data.json')).statuses;

var tweetsWithHashtag = (tweets, hashtag) => {
    return tweets.filter(tweet => tweet.entities.hashtags.find(h => h.text.toLowerCase() === hashtag.toLowerCase()));
};

var allBadgesFromTweet = (tweet) => {
    return BADGES.filter(badge =>
        tweet.entities.hashtags.find(hashtag =>
            hashtag.text.toLowerCase() === badge.hashtag.toLowerCase()
        )
    );
};

var allBadgeTweets = tweets => tweets.filter(tweet => allBadgesFromTweet(tweet).length > 0);

var allConfirmTweets = tweets => tweets.filter(tweet => {
    return tweetsWithHashtag(tweets, CONFIRM_TAG);
});

var allConfirmedBadgeTweets = (tweets) => {
    var badgeTweets = allBadgeTweets(tweets);
    var confirmTweets = allConfirmTweets(tweets);
    return badgeTweets.filter(tweet => confirmTweets.find(confirmTweet => confirmTweet.in_reply_to_status_id === tweet.id));
};

var teamScoreFromTweets = (confirmedTweets, team) =>
    tweetsWithHashtag(confirmedTweets, team.hashtag)
        .map(tweet => allBadgesFromTweet(tweet)[0])
        .map(badge => badge.value)
        .reduce((sum, point) => sum + point, 0);

var confirmedBadgeTweets = allConfirmedBadgeTweets(tweets);

console.log(confirmedBadgeTweets.map(tweet => tweet.text));
console.log(teamScoreFromTweets(confirmedBadgeTweets, TEAMS[0]));


/*
 * Getting Tweets from API
 * Missing parameter to get most recent tweets

var Twitter = require('twitter');

var displayErrors = function (errors) {
    errors.forEach(function (error) {
        var e = 'Twitter error code: ' + error.code + ' - ' + error.message;
        console.error(e);
    });
};

var client = new Twitter({
    consumer_key: '',
    consumer_secret: '',
    access_token_key: '',
    access_token_secret: ''
});

client.get('search/tweets', {q: '%23unik_test'}, function(errors, tweets, response){
    if(errors){
        displayErrors(errors);
    } else {
        var json = JSON.stringify(tweets);
        fs.writeFileSync('test_data.json', json);
        console.dir('Done!');
    }
});
*/