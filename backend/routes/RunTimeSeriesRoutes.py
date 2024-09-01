from flask import Blueprint, jsonify, request

from services.RunTimeSeriesService import (
    get_run_time_series_service,
    get_run_time_series_by_id_service,
    create_run_time_series_service,
    create_all_run_time_series_service,
    delete_run_time_series_by_id_service,
)

run_time_series_bp = Blueprint("run_time_series", __name__)


@run_time_series_bp.route("/api/v1/run-time-series", methods=["GET"])
def get_run_time_series_route():
    try:
        run_time_series = get_run_time_series_service()

        run_time_series_list = [data.to_json() for data in run_time_series]

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


@run_time_series_bp.route("/api/v1/run-time-series/<string:id>", methods=["GET"])
def get_run_time_series_by_id_route(id):
    try:
        #         client = get_client_by_id_service(id)
        run_time_series = get_run_time_series_by_id_service(id)

        if not run_time_series:
            return (
                jsonify(
                    {
                        "status": "Error",
                        "message": "Data not found.",
                    }
                ),
                404,
            )

        res = run_time_series.to_json()

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


@run_time_series_bp.route("/api/v1/run-time-series", methods=["POST"])
def create_run_time_series_route():
    try:
        data = request.get_json()

        run_id = data.get("runId")
        time_stamp = data.get("timeStamp")
        parameter = data.get("parameter")
        process_value = data.get("processValue")
        units = data.get("units")

        if (
            not run_id
            or not time_stamp
            or not parameter
            or not process_value
            or not units
        ):
            return (
                jsonify(
                    {
                        "status": "Error",
                        "message": "Missing property from request body for run time series.",
                    }
                ),
                400,
            )

        new_run_time_series = create_run_time_series_service(
            {
                "runId": run_id,
                "timeStamp": time_stamp,
                "parameter": parameter,
                "processValue": process_value,
                "units": units,
            }
        )

        return (
            jsonify(
                {
                    "status": "Success",
                    "message": "Item created successfully",
                    "data": new_run_time_series.to_json(),
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


@run_time_series_bp.route("/api/v1/run-time-series/<string:id>", methods=["DELETE"])
def delete_run_time_series_by_id(id):
    try:
        status = delete_run_time_series_by_id_service(id)

        if not status:
            return (
                jsonify(
                    {
                        "status": "Error",
                        "message": "Data not found.",
                    }
                ),
                404,
            )

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


@run_time_series_bp.route("/api/v1/run-time-series/batch", methods=["POST"])
def create_all_run_time_series_route():
    try:
        data = request.get_json()

        data_list = []

        for row in data:
            run_id = row.get("runId")
            time_stamp = row.get("timeStamp")
            parameter = row.get("parameter")
            process_value = row.get("processValue")
            units = row.get("units")

            if (
                not run_id
                # or not time_stamp
                or not parameter
                # or not process_value
                or not units
            ):
                return (
                    jsonify(
                        {
                            "status": "Error",
                            "message": "Missing property from request body for run time series.",
                        }
                    ),
                    400,
                )
            else:
                data_list.append({
                    "runId": run_id,
                    "timeStamp": time_stamp or -1,
                    "parameter": parameter,
                    "processValue": process_value or 0,
                    "units" : units,
                })

        new_run_time_series = create_all_run_time_series_service(data_list)
        
        run_time_series_list = [data.to_json() for data in new_run_time_series]

        return (
            jsonify(
                {
                    "status": "Success",
                    "message": "All item created successfully",
                    "runTimeSeries": run_time_series_list,
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
