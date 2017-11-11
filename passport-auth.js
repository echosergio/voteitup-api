var passport = require("passport");
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
var db = require('./models');

var opts = {
    secretOrKey: process.env.JWT_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

module.exports = function () {
    passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
        db.User.find({
            where: {
                id: jwt_payload.id
            }
        }).then(user => {
            if (user) {
                return done(null, user.get({plain: true}));
            } else {
                return done(new Error("User not found"), null);
            }
        });
    }));

    return {
        initialize: function () {
            return passport.initialize();
        },
        authenticate: function () {
            return passport.authenticate('jwt', {
                session: false
            });
        }
    };
};