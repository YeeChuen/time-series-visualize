import pytest
from app import app
from unittest.mock import patch, MagicMock


@pytest.fixture
def project():
    app.config["TESTING"] = True
    with app.test_client() as project:
        yield project


""" run-projects testing """


# Test for the GET /api/v1/run-projects route
@patch("services.RunProjectService.get_project")
def test_get_project_route(mock_get_project, project):
    mock_project = MagicMock()
    mock_project.to_json.return_value = {
        "id": "cad616c4-2454-4e6b-a544-74921fe92c86",
        "run_id": "TEST001",
        "project_name": "Project Test 001",
    }
    mock_get_project.return_value = [mock_project]

    response = project.get("/api/v1/run-projects")

    mock_get_project.assert_called_once()
    assert response.status_code == 200
    assert b"runProjects" in response.data
    assert b"cad616c4-2454-4e6b-a544-74921fe92c86" in response.data
    assert b"TEST001" in response.data
    assert b"Project Test 001" in response.data


# GET run project by id
@patch("services.RunProjectService.get_project_by_id")
def test_get_project_by_id_route(mock_get_project_by_id, project):
    mock_project = MagicMock()
    mock_project.to_json.return_value = {
        "id": "cad616c4-2454-4e6b-a544-74921fe92c86",
        "run_id": "TEST001",
        "project_name": "Project Test 001",
    }
    mock_get_project_by_id.return_value = mock_project

    response = project.get("/api/v1/run-projects/cad616c4-2454-4e6b-a544-74921fe92c86")

    mock_get_project_by_id.assert_called_once()
    assert response.status_code == 200
    assert b"runProjects" not in response.data
    assert b"cad616c4-2454-4e6b-a544-74921fe92c86" in response.data
    assert b"TEST001" in response.data
    assert b"Project Test 001" in response.data


# POST create run project
@patch("services.RunProjectService.create_project")
def test_create_project_route(mock_create_project, project):
    mock_project = MagicMock()
    mock_project.to_json.return_value = {
        "id": "cad616c4-2454-4e6b-a544-74921fe92c86",
        "run_id": "TEST001",
        "project_name": "Project Test 001",
    }
    mock_create_project.return_value = mock_project
    response = project.post(
        "/api/v1/run-projects",
        json={"runId": "TEST001", "projectName": "Project Test 001"},
    )

    mock_create_project.assert_called_once()
    assert response.status_code == 200
    assert b"runProjects" not in response.data
    assert b"cad616c4-2454-4e6b-a544-74921fe92c86" in response.data
    assert b"TEST001" in response.data
    assert b"Project Test 001" in response.data


# DELETE run project by id
@patch("services.RunProjectService.delete_project_by_id")
def test_delete_project_route(mock_delete_project_by_id, project):
    mock_delete_project_by_id.return_value = True

    response = project.delete("/api/v1/run-projects/cad616c4-2454-4e6b-a544-74921fe92c86")

    mock_delete_project_by_id.assert_called_once()
    assert response.status_code == 200
    assert b"Item successfully deleted" in response.data


# GET run time series by run id (get the run time by project)
@patch("services.RunProjectService.get_project_by_id")
@patch("services.RunTimeSeriesService.get_run_time_series_by_run_id")
def test_get_run_time_series_by_run_project_route(
    mock_get_run_time_series_by_run_id, mock_get_project_by_id, project
):
    mock_project = MagicMock()
    mock_project.run_id = "TEST001"
    mock_get_project_by_id.return_value = mock_project

    mock_time_series = MagicMock()
    mock_time_series.to_json.return_value = {
        "id": "a885374a-335a-4639-b225-59cd3f0548e3",
        "parameter": "TEST parameter",
        "processValue": 999,
        "runId": "TEST001",
        "timeStamp": 1001,
        "units": "test unit",
    }

    mock_get_run_time_series_by_run_id.return_value = [mock_time_series]

    response = project.get(
        "/api/v1/run-projects/cad616c4-2454-4e6b-a544-74921fe92c86/run-time-series"
    )

    mock_get_project_by_id.assert_called_once()
    mock_get_run_time_series_by_run_id.assert_called_once()
    assert response.status_code == 200
    assert b"runTimeSeries" in response.data
    assert b"a885374a-335a-4639-b225-59cd3f0548e3" in response.data
    assert b"TEST parameter" in response.data
    assert b"999" in response.data
    assert b"TEST001" in response.data
    assert b"1001" in response.data
    assert b"test unit" in response.data


""" run-projects testing """


