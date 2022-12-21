curl -i -X POST "https://graph.facebook.com/${PAGE-ID}/subscribed_apps
  ?subscribed_fields=messages
  &access_token=${PAGE-ACCESS-TOKEN}"

TEST application
GET https://susu-bot.herokuapp.com/webhook?hub.mode=subscribe&hub.verify_token=37d587b399b1cf36e2adad15fc0f0eed&hub.challenge=1158201444

curl -H "Content-Type: application/json" -X POST "https://susu-bot.herokuapp.com/webhook" -d '{"object": "page", "entry": [{"messaging": [{"message": "TEST_MESSAGE"}]}]}'

curl -X POST -H "Content-Type: application/json" -d '{"recipient":{"id":"4518690248161445"},"message":"alo"}' "https://graph.facebook.com/v8.0/me/messages?access_token=EAAt6rK53z2IBALpBFriWfSiEH7hSR8UvPgsaoWol9Xe39uE5LPEprrsrE1AzLGdkuhG76mBlcjUuzpt6nju4H9OdN7jiQiXBTpCy0pYZCylyMLPvZBi5y04jDp3P1x7SxAulGUKOgxiXcKK9Ky7PENLkewfCh8m2koxsahb4Q6g8DK6AZCK"