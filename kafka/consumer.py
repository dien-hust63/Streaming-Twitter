from kafka import KafkaConsumer
import json

topic_name = "twitter"

consumer = KafkaConsumer(topic_name, bootstrap_servers=["localhost:9092"])
# for message in consumer:
#     tweets = json.loads(json.dumps(message.value))
#     print(tweets)
for message in consumer:
    # message value and key are raw bytes -- decode if necessary!
    # e.g., for unicode: `message.value.decode('utf-8')`
    print(
        "%s:%d:%d: key=%s value=%s"
        % (message.topic, message.partition, message.offset, message.key, message.value)
    )
