"""
	let words = [
		{word: 'a', translation: 'a, to'},
	]
"""

def toJSON(raw):
	split = raw.strip().replace('\\', '/').replace('\'', '\\\'').split('|')
	isVerb = split[1].startswith('to ')
	json = '{word: \'' + split[1] + '\', translation: \'' + split[0] + '\', isVerb: ' + str(isVerb).lower() + '},\n'

	return json;

spanishFile = open('master_spanish.txt', 'r')
jsonFile = open('master_spanish.json', 'w')

for line in spanishFile:
	jsonFile.write(toJSON(line))
	
jsonFile.close()
spanishFile.close()