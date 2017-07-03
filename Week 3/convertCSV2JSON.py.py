import csv, json

csvfile = open('2016.csv', 'r')
jsonfile = open('sample.json', 'w')

fieldnames = ("date","rain")
reader = csv.reader(csvfile, fieldnames)

out = json.dumps( [ dict(zip(row[::2], row[1::2])) for row in reader ] )
jsonfile.write(out)
