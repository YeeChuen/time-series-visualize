import { TRunProject } from "../../types";
import { apiVersion1 } from "../constants";

const url = `${apiVersion1}/run-projects`;

export const getRunProjects = () => {
  return fetch(url)
    .then((response) => {
      const statusCode = response.status;
      return response.json().then((data) => {
        data.statusCode = statusCode;
        return data;
      });
    })
    .catch((error) => {
      return {
        statusCode: 400,
        status: "Error",
        message: error,
      };
    });
};

export const getRunTimeSeriesByRunProject = (runId: string) => {
  return fetch(url + "/" + runId + "/run-time-series")
    .then((response) => {
      const statusCode = response.status;
      return response.json().then((data) => {
        data.statusCode = statusCode;
        return data;
      });
    })
    .catch((error) => {
      return {
        statusCode: 400,
        status: "Error",
        message: error,
      };
    });
};

export const createRunProject = (body: TRunProject) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // This tells the server you're sending JSON
    },
    body: JSON.stringify(body), // Convert the data to a JSON string
  };

  return fetch(url, options)
    .then((response) => {
      const statusCode = response.status;
      return response.json().then((data) => {
        data.statusCode = statusCode;
        return data;
      });
    })
    .catch((error) => {
      return {
        statusCode: 400,
        status: "Error",
        message: error,
      };
    });
};

export const deleteRunProject = (id: string) => {
  const options = {
    method: "DELETE",
  };
  return fetch(url + "/" + id, options)
    .then((response) => {
      const statusCode = response.status;
      return response.json().then((data) => {
        data.statusCode = statusCode;
        return data;
      });
    })
    .catch((error) => {
      return {
        statusCode: 400,
        status: "Error",
        message: error,
      };
    });

}