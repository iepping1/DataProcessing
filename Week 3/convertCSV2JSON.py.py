import csv
import json

with open('2016.csv') as f:
    reader = csv.DictReader(f)
    rows = list(reader)

with open('2016.json', 'w') as f:
    json.dump(rows, f)
