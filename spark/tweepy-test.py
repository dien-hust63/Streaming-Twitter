import tweepy
 
# assign the values accordingly
bearer_token = "AAAAAAAAAAAAAAAAAAAAADufeQEAAAAAHqRW9ARhjvsogOFvBf0jKEDuRrk%3DjxaNVaAu6IojtB064K3a1B84XCVfaOIse3kb3UCYY0CzsoySIv"
consumer_key = "fthucnbP6DZHq5lFDmTUVjCQy"
consumer_secret = "ThKtzAlOkX6T9XXABwdeaMFudocsmuynoSTpS9Yaq6GmoG7XJJ"
access_token = "1543157172733083648-e2x4tVgAoqcRqObJd6IpSAZyZGPC7s"
access_token_secret = "FRwxk8A0PsCTwbxZUf2du2nOYm0yPdfVNxniqTtmIrd2p"

# authorization of consumer key and consumer secret
auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
 
# set access to user's access key and access secret
auth.set_access_token(access_token, access_token_secret)
 
# calling the api
api = tweepy.API(auth)
 
# the ID of the list
list_id = 4343
   
# fetching the list
list = api.get_list(list_id = list_id)
 
# printing the information
print("The id is : " + str(list.id))
print("The id_str is : " + list.id_str)
print("The name is : " + list.name)
print("The uri is : " + list.uri)
print("The subscriber_count is : " + str(list.subscriber_count))
print("The member_count is : " + str(list.member_count))
print("The mode is : " + list.mode)
print("The slug is : " + list.slug)
print("The full_name is : " + list.full_name)
print("The list was created on : " + str(list.created_at))
print("Is the authenticated user following the list? : " + str(list.following))
print("The screen name of the owner of the list is : " + list.user.screen_name)
