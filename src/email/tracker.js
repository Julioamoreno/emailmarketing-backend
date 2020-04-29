module.exports = function (body, campaingId, leadId) {
    let img = `<img src=""/campaign/tracking/open/:${campaingId}/:${leadId}>` ;
    let url_tracking = `<img src=""/campaign/tracking/click/:${campaingId}/:${leadId}?link=>`;
    let regex = /<a href="(.*?)"/g;

    return body.replace(regex, `/<a href=\"${url_tracking}$1\"${img}`);
}