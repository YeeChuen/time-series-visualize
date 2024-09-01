from models.RunTimeSeries import RunTimeSeries
from query.init_db import db_conn


# GET
def get_run_time_series():
    try:
        conn = db_conn()
        cur = conn.cursor()

        cur.execute(
            """
            SELECT *
            FROM run_time_series;
            """
        )
        data = cur.fetchall()
        cur.close()

        run_time_series = [
            RunTimeSeries(
                id=row[0],
                run_id=row[1],
                time_stamp=row[2],
                parameter=row[3],
                process_value=row[4],
                units=row[5],
            )
            for row in data
        ]
        return run_time_series

    except Exception as e:
        conn.rollback()
        raise Exception(e)

    finally:
        conn.close()
        print("connection closed")


# GET by id
def get_run_time_series_by_id(id):
    try:
        conn = db_conn()
        cur = conn.cursor()

        cur.execute(
            """
            SELECT *
            FROM run_time_series
            WHERE id = %s;""",
            (id,),
        )
        data = cur.fetchone()

        cur.close()

        if not data:
            conn.close()
            return None

        return RunTimeSeries(
            id=data[0],
            run_id=data[1],
            time_stamp=data[2],
            parameter=data[3],
            process_value=data[4],
            units=data[5],
        )

    except Exception as e:
        conn.rollback()
        raise Exception(e)

    finally:
        conn.close()
        print("connection closed")


# GET by run id
def get_run_time_series_by_run_id(run_id):
    try:
        conn = db_conn()
        cur = conn.cursor()

        cur.execute(
            """
            SELECT *
            FROM run_time_series
            WHERE run_id = %s
            ORDER BY time_stamp, parameter;""",
            (run_id,),
        )
        data = cur.fetchall()
        cur.close()

        run_time_series = [
            RunTimeSeries(
                id=row[0],
                run_id=row[1],
                time_stamp=row[2],
                parameter=row[3],
                process_value=row[4],
                units=row[5],
            )
            for row in data
        ]
        return run_time_series

    except Exception as e:
        conn.rollback()
        raise Exception(e)

    finally:
        conn.close()
        print("connection closed")


# POST
def create_run_time_series(new_run_time_series):
    try:
        conn = db_conn()
        cur = conn.cursor()

        cur.execute(
            """
            INSERT INTO run_time_series (run_id, time_stamp, parameter, process_value, units) 
            VALUES (%s, %s, %s, %s, %s)
            RETURNING id, run_id, time_stamp, parameter, process_value, units;""",
            (
                new_run_time_series["runId"],
                new_run_time_series["timeStamp"],
                new_run_time_series["parameter"],
                new_run_time_series["processValue"],
                new_run_time_series["units"],
            ),
        )

        # Fetch the newly created value
        data = cur.fetchone()
        conn.commit()
        cur.close()

        return RunTimeSeries(
            id=data[0],
            run_id=data[1],
            time_stamp=data[2],
            parameter=data[3],
            process_value=data[4],
            units=data[5],
        )

    except Exception as e:
        conn.rollback()
        raise Exception(e)

    finally:
        conn.close()
        print("connection closed")


# POST
def create_all_run_time_series(new_run_time_series_list):
    try:
        conn = db_conn()
        cur = conn.cursor()

        query = """
            INSERT INTO run_time_series (run_id, time_stamp, parameter, process_value, units) 
            VALUES (%s, %s, %s, %s, %s)
            RETURNING id, run_id, time_stamp, parameter, process_value, units;"""

        results = []

        for new_data in new_run_time_series_list:
            cur.execute(
                query,
                (
                    new_data["runId"],
                    new_data["timeStamp"],
                    new_data["parameter"],
                    new_data["processValue"],
                    new_data["units"],
                ),
            )
            # Fetch the newly created value
            data = cur.fetchone()
            results.append(RunTimeSeries(
                id=data[0],
                run_id=data[1],
                time_stamp=data[2],
                parameter=data[3],
                process_value=data[4],
                units=data[5],
            ))

        conn.commit()
        cur.close()

        return results

    except Exception as e:
        conn.rollback()
        raise Exception(e)

    finally:
        conn.close()
        print("connection closed")


# Update


# Delete
def delete_run_time_series_by_id(id):
    try:
        conn = db_conn()
        cur = conn.cursor()

        cur.execute(
            """
            DELETE FROM run_time_series 
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
