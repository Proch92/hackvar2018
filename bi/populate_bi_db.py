import MySQLdb
import random

model_names = [
	'ME',
	'LEX',
	'LE',
	'ICE',
	'LT',
	'SE',
	'LFU',
	'AR',
	'LM',
	'TS',
	'RT',
	'NT',
	'SC',
	'SL',
	'PM',
	'OPD'
]

model_numbers = [
	'120',
	'320',
	'520',
	'2000',
	'1050',
	'5500',
	'1050',
	'400',
	'500',
	'800',
	'910',
	'920',
	'750',
	'770',
	'2500',
	'3000'
]

tipologia_problema = [
	'software',
	'logoramento',
	'difetto di fabbrica',
	'elettronico',
	'rottura'
]

db = MySQLdb.Connection("127.0.0.1","mysqluser","mysqlpwd","tickets")

cursor = db.cursor()

# tickets
for i in range(20000):
	durata = int(abs(random.gauss(80, 25)))
	livello = random.randint(1,2)
	model_type = random.choice(model_names)
	model_number = random.choice(model_numbers)
	modello = 'NIDEK %s-%s' % (model_type, model_number)
	if livello == 2:
		duratasecondoliv = int(abs(random.gauss(40, 15)))
	else:
		duratasecondoliv = 'NULL'
	tipo_prob = random.choice(tipologia_problema)

	cursor.execute("insert into ticket (durata_ticket, level, modello, durata_assistenza, tipologia_problema) values(%s, %s, '%s', %s, '%s')" % (durata, livello, modello, duratasecondoliv, tipo_prob))

db.commit()

db.close()