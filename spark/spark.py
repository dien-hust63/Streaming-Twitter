# from pyspark.sql import functions as F
# from pyspark.sql.functions import explode
# from pyspark.sql.functions import split
# from pyspark.sql.types import StringType, StructType, StructField, FloatType
# from pyspark.sql import SparkSession
# from pyspark.sql.functions import from_json, col, udf
# from pyspark.ml.feature import Tokenizer, RegexTokenizer
# import re
# from textblob import TextBlob

# spark = SparkSession\
#         .builder\
#         .appName("TwitterSentimentAnalysis")\
#         .config("spark.jars.packages", "org.apache.spark:spark-sql-kafka-0-10_2.12:3.1.2")\
#         .getOrCreate()

# # df = spark \
# #     .readStream \
# #     .format("kafka") \
# #     .option("kafka.bootstrap.servers", "localhost:9092") \
# #     .option("subscribe", "twitter") \
# #     .load()

# # mySchema = StructType([StructField("text", StringType(), True)])
# # values = df.select(from_json(df.value.cast("string"), mySchema).alias("tweet"))
# # print(df)


from pyspark import SparkContext
from pyspark.sql import SparkSession

sc = SparkContext.getOrCreate()

spark = SparkSession.builder.appName('PySpark DataFrame From RDD').getOrCreate()

rdd = sc.parallelize([('C',85,76,87,91), ('B',85,76,87,91), ("A", 85,78,96,92), ("A", 92,76,89,96)], 4)

print(type(rdd))

sub = ['Division','English','Mathematics','Physics','Chemistry']
marks_df = spark.createDataFrame(rdd, schema=sub)
print(type(marks_df))
marks_df.printSchema()
marks_df.show()