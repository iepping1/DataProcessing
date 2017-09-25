import csv, json

csvfile = open('countries2.csv', 'r')
jsonfile = open('countries.json', 'w')

fieldnames = ("Country","happiness")
jsonfile.write('[')
reader = csv.DictReader(csvfile, fieldnames)
for row in reader:
    json.dump(row, jsonfile)
    jsonfile.write(',\n')
jsonfile.write(']')
jsonfile.close()
