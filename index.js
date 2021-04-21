var Twit = require('twit')
var config = require('./config')

var T = new Twit(config)

// T.get('search/tweets', { q: 'covid since:2021-04-11', count: 100 }, function (
//   err,
//   data,
//   response
// ) {
//   console.log(data)
// })
// var params = {
//     q: '#covidhelp',
//     count:5
// }
// T.get('search/tweets', params, gotData);

// function gotData(err, data, response){
//     var tweets = data.statuses;
//     for(var i=0; i<tweets.length; i++){
//         console.log(tweets[i].text)
//     }
// }
// var stream = T.stream('user')
// stream.on('follow',followed)

// function followed(eventMsg){
//     console.log('follow event')
//     var name = eventMsg.source.name;
//     var screenName = eventMsg.source.screen_Name;
//     tweetIt('@'+screenName+ 'Thanks for following Covidhelp India')
// }
// function tweetIt(txt){
//     var tweet = {
//         status: txt
//     }
//     T.post('statuses/update', tweet, tweeted)
//     function tweeted(err,data,response){
//        if(err){
//         console.log(err)
//        }else('It works')
//     }

// }

// posting single tweet
// var tweet = {
//   status: '#covidhelp India'
// }
// T.post('statuses/update', tweet, tweeted)
// function tweeted (err, data, response) {
//   if(err){
//       console.log(err)
//   }else{
//       console.log('it works')
//   }
// }
// T.post('statuses/update', { status: 'hello world!' }, function(err, data, response) {
//     console.log(data)
//   })
// const config = require('./config')
// const twit =  require('twit')

// const T = new twit(config)
// .........Running
function retweet (searchText) {
  // Params to be passed to the 'search/tweets' API endpoint
  let params = {
    q: searchText + '',
    result_type: 'mixed',
    count: 25
  }

  T.get('search/tweets', params, function (
    err_search,
    data_search,
    response_search
  ) {
    let tweets = data_search.statuses
    if (!err_search) {
      let tweetIDList = []
      for (let tweet of tweets) {
        tweetIDList.push(tweet.id_str)

        //more code here later...
      }

      // Call the 'statuses/retweet/:id' API endpoint for retweeting EACH of the tweetID
      for (let tweetID of tweetIDList) {
        T.post('statuses/retweet/:id', { id: tweetID }, function (
          err_rt,
          data_rt,
          response_rt
        ) {
          if (!err_rt) {
            console.log('\n\nRetweeted! ID - ' + tweetID)
          } else {
            console.log('\nError... Duplication maybe... ' + tweetID)
            console.log('Error = ' + err_rt)
          }
        })
      }
    } else {
      console.log('Error while searching' + err_search)
      process.exit(1)
    }
  })
}

// Run every 60 seconds
setInterval(function () {
  retweet('#covidhelp OR #covidhelpindia OR #covidsupport')
}, 60000)



// var stream = T.stream('user');

// // Anytime someone follows me
// stream.on('follow', followed);

// // Just looking at the event but I could tweet back!
// function followed(event) {
//   var name = event.source.name;
//   var screenName = event.source.screen_name;
//   console.log('I was followed by: ' + name + ' ' + screenName);
// }

// // Now looking for tweet events
// // See: https://dev.twitter.com/streaming/userstreams
// stream.on('tweet', tweetEvent);

// // Here a tweet event is triggered!
// function tweetEvent(tweet) {

//   // If we wanted to write a file out
//   // to look more closely at the data
//   // var fs = require('fs');
//   // var json = JSON.stringify(tweet,null,2);
//   // fs.writeFile("tweet.json", json, output);

//   // Who is this in reply to?
//   var reply_to = tweet.in_reply_to_screen_name;
//   // Who sent the tweet?
//   var name = tweet.user.screen_name;
//   // What is the text?
//   var txt = tweet.text;
//   // If we want the conversation thread
//   var id = tweet.id_str;

//   // Ok, if this was in reply to me
//   // Tweets by me show up here too
//   if (reply_to === 'covidsupportIN') {

//     // Get rid of the @ mention
//     txt = txt.replace(/@covidsupportIN/g,'');

//     // Start a reply back to the sender
//     var replyText = '@'+name + ' ';
//     // Reverse their text
//     for (var i = txt.length-1; i >= 0; i--) {
//       replyText += txt.charAt(i);
//     }

//     // Post that tweet
//     T.post('statuses/update', { status: replyText, in_reply_to_status_id: id}, tweeted);

//     // Make sure it worked!
//     function tweeted(err, reply) {
//       if (err) {
//         console.log(err.message);
//       } else {
//         console.log('Tweeted: ' + reply.text);
//       }
//     }
//   }
// }