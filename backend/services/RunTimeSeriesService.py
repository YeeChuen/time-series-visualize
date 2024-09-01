from repository.RunTimeSeriesRepository import (
    get_run_time_series,
    get_run_time_series_by_id,
    get_run_time_series_by_run_id,
    create_run_time_series,
    create_all_run_time_series,
    delete_run_time_series_by_id,
)


def get_run_time_series_service():
    return get_run_time_series()


def get_run_time_series_by_id_service(id):
    return get_run_time_series_by_id(id)


def get_run_time_series_by_run_id_service(run_id):
    return get_run_time_series_by_run_id(run_id)


def create_run_time_series_service(new_run_time_series):
    return create_run_time_series(new_run_time_series)


def create_all_run_time_series_service(new_run_time_series_list):
    return create_all_run_time_series(new_run_time_series_list)


def delete_run_time_series_by_id_service(id):
    return delete_run_time_series_by_id(id)
