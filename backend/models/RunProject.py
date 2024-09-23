class RunProject:
    def __init__(self, id, run_id, project_name):
        self.id = id
        self.run_id = run_id
        self.project_name = project_name

    def to_json(self):
        return {
            "id": self.id,
            "runId": self.run_id,
            "projectName": self.project_name,
        }
