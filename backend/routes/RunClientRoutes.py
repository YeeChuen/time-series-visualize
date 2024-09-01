from flask import Blueprint, jsonify, request

from services.RunClientService import (
    get_client_service,
    get_client_by_id_service,
    create_client_service,
    delete_client_by_id_service,
)
from services.RunTimeSeriesService import (
    get_run_time_series_by_run_id_service,
)

run_clients_bp = Blueprint("run_clients", __name__)


@run_clients_bp.route("/api/v1/run-clients", methods=["GET"])
def get_client_route():
    try:
        clients = get_client_service()

        clients_list = [
            client.to_json()
            for client in clients
        ]

        return jsonify({"runClients": clients_list}), 200

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


@run_clients_bp.route("/api/v1/run-clients/<string:id>", methods=["GET"])
def get_client_by_id_route(id):
    try:
        client = get_client_by_id_service(id)

        if not client:    
            return jsonify({
                    "status": "Error",
                    "message": "Data not found.",
                }), 404

        return jsonify(client.to_json()), 200

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


@run_clients_bp.route("/api/v1/run-clients", methods=["POST"])
def create_client_route():
    try:
        data = request.get_json()

        run_id = data.get("runId")
        client_name = data.get("clientName")

        if not run_id or not client_name:
            return (
                jsonify(
                    {
                        "status": "Error",
                        "message": "Missing property from request body for run client.",
                    }
                ),
                400,
            )
        new_client = create_client_service({"runId": run_id, "clientName": client_name})

        return (
            jsonify(
                {
                    "status": "Success",
                    "message": "Item created successfully",
                    "data": new_client.to_json(),
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


@run_clients_bp.route("/api/v1/run-clients/<string:id>", methods=["DELETE"])
def delete_client_by_id(id):
    try:
        status = delete_client_by_id_service(id)

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

# Get all time series for this client
@run_clients_bp.route("/api/v1/run-clients/<string:id>/run-time-series", methods=["GET"])
def get_run_time_series_by_run_client_route(id):
    try:
        client = get_client_by_id_service(id)

        if not client:    
            return jsonify({
                    "status": "Error",
                    "message": "Data not found.",
                }), 404

        run_time_series = get_run_time_series_by_run_id_service(client.run_id)

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