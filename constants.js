var fs = require('fs'),
	badges = JSON.parse(fs.readFileSync('badges.json', 'UTF-8')),
	teamString = process.env.TEAMS || '#TeamHarambe #TelnetIsLove #importCreativeName #recursive_funk #likestillt_fødsel  #node_hs #daHappyYodelers4life',
	usingTwitter = (process.env.USING_TWITTER || 'false') === 'true',
	adminString = process.env.ADMINS || '@cx_unik @_teodoran',
	confirmTag = process.env.CONFIRM_TAG || 'ok',
    contestTag = process.env.CONTEST_TAG || '#iot_uib',
    runningContest = (process.env.RUNNING_CONTEST || 'false') === 'true',
	splitOnTag = (string, separator) => string.split(separator).slice(1).map(name => name.trim());

module.exports = Object.freeze({
	BADGES: badges.BADGES,
	PERPETUAL_BADGES: badges.PERPETUAL_BADGES,
	TEAMS: splitOnTag(teamString, '#').map((team) => { return {name: team, hashtag: team}; }),
	USING_TWITTER: usingTwitter,
	ADMINS: splitOnTag(adminString, '@'),
	CONFIRM_TAG: confirmTag,
	CONTEST_TAG: contestTag,
	RUNNING_CONTEST: runningContest
});