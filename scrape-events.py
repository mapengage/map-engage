from ics import Calendar
import requests
import re

def get_ics_data(url='https://ninerengage.charlotte.edu/events.ics'):
    ics_data = requests.get(url).text
    ics_data = re.sub(r'(CATEGORIES:[^\n]+\n)(CATEGORIES:[^\n]+\n)+', r'\1', ics_data)
    c = Calendar(ics_data)

    for event in list(c.events):
        pal = "PAL Session"
        if pal == event.name[:11]:
            c.events.remove(event)
