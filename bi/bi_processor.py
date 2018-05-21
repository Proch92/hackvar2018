import json
import pymongo
from pymongo import Connection
import datetime

mongo_port = 27017
mongo_addr = 'localhost'

connection = Connection(mongo_addr, mongo_port)

db = connection['indilium-db']
userData_acty = db['userdata_acties']
userData_chatbot = db['userdata_chatbots']

acty_list = userData_acty.find()
chatbot_list = userData_chatbot.find()

print acty_list[0]['modello_macchina']