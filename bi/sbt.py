import	sys
import	getopt
import	json
import	pymongo
from	pymongo				import Connection
import	datetime
from	collections			import Counter
import	csv
import 	matplotlib.pyplot 	as plt

mongo_port		=	27017
mongo_addr		=	'localhost' #'35.234.126.73'

def usage():
	print "SBT - Simple BI Tool"
	print
	print "Usage: sbt.py"
	print "-f filepath	- specifies a csv file to get the data"
	print
	print "Examples:"
	print "sbt.py"
	print "sbt.py -f file.csv"
	sys.exit(0)

def csv_to_list(path, lvl):
	with open(path, 'rb') as f:
		my_list = []
		reader = csv.reader(f)
		next(reader, None)
		for row in reader:
			my_list.append(row)

	x = []
	for element in my_list:
		if int(element[2]) == lvl:
			x.append(element)

	return x

def plot_data(list1, list2):
	
	# PLOT CALL DURATION DISTRIBUTION
	durations = []
	for element in list2:
		durations.append(int(element[4]))

	x_beg = min(durations)
	x_end = max(durations)
	x = range(x_beg, x_end + 1)
	y = [0] * len(x)

	for number in durations:
		y[number - x_beg] += 1

	plt.figure(figsize = (11, 11))
	plt.subplot(2, 2, 1)
	plt.plot(x, y, color = '#4D4A50')
	plt.xlabel('Call Duration (minutes)')
	plt.ylabel('Density')
	plt.title('Density Plot for Assistance Call Duration')

	# PLOT ACTY CALLS PERCENTAGE
	labels = ['Issues solved with chatbot only', 'Issues solved with acty call']
	colors = ['red', 'gold']
	
	total = len(list1) + len(list2)
	sizes = [(float(len(list1)) / total) * 100, (float(len(list2)) / total) * 100]
	plt.subplot(2, 2, 2)
	patches, text = plt.pie(sizes, colors = colors)
	plt.legend(patches, labels, loc = 'best')
	plt.axis('equal')
	plt.title('Percentage of resolved issues')

	# PLOT COMPONENT FAULT DISTRIBUTION
	modelcount = []
	for element in list1:
		modelcount.append(str(element[3]))

	models = list(set(modelcount))
	x = range(0, len(models))
	distribution = [0] * len(x)

	for element in modelcount:
		index = models.index(element)
		distribution[index] += 1

	plt.subplot(2, 2, 3)
	plt.plot(x, distribution, color = '#4D4A50')
	plt.xlabel('Machine model')
	plt.ylabel('Density')
	plt.title('Density Plot for Broken Machinery')

	# PLOT PROBLEM TYPE DISTRIBUTION
	problemcount = []
	for element in list1:
		problemcount.append(str(element[5]))

	problems = list(set(problemcount))
	x = range(0, len(problems))
	distribution = [0] * len(x)

	for element in problemcount:
		index = problems.index(element)
		distribution[index] += 1

	plt.subplot(2, 2, 4)
	plt.plot(x, distribution, color = '#4D4A50')
	plt.xlabel('Problem Type')
	plt.ylabel('Density')
	plt.title('Density Plot for Problem Types')
	plt.show()

def main():
	acty_list = None
	chatbot_list = None	

	# DB CONNECTION
	connection = Connection(mongo_addr, mongo_port)
	db = connection['indilium-db']

	# READ COMMAND LINE OPTIONS
	try:
		opts, args = getopt.getopt(sys.argv[1:], "hf:", ["help", "file"])
	except getopt.GetoptError as err:
		print str(err)
		usage()

	for o,a in opts:
		if o in ("-h"):
			usage()
		elif o in ("-f"):
			acty_list = csv_to_list(a, 2)
			chatbot_list = csv_to_list(a, 1)
		else:
			assert False, "Unhandled Option"

	# ISTANTIATE DATA LISTS	
	if acty_list is None:
		userData_acty = db['userdata_acties']
		acty_list = userData_acty.find()

	if chatbot_list is None:
		userData_chatbot = db['userdata_chatbots']
		chatbot_list = userData_chatbot.find()

	plot_data(chatbot_list, acty_list)

	sys.exit(0)
	
main()