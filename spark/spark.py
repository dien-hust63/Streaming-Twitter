from pyspark.sql import functions as F
from pyspark.sql.functions import explode
from pyspark.sql.functions import split
from pyspark.sql.types import StringType, StructType, StructField, FloatType
from pyspark.sql import SparkSession
from pyspark.sql.functions import from_json, col, udf
from pyspark.ml.feature import Tokenizer, RegexTokenizer
import re
from textblob import TextBlob

spark = SparkSession\
        .builder\
        .appName("TwitterSentimentAnalysis")\
        .config("spark.jars.packages", "org.apache.spark:spark-sql-kafka-0-10_2.12:3.1.2")\
        .getOrCreate()

df = spark \
    .readStream \
    .format("kafka") \
    .option("kafka.bootstrap.servers", "localhost:9092") \
    .option("subscribe", "twitter") \
    .load()

# mySchema = StructType([StructField("text", StringType(), True)])
# values = df.select(from_json(df.value.cast("string"), mySchema).alias("tweet"))
print(df)