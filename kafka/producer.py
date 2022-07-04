import tweepy
from kafka import KafkaProducer
import logging
import json
import pickle

"""API ACCESS KEYS"""
# API Key : fthucnbP6DZHq5lFDmTUVjCQy
# API Key Secret: ThKtzAlOkX6T9XXABwdeaMFudocsmuynoSTpS9Yaq6GmoG7XJJ
bearer_token = "AAAAAAAAAAAAAAAAAAAAADufeQEAAAAAHqRW9ARhjvsogOFvBf0jKEDuRrk%3DjxaNVaAu6IojtB064K3a1B84XCVfaOIse3kb3UCYY0CzsoySIv"
consumerKey = "fthucnbP6DZHq5lFDmTUVjCQy"
consumerSecret = "ThKtzAlOkX6T9XXABwdeaMFudocsmuynoSTpS9Yaq6GmoG7XJJ"
accessToken = "1543157172733083648-e2x4tVgAoqcRqObJd6IpSAZyZGPC7s"
accessTokenSecret = "FRwxk8A0PsCTwbxZUf2du2nOYm0yPdfVNxniqTtmIrd2p"

producer = KafkaProducer(bootstrap_servers="localhost:9092")
search_term = "Bitcoin"
topic_name = "twitter"


def twitterAuth():
    client = tweepy.Client(
        consumer_key=consumerKey,
        consumer_secret=consumerSecret,
        access_token=accessToken,
        access_token_secret=accessTokenSecret,
    )
    print(client)
    # create the authentication object
    authenticate = tweepy.OAuthHandler(consumerKey, consumerSecret)
    # set the access token and the access token secret
    authenticate.set_access_token(accessToken, accessTokenSecret)
    # create the API object
    api = tweepy.API(authenticate, wait_on_rate_limit=True)
    return api


class TweetListener(tweepy.Stream):
    def on_data(self, raw_data):
        logging.info(raw_data)
        producer.send(topic_name, value=raw_data)
        return True

    def on_error(self, status_code):
        if status_code == 420:
            # returning False in on_data disconnects the stream
            return False

    def start_streaming_tweets(self, search_term):
        self.filter(track=search_term, stall_warnings=True, languages=["en"])


if __name__ == "__main__":
    client = tweepy.Client(bearer_token=bearer_token)

    response = client.search_recent_tweets(query=search_term, max_results=10)
    print(len(response.data))
    print(response.data)
    print("_______________")
    print(response.data[1])
    # print(type(response.data))
    # producer.send(topic_name, value=response.data)
