from ics import Calendar
import requests
import re
import json
import jsbeautifier
import os

class NinerEvent:
    def __init__(self, name, start, end, lat, lng, url, location, description, host):
        self.name = name
        self.start = start
        self.end = end
        self.lat = lat
        self.lng = lng
        self.location = location
        self.description = description
        self.url = url 
        self.host = host
        


def get_ics_data(ics_url='https://ninerengage.charlotte.edu/events.ics', print_num_events=True):

    # Putting data into calendar
    ics_data = requests.get(ics_url).text
    ics_data = re.sub(r'(CATEGORIES:[^\n]+\n)(CATEGORIES:[^\n]+\n)+', r'\1', ics_data)
    c = Calendar(ics_data)

    # Creating list of events
    event_list = [] 
    for event in list(c.events):
        pal = "PAL Session"
        # Checking if the event is a PAL Session or It is cancelled 
        if pal != event.name[:11] and event.status != "CANCELLED":
            print(vars(event))
            lat = ""
            lng = ""

            # Description Filtering
            match = re.search(r'^(.*?)\s*\n\s*\n\s*Hosted by:\s*(.*?)\s*\n\s*\n', event.description, re.DOTALL)
            description = ""
            organization = ""
            if match:
                description = match.group(1).strip()
                organization = match.group(2).strip()

            if event.geo:
                lat = f"{event.geo[0]}"
                lng = f"{event.geo[1]}"
            Niner_Event = NinerEvent(
                name = event.name,
                start = f"{event.begin}",
                end = f"{event.end}",
                lat = lat,
                lng = lng,
                url = event.url,
                location = event.location,
                description = description,
                host=organization)

            event_list.append(Niner_Event)
    
    if print_num_events == True:
        print(f"Num of Events: {len(event_list)} ")
        counter = 0
        counter_desc = 0
        for event in event_list:
            if event.lat != "" and event.lng != "": 
                counter += 1
            if "Additional Information" in event.description:
                counter_desc += 1

        print(f"Num of Events with Geo: {counter} ")
        print(f"Num of Events with Link Desc: {counter_desc} ")

    return event_list

def jsonify_events(event_list, file_path="./map-engage/src/data/events.json"):
    event_list_json = []
    for event in event_list:
        event_dict = {
            "name": event.name,
            "start": event.start,
            "end": event.end,
            "lat": event.lat,
            "lng": event.lng,
            "url": event.url,
            "location": event.location,
            "description": event.description,
            "host": event.host}
        event_list_json.append(event_dict)
        f = json.dumps(event_list_json)
        res = jsbeautifier.beautify(f)
        with open(file_path, 'w') as file:
            file.write(res)

def make_events(file_path="./map-engage/src/data/events.json"):
    event_list = get_ics_data(print_num_events=True)
    jsonify_events(event_list)
        
make_events()