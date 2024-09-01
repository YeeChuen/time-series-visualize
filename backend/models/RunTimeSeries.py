class RunTimeSeries:
    def __init__(self, id, run_id, time_stamp, parameter, process_value, units):
        self.id = id
        self.run_id = run_id
        self.time_stamp = time_stamp
        self.parameter = parameter
        self.process_value = process_value
        self.units = units

    def to_json(self):
        return {
            "id": self.id,
            "runId": self.run_id,
            "timeStamp": self.time_stamp,
            "parameter": self.parameter,
            "processValue": self.process_value,
            "units": self.units,
        }
