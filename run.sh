curl -i -X POST "https://graph.facebook.com/${PAGE-ID}/subscribed_apps
  ?subscribed_fields=messages
  &access_token=${PAGE-ACCESS-TOKEN}"

TEST application
GET https://susu-bot.herokuapp.com/webhook?hub.mode=subscribe&hub.verify_token=37d587b399b1cf36e2adad15fc0f0eed&hub.challenge=1158201444

curl -H "Content-Type: application/json" -X POST "https://susu-bot.herokuapp.com/webhook" -d '{"object": "page", "entry": [{"messaging": [{"message": "TEST_MESSAGE"}]}]}'