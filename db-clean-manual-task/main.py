import os
import mysql.connector

try:
    db = mysql.connector.connect(
        host=os.environ["DB_HOST"],
        user=os.environ["DB_USERNAME"],
        password=os.environ["DB_PASSWORD"],
        database=os.environ["DB_SCHEMA"],
        port=os.environ["DB_PORT"])

except Exception as e:
    print(e)

try:
    cursor = db.cursor()

    query = ("DROP TABLE IF EXISTS defaultdb.tasks;")
    cursor.execute(query)

    with open('schema.sql', encoding="utf8") as f:
        cursor.execute(f.read(), multi=True)

    with open('initial.sql', encoding="utf8") as f:
        cursor.execute(f.read(), multi=True)

    db.commit()
    cursor.close()
    db.close()

except Exception as e:
    print(e)
