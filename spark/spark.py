# import os
# os.environ['PYSPARK_SUBMIT_ARGS'] = '--packages org.apache.spark:spark-streaming-kafka-0-8_2.11:2.0.2 pyspark-shell'

# import findspark
# findspark.init('/Users/lorenapersonel/Downloads/spark-3.2.1-bin-hadoop3.2-scala2.13')

from ast import Str
from pyspark.sql import functions as F
from pyspark.sql.functions import explode
from pyspark.sql.functions import split
from pyspark.sql.types import StringType, StructType, StructField, FloatType
from pyspark.sql import SparkSession
from pyspark.sql.functions import from_json, col, udf
from pyspark.ml.feature import RegexTokenizer
import re
from textblob import TextBlob
import findspark

findspark.init()


# remove_links
def cleanTweet(tweet: str) -> str:
    tweet = re.sub(r'http\S+', '', str(tweet))
    tweet = re.sub(r'bit.ly/\S+', '', str(tweet))
    tweet = tweet.strip('[link]')

    # remove users
    tweet = re.sub('(RT\s@[A-Za-z]+[A-Za-z0-9-_]+)', '', str(tweet))
    tweet = re.sub('(@[A-Za-z]+[A-Za-z0-9-_]+)', '', str(tweet))

    # remove puntuation
    my_punctuation = '!"$%&\'()*+,-./:;<=>?[\\]^_`{|}~•@â'
    tweet = re.sub('[' + my_punctuation + ']+', ' ', str(tweet))

    # remove number
    tweet = re.sub('([0-9]+)', '', str(tweet))

    # remove hashtag
    tweet = re.sub('(#[A-Za-z]+[A-Za-z0-9-_]+)', '', str(tweet))

    return tweet


# Create a function to get the subjectifvity
def getSubjectivity(tweet: str) -> str:
    return str(TextBlob(tweet).sentiment.subjectivity)


# Create a function to get the polarity
def getPolarity(tweet: str) -> str:
    return str(TextBlob(tweet).sentiment.polarity)


def getSentiment(polarityValue: str) -> str:
    if float(polarityValue) < 0.0:
        return 'Negative'
    elif float(polarityValue) == 0.0:
        return 'Neutral'
    else:
        return 'Positive'


# epoch
def write_row_in_mongo(df, dd):
    print("***********MONGO************")
    print(df.show())
    print(df.printSchema())
    # mongoURL = "mongodb://localhost:27017/twitter-bigdata.test"
    df.write.format("com.mongodb.spark.sql.DefaultSource").mode("append").save()
    pass


'''
.config("spark.mongodb.input.uri",
            "mongodb://localhost:27017/twitter-bigdata.test"
            "?retryWrites=true&w=majority") \
        .config("spark.mongodb.output.uri",
                        "mongodb://localhost:27017/twitter-bigdata.test"
                        "?retryWrites=true&w=majority") \
        .config("spark.jars.packages", "org.mongodb.spark:mongo-spark-connector-10.0:3.0.1") \
'''

if __name__ == "__main__":
    spark = SparkSession \
        .builder \
        .appName("TwitterSentimentAnalysis") \
        .config("spark.jars.packages", "org.apache.spark:spark-sql-kafka-0-10_2.12:3.1.2,org.mongodb.spark:mongo-spark-connector_2.12:3.0.0") \
        .config("spark.mongodb.input.uri","mongodb://localhost:27017/test.test")\
        .config("spark.mongodb.output.uri","mongodb://localhost:27017/test.test")\
        .getOrCreate()

    print("*******COLUMNS*******")
    df = spark \
        .readStream \
        .format("kafka") \
        .option("kafka.bootstrap.servers", "localhost:9092") \
        .option("subscribe", "twitter") \
        .load()
    print("COLUMNS:", df.columns)
    print("=============")

    mySchema = StructType([StructField("data", StringType(), True)])
    schema = StructType([
            StructField("data", StructType([StructField("text",StringType(),True),]),True),
        ])

    values = df.select(from_json(df.value.cast("string"), schema).alias("tweet"))

    df1 = values.select("tweet.*")

    print(df1.printSchema())
        
    clean_tweets = F.udf(cleanTweet, StringType())
    
    raw_tweets = df1.withColumn('processed_text', clean_tweets(col("data.text")))
    subjectivity = F.udf(getSubjectivity, StringType())
    polarity = F.udf(getPolarity, StringType())
    sentiment = F.udf(getSentiment, StringType())

    subjectivity_tweets = raw_tweets.withColumn('subjectivity', subjectivity(col("processed_text")))
    polarity_tweets = subjectivity_tweets.withColumn("polarity", polarity(col("processed_text")))
    sentiment_tweets = polarity_tweets.withColumn("sentiment", sentiment(col("polarity")))

    query = sentiment_tweets.writeStream.format("console") \
        .foreachBatch(write_row_in_mongo).start()

    query.awaitTermination()