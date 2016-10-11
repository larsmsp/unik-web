var Twitter = require('twitter'),
    bigInt = require('big-integer'),
    fs = require('fs'),
    CNST = require('./constants.js'),
    client = {};

if (CNST.USING_TWITTER) {
    client = new Twitter({
        consumer_key: process.env.CONSUMER_KEY,
        consumer_secret: process.env.CONSUMER_SECRET,
        access_token_key: process.env.ACCESS_TOKEN_KEY,
        access_token_secret: process.env.ACCESS_TOKEN_SECRET
    });
}

var copyHashtags = (hashtags) => {
    if (hashtags.length <= 0) {
        return [];
    }
    return hashtags.map((hashtag) => {
        return {text: hashtag.text}
    });
};

var copyTweet = (tweet) => {
    return {
        created_at: tweet.created_at || Date.now(),
        id: tweet.id_str || "0",
        entities: {
            hashtags: copyHashtags(tweet.entities.hashtags)
        },
        in_reply_to_status_id: tweet.in_reply_to_status_id_str || "-1",
        user: {
            screen_name: tweet.user.screen_name || ''
        }
    };
};

var copyAllTweets = tweets => tweets.map(tweet => copyTweet(tweet));

var tweetsWithHashtag = (tweets, hashtag) => {
    return tweets.filter(tweet => tweet.entities.hashtags.find(h => h.text.toLowerCase() === hashtag.toLowerCase()));
};

var allConfirmTweets = tweets => {
    return tweetsWithHashtag(tweets, CNST.CONFIRM_TAG)
        .filter(tweet => CNST.ADMINS.find(admin => admin === tweet.user.screen_name));
};

var allBadgesFromTweet = (tweet) => {
    return CNST.BADGES.filter(badge =>
        tweet.entities.hashtags.find(hashtag =>
            hashtag.text.toLowerCase() === badge.hashtag.toLowerCase()
        )
    );
};

var teamAndContestTagsFromTweet = (tweet) => {
    return tweet.entities.hashtags.filter(hashtag =>
        !CNST.BADGES.find(badge =>
            hashtag.text.toLowerCase() === badge.hashtag.toLowerCase()
        )
    );
};

var badgeFromTweet = (tweet) => {
    return allBadgesFromTweet(tweet).shift();
};

var allBadgeTweets = tweets => {
    var perpetualBadgesAlreadyClaimed = new Set();

    return tweets
        .sort((a, b) =>  Date.parse(b.created_at) - Date.parse(a.created_at))
        .filter(tweet => {
            var badge = badgeFromTweet(tweet);

            if (!badge) {
                return false;
            }

            var badgeTag = badge.hashtag,
                isAlreadyClaimed = !perpetualBadgesAlreadyClaimed.has(badgeTag);
            
            if (CNST.PERPETUAL_BADGES.find(perpetualBadge => perpetualBadge === badgeTag)) {
                perpetualBadgesAlreadyClaimed.add(badgeTag);
            }

            return isAlreadyClaimed;
        });
};

var allConfirmedTweets = (tweets) => {
    var confirmTweets = allConfirmTweets(tweets);
    return tweets.filter(tweet => confirmTweets.find(confirmTweet => confirmTweet.in_reply_to_status_id === tweet.id));
};

var containsMoreThanOneBadge = (tweet) => {
    return CNST.BADGES.filter(badge =>
        tweet.entities.hashtags.filter(hashtag =>
            hashtag.text.toLowerCase() === badge.hashtag.toLowerCase()
        )
    ).length > 1;
};

var duplicateTweetsWithMoreThanOneBadge = (tweets) =>
    tweets
        .map((tweet) => {
            var badges = allBadgesFromTweet(tweet);
            if (badges.length <= 1) {
                return [tweet];
            }

            return badges.map((badge) => {
                var thisTweet = copyTweet(tweet);
                thisTweet.entities.hashtags = teamAndContestTagsFromTweet(tweet).concat([{text: badge.hashtag}]);
                return thisTweet;
            });
        })
        .reduce((a, b) => a.concat(b), [])

var allConfirmedBadgeTweets = (tweets) => {
    var confirmedTweets = allConfirmedTweets(tweets),
        expanded = duplicateTweetsWithMoreThanOneBadge(confirmedTweets);

    return allBadgeTweets(expanded);
};

var badgeNameFromTweets = (confirmedTweets, team) =>
    tweetsWithHashtag(confirmedTweets, team.hashtag)
        .map(tweet => badgeFromTweet(tweet))
        .map(badge => badge.hashtag)
        .filter((badge, index, self) => index == self.indexOf(badge))

var teamScoreFromBadges = (badges) =>
    badges
        .map(badge => CNST.BADGES.find(b => b.hashtag.toLowerCase() === badge.toLowerCase()))
        .map(badge => badge.value)
        .reduce((sum, point) => sum + point, 0);

var updateTeamScore = (confirmedTweets, team) => {
    team.badges = badgeNameFromTweets(confirmedTweets, team);
    team.points = teamScoreFromBadges(team.badges);
    return team;
};

var updateAllTeamScores = (tweets, teams, callback) => {
    var confirmedBadgeTweets = allConfirmedBadgeTweets(tweets),
        updatedTeams = teams
            .map(team => updateTeamScore(confirmedBadgeTweets, team))
            .sort((a, b) =>  b.points - a.points);

    callback(updatedTeams);
};

var minimumId = (tweets) =>
    tweets
        .map(tweet => bigInt(tweet.id_str).minus(1)).reduce((x, y) => {
            if (x.lesser(y)) {
                return x;
            }
            return y;
        })
        .toString()

var getAllTweets = (callback, error, noOfCalls, params, statuses) => {
    var count = 100,
        error = error || console.log,
        noOfCalls = noOfCalls || 1,
        statuses = statuses || [],
        params = params || {
            q: CNST.CONTEST_TAG,
            result_type: 'recent',
            count: count
        };

    client.get('search/tweets', params, (err, tweets) => {
        if (err) {
            error(err);
            return;
        }
        
        statuses = statuses.concat(tweets.statuses);
        
        if (tweets.statuses.length >= count) {
            params.max_id = minimumId(statuses);
            getAllTweets(callback, error, noOfCalls + 1, params, statuses);
        }
        else {
            callback(statuses, noOfCalls);
        }
    });
};

exports.updateAllTeamScores = (callback) => {
    if (!CNST.USING_TWITTER) {
        var statuses = JSON.parse(fs.readFileSync('./test_data/twitter_test_data_uib.json', 'UTF-8'));
        updateAllTeamScores(statuses, CNST.TEAMS, (teams) => callback(teams, 1));
        return;
    }

    getAllTweets((statuses, noOfCalls) => {
        // If a update of test data is required, use the following:
        // fs.writeFileSync('./test_data/twitter_test_data_uib.json', JSON.stringify(copyAllTweets(statuses)));
        updateAllTeamScores(copyAllTweets(statuses), CNST.TEAMS, (teams) => callback(teams, noOfCalls));
    });
};