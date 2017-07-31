#!/usr/bin/env python
# Name: Ian Epping
# Student number: N/A
'''
This script scrapes IMDB and outputs a CSV file with highest rated tv series.
'''
import csv

from pattern.web import URL, DOM

TARGET_URL = "http://www.imdb.com/search/title?num_votes=5000,&sort=user_rating,desc&start=1&title_type=tv_series"
BACKUP_HTML = 'tvseries.html'
OUTPUT_CSV = 'tvseries.csv'

rows = []

def extract_tvseries(dom):
    '''
    Extract a list of highest rated TV series from DOM (of IMDB page).

    Each TV series entry should contain the following fields:
    - TV Title
    - Rating
    - Genres (comma separated if more than one)
    - Actors/actresses (comma separated if more than one)
    - Runtime (only a number!)
    '''

    #print dom.body.content
    for element in dom.by_class('lister-item-content'):
        Title = element.by_class('lister-item-header')[0].by_tag('a')[0].content
        Rating = element.by_class('ratings-bar')[0].by_tag('strong')[0].content
        Genre = element.by_class('genre')[0].content
        Stars = element.by_tag('p')[2].by_tag('a')
        Stars = [s.content for s in Stars]
        Stars = ','.join(Stars)
        Runtime = element.by_class('runtime')[0].content
        Runtime = Runtime.split()[0]
        IMDB = [Title, Rating, Genre, Stars, Runtime]
        rows.append(IMDB)

    return Title, Rating, Genre, Stars, Runtime

def save_csv(f, tvseries):
    '''
    Output a CSV file containing highest rated TV-series.
    '''
    writer = csv.writer(f)
    writer.writerow(['Title', 'Rating', 'Genre', 'Stars', 'Runtime'])
    # python write file to disk
    writer.writerows(rows)

if __name__ == '__main__':
    # Download the HTML file
    url = URL(TARGET_URL)
    html = url.download()

    # Save a copy to disk in the current directory, this serves as an backup
    # of the original HTML, will be used in grading.
    with open(BACKUP_HTML, 'wb') as f:
        f.write(html)

    # Parse the HTML file into a DOM representation
    dom = DOM(html)

    # Extract the tv series (using the function you implemented)
    tvseries = extract_tvseries(dom)

    # Write the CSV file to disk (including a header)
    with open(OUTPUT_CSV, 'wb') as output_file:
        save_csv(output_file, tvseries)
