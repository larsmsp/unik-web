var fs = require('fs'),
	
	badges = JSON.parse(fs.readFileSync('badges.json', 'UTF-8')),
	teamString = process.env.TEAMS || '#TeamWinners #SmallTalkers #Laget_til_Petter #SummerStudentzzzz #Lambic_laget',
	adminString = process.env.ADMINS || '@cx_unik @_teodoran',
	confirmTag = process.env.CONFIRM_TAG || 'confirmed',
	splitOnTag = (string, separator) => string.split(separator).slice(1).map(name => name.trim());

module.exports = Object.freeze({
	BADGES: badges.BADGES,
	PERPETUAL_BADGES: badges.PERPETUAL_BADGES,
	TEAMS: splitOnTag(teamString, '#').map((team) => { return {name: team, hashtag: team}; }),
	ADMINS: splitOnTag(adminString, '@'),
	CONFIRM_TAG: confirmTag
});
