from flask import Flask
from query.init_db import init_db
from flask_cors import CORS

from routes.RunClientRoutes import run_clients_bp
from routes.RunTimeSeriesRoutes import run_time_series_bp

init_db()
app = Flask(__name__)
CORS(app)
app.register_blueprint(run_clients_bp)
app.register_blueprint(run_time_series_bp)


if __name__ == "__main__":
    app.run(post=5000, debug=True)