from flask import Blueprint, jsonify, request

from services.RunProjectService import (
    get_project_service,
    get_project_by_id_service,
    create_project_service,
    delete_project_by_id_service,
)
from services.RunTimeSeriesService import (
    get_run_time_series_by_run_id_service,
)

run_projects_bp = Blueprint("run_projects", __name__)


@run_projects_bp.route("/api/v1/run-projects", methods=["GET"])
def get_project_route():
    try:
        projects = get_project_service()

        projects_list = [
            project.to_json()
            for project in projects
        ]

        return jsonify({"runProjects": projects_list}), 200

    except Exception as e:
        return (
            jsonify(
                {
                    "status": "Error",
                    "message": f"Internal server error: {e}",
                }
            ),
            500,
        )


@run_projects_bp.route("/api/v1/run-projects/<string:id>", methods=["GET"])
def get_project_by_id_route(id):
    try:
        project = get_project_by_id_service(id)

        if not project:    
            return jsonify({
                    "status": "Error",
                    "message": "Data not found.",
                }), 404

        return jsonify(project.to_json()), 200

    except Exception as e:
        return (
            jsonify(
                {
                    "status": "Error",
                    "message": f"Internal server error: {e}",
                }
            ),
            500,
        )


@run_projects_bp.route("/api/v1/run-projects", methods=["POST"])
def create_project_route():
    try:
        data = request.get_json()

        run_id = data.get("runId")
        project_name = data.get("projectName")

        if not run_id or not project_name:
            return (
                jsonify(
                    {
                        "status": "Error",
                        "message": "Missing property from request body for run project.",
                    }
                ),
                400,
            )
        new_project = create_project_service({"runId": run_id, "projectName": project_name})

        return (
            jsonify(
                {
                    "status": "Success",
                    "message": "Item created successfully",
                    "data": new_project.to_json(),
                }
            ),
            200,
        )

    except Exception as e:
        return (
            jsonify(
                {
                    "status": "Error",
                    "message": f"Internal server error: {e}",
                }
            ),
            500,
        )


@run_projects_bp.route("/api/v1/run-projects/<string:id>", methods=["DELETE"])
def delete_project_by_id(id):
    try:
        status = delete_project_by_id_service(id)

        if not status:
            return jsonify({
                    "status": "Error",
                    "message": "Data not found.",
                }), 404


        res = {
            "status": "Success",
            "message": "Item successfully deleted",
        }
        return jsonify(res), 200
        

    except Exception as e:
        return (
            jsonify(
                {
                    "status": "Error",
                    "message": f"Internal server error: {e}",
                }
            ),
            500,
        )

# Get all time series for this project
@run_projects_bp.route("/api/v1/run-projects/<string:id>/run-time-series", methods=["GET"])
def get_run_time_series_by_run_project_route(id):
    try:
        project = get_project_by_id_service(id)

        if not project:    
            return jsonify({
                    "status": "Error",
                    "message": "Data not found.",
                }), 404

        run_time_series = get_run_time_series_by_run_id_service(project.run_id)

        run_time_series_list = [
            data.to_json()
            for data in run_time_series
        ]

        return jsonify({"runTimeSeries": run_time_series_list}), 200

    except Exception as e:
        return (
            jsonify(
                {
                    "status": "Error",
                    "message": f"Internal server error: {e}",
                }
            ),
            500,
        )