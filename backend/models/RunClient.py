class RunClient:
    def __init__(self, id, run_id, client_name):
        self.id = id
        self.run_id = run_id
        self.client_name = client_name

    def to_json(self):
        return {
            "id": self.id,
            "runId": self.run_id,
            "clientName": self.client_name,
        }
