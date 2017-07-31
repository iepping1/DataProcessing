import csv, json

csvfile = open('KNMI_20170712.txt', 'r')
jsonfile = open('2017temp.json', 'w')

fieldnames = ("Station","Date","TempG","Tempmin","Tempmax")
jsonfile.write('[')
for i in range(15):
    csvfile.next()
reader = csv.DictReader(csvfile, fieldnames)
for row in reader:
    json.dump(row, jsonfile)
    jsonfile.write(',\n')
jsonfile.write(']')
jsonfile.close()
