from flask import Flask, send_from_directory
from query.init_db import init_db
from flask_cors import CORS

from routes.RunClientRoutes import run_clients_bp
from routes.RunTimeSeriesRoutes import run_time_series_bp
import os

init_db()
app = Flask(__name__, static_folder="../frontend/dist", static_url_path="/")
CORS(app)

@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')

app.route("/")
def index():
    return app.send_static_file("index.html")


app.register_blueprint(run_clients_bp)
app.register_blueprint(run_time_series_bp)


if __name__ == "__main__":
    app.run(debug=True)