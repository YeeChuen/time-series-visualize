import pytest
from app import app
from unittest.mock import patch, MagicMock


@pytest.fixture
def client():
    app.config["TESTING"] = True
    with app.test_client() as client:
        yield client


""" run-clients testing """


# Test for the GET /api/v1/run-clients route
@patch("services.RunClientService.get_client")
def test_get_client_route(mock_get_client, client):
    mock_client = MagicMock()
    mock_client.to_json.return_value = {
        "id": "cad616c4-2454-4e6b-a544-74921fe92c86",
        "run_id": "TEST001",
        "client_name": "Client Test 001",
    }
    mock_get_client.return_value = [mock_client]

    response = client.get("/api/v1/run-clients")

    mock_get_client.assert_called_once()
    assert response.status_code == 200
    assert b"runClients" in response.data
    assert b"cad616c4-2454-4e6b-a544-74921fe92c86" in response.data
    assert b"TEST001" in response.data
    assert b"Client Test 001" in response.data


# GET run client by id
@patch("services.RunClientService.get_client_by_id")
def test_get_client_by_id_route(mock_get_client_by_id, client):
    mock_client = MagicMock()
    mock_client.to_json.return_value = {
        "id": "cad616c4-2454-4e6b-a544-74921fe92c86",
        "run_id": "TEST001",
        "client_name": "Client Test 001",
    }
    mock_get_client_by_id.return_value = mock_client

    response = client.get("/api/v1/run-clients/cad616c4-2454-4e6b-a544-74921fe92c86")

    mock_get_client_by_id.assert_called_once()
    assert response.status_code == 200
    assert b"runClients" not in response.data
    assert b"cad616c4-2454-4e6b-a544-74921fe92c86" in response.data
    assert b"TEST001" in response.data
    assert b"Client Test 001" in response.data


# POST create run client
@patch("services.RunClientService.create_client")
def test_create_client_route(mock_create_client, client):
    mock_client = MagicMock()
    mock_client.to_json.return_value = {
        "id": "cad616c4-2454-4e6b-a544-74921fe92c86",
        "run_id": "TEST001",
        "client_name": "Client Test 001",
    }
    mock_create_client.return_value = mock_client
    response = client.post(
        "/api/v1/run-clients",
        json={"runId": "TEST001", "clientName": "Client Test 001"},
    )

    mock_create_client.assert_called_once()
    assert response.status_code == 200
    assert b"runClients" not in response.data
    assert b"cad616c4-2454-4e6b-a544-74921fe92c86" in response.data
    assert b"TEST001" in response.data
    assert b"Client Test 001" in response.data


# DELETE run client by id
@patch("services.RunClientService.delete_client_by_id")
def test_delete_client_route(mock_delete_client_by_id, client):
    mock_delete_client_by_id.return_value = True

    response = client.delete("/api/v1/run-clients/cad616c4-2454-4e6b-a544-74921fe92c86")

    mock_delete_client_by_id.assert_called_once()
    assert response.status_code == 200
    assert b"Item successfully deleted" in response.data


# GET run time series by run id (get the run time by client)
@patch("services.RunClientService.get_client_by_id")
@patch("services.RunTimeSeriesService.get_run_time_series_by_run_id")
def test_get_run_time_series_by_run_client_route(
    mock_get_run_time_series_by_run_id, mock_get_client_by_id, client
):
    mock_client = MagicMock()
    mock_client.run_id = "TEST001"
    mock_get_client_by_id.return_value = mock_client

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

    response = client.get(
        "/api/v1/run-clients/cad616c4-2454-4e6b-a544-74921fe92c86/run-time-series"
    )

    mock_get_client_by_id.assert_called_once()
    mock_get_run_time_series_by_run_id.assert_called_once()
    assert response.status_code == 200
    assert b"runTimeSeries" in response.data
    assert b"a885374a-335a-4639-b225-59cd3f0548e3" in response.data
    assert b"TEST parameter" in response.data
    assert b"999" in response.data
    assert b"TEST001" in response.data
    assert b"1001" in response.data
    assert b"test unit" in response.data


""" run-clients testing """


# GET all run time series
@patch("services.RunTimeSeriesService.get_run_time_series")
def test_get_run_time_series_route(mock_get_run_time_series, client):

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

    response = client.get("/api/v1/run-time-series")

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
def test_get_run_time_series_route(mock_get_run_time_series_by_id, client):

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

    response = client.get(
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
def test_create_run_time_series_route(mock_create_run_time_series, client):
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
    response = client.post(
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
def test_delete_run_time_series_route(mock_delete_run_time_series_by_id, client):
    mock_delete_run_time_series_by_id.return_value = True

    response = client.delete("/api/v1/run-time-series/a885374a-335a-4639-b225-59cd3f0548e3")

    mock_delete_run_time_series_by_id.assert_called_once()
    assert response.status_code == 200
    assert b"Item successfully deleted" in response.data

# POST create all run time seriese (from list)
@patch('services.RunTimeSeriesService.create_all_run_time_series')
def test_create_all_run_time_series_route(mock_create_all_run_time_series, client):
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


    response = client.post('/api/v1/run-time-series/batch', json=[
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