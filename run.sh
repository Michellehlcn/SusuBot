curl -i -X POST "https://graph.facebook.com/${PAGE-ID}/subscribed_apps
  ?subscribed_fields=messages
  &access_token=${PAGE-ACCESS-TOKEN}"