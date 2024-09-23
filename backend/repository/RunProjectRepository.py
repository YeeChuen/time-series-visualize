from models.RunProject import RunProject
from query.init_db import db_conn


# GET
def get_project():
    try:
        conn = db_conn()
        cur = conn.cursor()

        cur.execute(
            """
            SELECT *
            FROM run_projects;
            """
        )
        data = cur.fetchall()
        cur.close()

        run_projects = [
            RunProject(id=run_project[0], run_id=run_project[1], project_name=run_project[2])
            for run_project in data
        ]
        return run_projects

    except Exception as e:
        conn.rollback()
        raise Exception(e)

    finally:
        conn.close()
        print("connection closed")


# GET by id
def get_project_by_id(id):
    try:
        conn = db_conn()
        cur = conn.cursor()

        cur.execute(
            """
            SELECT *
            FROM run_projects
            WHERE id = %s;""",
            (id,),
        )
        data = cur.fetchone()

        cur.close()

        if not data:
            conn.close()
            return None

        new_project = RunProject(id=data[0], run_id=data[1], project_name=data[2])

        return new_project

    except Exception as e:
        conn.rollback()
        raise Exception(e)

    finally:
        conn.close()
        print("connection closed")


# POST
def create_project(new_project):
    try:
        conn = db_conn()
        cur = conn.cursor()

        cur.execute(
            """
            INSERT INTO run_projects (run_id, project_name) 
            VALUES (%s, %s)
            RETURNING id, run_id, project_name;""",
            (new_project["runId"], new_project["projectName"]),
        )

        # Fetch the newly created value
        data = cur.fetchone()
        conn.commit()
        cur.close()

        new_project = RunProject(id=data[0], run_id=data[1], project_name=data[2])

        return new_project

    except Exception as e:
        conn.rollback()
        raise Exception(e)

    finally:
        conn.close()
        print("connection closed")


# Update


# Delete
def delete_project_by_id(id):
    try:
        conn = db_conn()
        cur = conn.cursor()

        cur.execute(
            """
            DELETE FROM run_projects 
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
