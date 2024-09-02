import psycopg2
from dotenv import load_dotenv
import os


def db_conn():
    print(os.environ["POSTGRESQL_SERVER"])
    print(os.environ["POSTGRESQL_DATABASE"])
    print(os.environ["POSTGRESQL_PORT"])
    print(os.environ["POSTGRESQL_USER"])
    print(os.environ["POSTGRESQL_PASSWORD"])

    return psycopg2.connect(
        host=os.environ["POSTGRESQL_SERVER"],
        database=os.environ["POSTGRESQL_DATABASE"],
        port=os.environ["POSTGRESQL_PORT"],
        user=os.environ["POSTGRESQL_USER"],
        password=os.environ["POSTGRESQL_PASSWORD"],
    )


def init_db():
    load_dotenv()
    try:
        conn = db_conn()

        init_table = "./query/init_table.sql"

        with open(init_table, "r") as f:
            content = f.read()

        curr = conn.cursor()
        curr.execute(content)

        conn.commit()

        curr.close()
        conn.close()

    except Exception as e:
        print(e)
