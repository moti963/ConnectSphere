import sqlite3
from pymongo import MongoClient

# Connect to SQLite
sqlite_conn = sqlite3.connect('db.sqlite3')
sqlite_cursor = sqlite_conn.cursor()

# Connect to MongoDB
# mongo_client = MongoClient('localhost', 27017)
mongo_client = MongoClient('mongodb+srv://moti9:<password>@cluster0.x18sgkj.mongodb.net/?retryWrites=true&w=majority')
mongo_db = mongo_client['blogapp']

# Migrate BlogContent
print("Starting migration")
sqlite_cursor.execute('SELECT * FROM blogapp_blogcontent')
for row in sqlite_cursor.fetchall():
    mongo_db.blogcontent.insert_one({'content': row[1]})

print("Completed migration")
# Repeat the process for other models

# Close connections
sqlite_conn.close()
mongo_client.close()
