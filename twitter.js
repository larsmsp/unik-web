var Twitter = require('twitter'),
    fs = require('fs'),
    CNST = require('./constants.js'),

    usingTwitter = process.env.USING_TWITTER || false,
    CONFIRM_TAG = process.env.CONFIRM_TAG || "confirmed",
    contestTag = process.env.CONTEST_TAG || '#unik_test',
    client;

if (usingTwitter) {
    client = new Twitter({
        consumer_key: process.env.CONSUMER_KEY,
        consumer_secret: process.env.CONSUMER_SECRET,
        access_token_key: process.env.ACCESS_TOKEN_KEY,
        access_token_secret: process.env.ACCESS_TOKEN_SECRET
    });
}

var tweetsWithHashtag = (tweets, hashtag) => {
    return tweets.filter(tweet => tweet.entities.hashtags.find(h => h.text.toLowerCase() === hashtag.toLowerCase()));
};

var allConfirmTweets = tweets => tweets.filter(tweet => {
    return tweetsWithHashtag(tweets, CONFIRM_TAG)
        .filter(tweet => CNST.ADMINS.find(admin => admin === tweet.user.screen_name));
});

var allBadgesFromTweet = (tweet) => {
    return CNST.BADGES.filter(badge =>
        tweet.entities.hashtags.find(hashtag =>
            hashtag.text.toLowerCase() === badge.hashtag.toLowerCase()
        )
    );
};

var allBadgeTweets = tweets => tweets.filter(tweet => allBadgesFromTweet(tweet).length > 0);

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

var updateTeamScore = (confirmedTweets, team) => {
    team.points = teamScoreFromTweets(confirmedTweets, team);
    return team;
};

var updateAllTeamScores = (tweets, teams, callback) => {
    var confirmedBadgeTweets = allConfirmedBadgeTweets(tweets),
        updatedTeams = teams
            .map(team => updateTeamScore(confirmedBadgeTweets, team))
            .sort((a, b) =>  b.points - a.points);

    callback(updatedTeams);
};

exports.updateAllTeamScores = (callback, err) => {
    if (usingTwitter) {
        client.get('search/tweets', {q: contestTag}, (errors, tweets) => {
            if(errors){
                console.log(errors);
            } else {
                updateAllTeamScores(tweets.statuses, CNST.TEAMS, (teams) => callback(teams));
            }
        });
    } else {
        var tweets = JSON.parse(fs.readFileSync('./twitter_test_data.json', 'UTF-8'));
        updateAllTeamScores(tweets.statuses, CNST.TEAMS, (teams) => callback(teams))
    }
};