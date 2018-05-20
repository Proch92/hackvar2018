from flask import Flask, request, abort
from flask_restful import Resource, Api, reqparse
from flask_jsonpify import jsonify
from json import dumps
from tinydb import TinyDB, Query
import datetime

app = Flask(__name__)
api = Api(app)
db = TinyDB('tickets.json')

parser = reqparse.RequestParser()
parser.add_argument('id', type=int)
parser.add_argument('desc')
parser.add_argument('open')

class Tickets(Resource):
	def get(self):
		result = db.all()
		return result
	
	def post(self):
		args = parser.parse_args()
		tickets = db.all()
		
		maxid = len(tickets) + 1
		newticket = {'id': maxid, 'desc': args['desc'], 'open': 'open', 'date_created': date2str(datetime.datetime.now())}
		
		db.insert(newticket)
		return newticket, 201
	
	def delete(self):
		args = parser.parse_args()
		
		query = Query()
		ticket = db.update({'open': 'close'}, query.id == args['id'], 'date-closed': date2str(datetime.datetime.now()))

		return ticket, 202

	def date2str(self, date):
		return date.strftime("%y-%m-%d-%H-%M")


api.add_resource(Tickets, '/tickets')


if __name__ == '__main__':
	 app.run(port=5002, debug=True)