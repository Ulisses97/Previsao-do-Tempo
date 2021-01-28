// GET /forecastrss?location=sunnyvale,ca HTTP/1.1
// Host: weather-ydn-yql.media.yahoo.com
// X-Yahoo-App-Id: YOUR_APP_ID
// Authorization: OAuth
// oauth_consumer_key="YOUR_CONSUMER_KEY",oauth_signature_method="HMAC-SHA1",oauth_timestamp="YOUR_TIMESTAMP",oauth_nonce="YOUR_NONCE",oauth_version="1.0",oauth_signature="YOUR_GENERATED_SIGNATURE"
// cache-control: no-cache


var OAuth = require('oauth');
var header = {
    "X-Yahoo-App-Id": "your-app-id"
};
var request = new OAuth.OAuth(
    null,
    null,
    'your-consumer-key',
    'your-consumer-secret',
    '1.0',
    null,
    'HMAC-SHA1',
    null,
    header
);
request.get(
    'https://weather-ydn-yql.media.yahoo.com/forecastrss?location=sunnyvale,ca&format=json',
    null,
    null,
    function (err, data, result) {
        if (err) {
            console.log(err);
        } else {
            console.log(data)
        }
    }
);