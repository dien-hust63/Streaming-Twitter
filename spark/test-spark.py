from pyspark.sql import SparkSession

spark = SparkSession.\
    builder.\
    appName("pyspark-mongo").config("spark.jars.packages", "org.apache.spark:spark-sql-kafka-0-10_2.12:3.1.2") .\
    config("spark.mongodb.input.uri","mongodb://localhost:27017/test.test").\
    config("spark.mongodb.output.uri","mongodb://localhost:27017/test.test").\
    config("spark.jars.packages", "org.mongodb.spark:mongo-spark-connector_2.12:3.0.0").\
    getOrCreate()

df = spark.read.format("mongo").load()
df.printSchema()