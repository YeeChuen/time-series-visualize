from models.RunClient import RunClient
from query.init_db import db_conn


# GET
def get_client():
    try:
        conn = db_conn()
        cur = conn.cursor()

        cur.execute(
            """
            SELECT *
            FROM run_clients;
            """
        )
        data = cur.fetchall()
        cur.close()

        run_clients = [
            RunClient(id=run_client[0], run_id=run_client[1], client_name=run_client[2])
            for run_client in data
        ]
        return run_clients

    except Exception as e:
        conn.rollback()
        raise Exception(e)

    finally:
        conn.close()
        print("connection closed")


# GET by id
def get_client_by_id(id):
    try:
        conn = db_conn()
        cur = conn.cursor()

        cur.execute(
            """
            SELECT *
            FROM run_clients
            WHERE id = %s;""",
            (id,),
        )
        data = cur.fetchone()

        cur.close()

        if not data:
            conn.close()
            return None

        new_client = RunClient(id=data[0], run_id=data[1], client_name=data[2])

        return new_client

    except Exception as e:
        conn.rollback()
        raise Exception(e)

    finally:
        conn.close()
        print("connection closed")


# POST
def create_client(new_client):
    try:
        conn = db_conn()
        cur = conn.cursor()

        cur.execute(
            """
            INSERT INTO run_clients (run_id, client_name) 
            VALUES (%s, %s)
            RETURNING id, run_id, client_name;""",
            (new_client["runId"], new_client["clientName"]),
        )

        # Fetch the newly created value
        data = cur.fetchone()
        conn.commit()
        cur.close()

        new_client = RunClient(id=data[0], run_id=data[1], client_name=data[2])

        return new_client

    except Exception as e:
        conn.rollback()
        raise Exception(e)

    finally:
        conn.close()
        print("connection closed")


# Update


# Delete
def delete_client_by_id(id):
    try:
        conn = db_conn()
        cur = conn.cursor()

        cur.execute(
            """
            DELETE FROM run_clients 
            WHERE id = %s;
            """,
            (id,),
        )

        if cur.rowcount == 0:
            return False

        conn.commit()
        cur.close()
        return True

    except Exception as e:
        conn.rollback()
        raise Exception(e)

    finally:
        conn.close()
        print("connection closed")
