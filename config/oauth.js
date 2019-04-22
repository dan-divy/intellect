var google_client_id = "<CLIENT_ID";
    google_client_secret = "<CLIENT_SECRET>";
    google_redirect_url = "<host>:<port>/authorize/auth/google/callback";
    google_auth_url = 'https://accounts.google.com/o/oauth2/v2/auth?response_type=code&redirect_uri=' + google_redirect_url + '&scope=profile%20email&client_id=' + google_client_id
    fb_client_id = "<client_id>";
    fb_client_secret = "<client_secret>";
    fb_redirect_url = "<host>:<port>/authorize/auth/facebook/callback";
    fb_auth_url = 'https://accounts.google.com/o/oauth2/v2/auth?response_type=code&redirect_uri=' + fb_redirect_url + '&scope=profile%20email&client_id=' + fb_client_id

module.exports = {
          "google": {
              "client_id":google_client_id,
              "client_secret":google_client_secret,
              "redirect_url":google_redirect_url,
              "auth_url":google_auth_url
            },
          "facebook":{
            "client_id":fb_client_id,
            "client_secret":fb_client_secret,
            "redirect_url":fb_redirect_url,
            "auth_url":fb_auth_url
            }
  }