# GET all run time series
@patch("services.RunTimeSeriesService.get_run_time_series")
def test_get_run_time_series_route(mock_get_run_time_series, project):

    mock_run_time_series = MagicMock()
    mock_run_time_series.to_json.return_value = {
        "id": "a885374a-335a-4639-b225-59cd3f0548e3",
        "parameter": "TEST parameter",
        "processValue": 999,
        "runId": "TEST001",
        "timeStamp": 1001,
        "units": "test unit",
    }

    mock_get_run_time_series.return_value = [mock_run_time_series]

    response = project.get("/api/v1/run-time-series")

    mock_get_run_time_series.assert_called_once()
    assert response.status_code == 200
    assert b"runTimeSeries" in response.data
    assert b"a885374a-335a-4639-b225-59cd3f0548e3" in response.data
    assert b"TEST parameter" in response.data
    assert b"999" in response.data
    assert b"TEST001" in response.data
    assert b"1001" in response.data
    assert b"test unit" in response.data


# GET  run time series by id
@patch("services.RunTimeSeriesService.get_run_time_series_by_id")
def test_get_run_time_series_route(mock_get_run_time_series_by_id, project):

    mock_run_time_series = MagicMock()
    mock_run_time_series.to_json.return_value = {
        "id": "a885374a-335a-4639-b225-59cd3f0548e3",
        "parameter": "TEST parameter",
        "processValue": 999,
        "runId": "TEST001",
        "timeStamp": 1001,
        "units": "test unit",
    }

    mock_get_run_time_series_by_id.return_value = mock_run_time_series

    response = project.get(
        "/api/v1/run-time-series/a885374a-335a-4639-b225-59cd3f0548e3"
    )

    mock_get_run_time_series_by_id.assert_called_once()
    assert response.status_code == 200
    assert b"runTimeSeries" not in response.data
    assert b"a885374a-335a-4639-b225-59cd3f0548e3" in response.data
    assert b"TEST parameter" in response.data
    assert b"999" in response.data
    assert b"TEST001" in response.data
    assert b"1001" in response.data
    assert b"test unit" in response.data


# POST create run time series
@patch("services.RunTimeSeriesService.create_run_time_series")
def test_create_run_time_series_route(mock_create_run_time_series, project):
    mock_run_time_series = MagicMock()
    mock_run_time_series.to_json.return_value = {
        "id": "a885374a-335a-4639-b225-59cd3f0548e3",
        "parameter": "TEST parameter",
        "processValue": 999,
        "runId": "TEST001",
        "timeStamp": 1001,
        "units": "test unit",
    }
    mock_create_run_time_series.return_value = mock_run_time_series
    response = project.post(
        "/api/v1/run-time-series",
        json={
            "parameter": "TEST parameter",
            "processValue": 999,
            "runId": "TEST001",
            "timeStamp": 1001,
            "units": "test unit",
        },
    )

    mock_create_run_time_series.assert_called_once()
    assert response.status_code == 200
    assert b"runTimeSeries" not in response.data
    assert b"a885374a-335a-4639-b225-59cd3f0548e3" in response.data
    assert b"TEST parameter" in response.data
    assert b"999" in response.data
    assert b"TEST001" in response.data
    assert b"1001" in response.data
    assert b"test unit" in response.data


# DELETE run time series by id
@patch("services.RunTimeSeriesService.delete_run_time_series_by_id")
def test_delete_run_time_series_route(mock_delete_run_time_series_by_id, project):
    mock_delete_run_time_series_by_id.return_value = True

    response = project.delete("/api/v1/run-time-series/a885374a-335a-4639-b225-59cd3f0548e3")

    mock_delete_run_time_series_by_id.assert_called_once()
    assert response.status_code == 200
    assert b"Item successfully deleted" in response.data

# POST create all run time seriese (from list)
@patch('services.RunTimeSeriesService.create_all_run_time_series')
def test_create_all_run_time_series_route(mock_create_all_run_time_series, project):
    mock_run_time_series = MagicMock()
    mock_run_time_series.to_json.return_value = {
        "id": "a885374a-335a-4639-b225-59cd3f0548e3",
        "parameter": "TEST parameter",
        "processValue": 999,
        "runId": "TEST001",
        "timeStamp": 1001,
        "units": "test unit",
    }
    mock_create_all_run_time_series.return_value = [mock_run_time_series]


    response = project.post('/api/v1/run-time-series/batch', json=[
        {
            "parameter": "TEST parameter",
            "processValue": 999,
            "runId": "TEST001",
            "timeStamp": 1001,
            "units": "test unit",
        },
    ])

    mock_create_all_run_time_series.assert_called_once()
    assert response.status_code == 200
    assert b"All item created successfully" in response.data
    assert b"runTimeSeries" in response.data
    assert b"a885374a-335a-4639-b225-59cd3f0548e3" in response.data
    assert b"TEST parameter" in response.data
    assert b"999" in response.data
    assert b"TEST001" in response.data
    assert b"1001" in response.data
    assert b"test unit" in response.data