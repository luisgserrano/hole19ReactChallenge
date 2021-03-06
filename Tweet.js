const mongoose = require('mongoose');

// The schema for our tweet data
const schema = new mongoose.Schema({
    tw_id:     String,
    active:    Boolean,
    username:  String,
    fullname:  String,
    avatar:    String,
    message:   String,
    media_url: String,
    date:      Date
});

// Static getTweets method to return tweets data from the DB
schema.statics.getTweets = (page, skip, callback) => {
    
    let tweets  = [],
          start = (page * 20) + (skip * 1);
          
    Tweet.find({}, 'tw_id active username fullname avatar message media_url date', { skip: start, limit: 20 }).sort({ date: 'desc' }).exec((err, data) => {
        
        // if everything right
        if (!err) {
            tweets = data;
            tweets.forEach(tweet => {
                tweet.active = true;
            });
        }

        // pass them back
        callback(tweets);

    });
};

module.exports = Tweet = mongoose.model('Tweet', schema);