const GoogleStrategy = require('passport-google-oauth20').Strategy;

const passport=require('passport');

const GOOGLE_CLIENT_ID="541073496443-aqja7qjteb8i61bj5m4hojmfnqt53gqc.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET="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";

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //   return cb(err, user);
    // });                                      DB find or create                 
    
    done(null,profile)

    // if using mongoDB remove done(null,profile)
    // const user={
    //     username: profile:displayName,
    //     avatar: profile.photos[0]
    //}
    // then save this user
  }
));

passport.serializeUser((user,done)=>{
    done(null,user)
})

passport.deserializeUser((user,done)=>{
    done(null,user) 
})

