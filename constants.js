var fs = require('fs'),
	configFile = './config.json',
	json = fs.readFileSync(configFile, 'UTF-8'),
	badgesAndTeams = JSON.parse(json),
	adminString = process.env.ADMINS || '@cx_unik @_teodoran',
	confirmTag = process.env.CONFIRM_TAG || 'confirmed';

var adminsAsArray = (adminString) => adminString.split('@').slice(1).map(name => name.trim());

module.exports = Object.freeze({
	BADGES: badgesAndTeams.BADGES,
	PERPETUAL_BADGES: badgesAndTeams.PERPETUAL_BADGES,
	TEAMS: badgesAndTeams.TEAMS,
	ADMINS: adminsAsArray(adminString),
	CONFIRM_TAG: confirmTag
});
