const passport = require('passport');
const passportJwtStrategy = require('passport-jwt').Strategy;
const passportExtractJwt = require('passport-jwt').ExtractJwt;

const User = require('../../models/user');
const cfg = require('../../../config');

const params = {
    secretOrKey: cfg.jwtSecret,
    jwtFromRequest: passportExtractJwt.fromAuthHeaderWithScheme('bearer')
}

const strategy = new passportJwtStrategy(params, async (jwt_payload, done) => {
    const id = jwt_payload.sub;

    const _user = await User.findOne(id)
        .catch(err => done(err));
    
    done(null, _user);
});

passport.use(strategy);
module.exports = passport;