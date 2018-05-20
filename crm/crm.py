from flask import Flask, request
from flask_restful import Resource, Api
from flask_jsonpify import jsonify
from json import dumps

app = Flask(__name__)
api = Api(app)

class Ticket(Resource):
	def get(self):
		result = {"hello": "world"}
		return jsonify(result)


api.add_resource(Ticket, '/ticket')


if __name__ == '__main__':
	 app.run(port=5002, debug=True)