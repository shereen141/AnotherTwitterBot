var Twitter = require('twitter');
var config = require('./config.js');
var T = new Twitter(config);
var params = {
    q: '#Brooklyn99',
    count: 20,
    result_type: 'recent',
    lang: 'en'
  }
  T.get('search/tweets', params, function(err, data, response) {
    if(!err){
      // This is where the magic will happen
      for(let i = 0; i < data.statuses.length; i++){
        // Get the tweet Id from the returned data
        let id = { id: data.statuses[i].id_str }
        
        // Try to Favorite the selected Tweet
        T.post('favorites/create', id, function(err, response){
          // If the favorite fails, log the error message
          if(err){
            console.log(err[0].message);
          }
          // If the favorite is successful, log the url of the tweet
          else{
            let username = response.user.screen_name;
            let tweetId = response.id_str;
            console.log('Favorited: ', `https://twitter.com/${username}/status/${tweetId}`)
          }
        });
      }
    } else {
      console.log(err);
    }
  })