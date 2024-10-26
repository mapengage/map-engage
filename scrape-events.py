from ics import Calendar
import requests
import re
import json

class NinerEvent:
    def __init__(self, name, start, end, geo, url, location, description):
        self.name = name
        self.start = start
        self.end = end
        self.geo = geo
        self.location = location
        self.description = description
        self.url = url 


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
            geo = ""
            if event.geo:
                geo = f"{event.geo[0]},{event.geo[1]}"
            Niner_Event = NinerEvent(
                name = event.name,
                start = f"{event.begin}",
                end = f"{event.end}",
                geo = geo,
                url = event.url,
                location = event.location,
                description = event.description)
            event_list.append(Niner_Event)
    
    if print_num_events == True:
        print(f"Num of Events: {len(event_list)} ")
        counter = 0
        for event in event_list:
            if event.geo != "": 
                counter += 1

        print(f"Num of Events with Geo: {counter} ")

    return event_list

def jsonify_events(event_list, file_path="./events.json"):
    event_list_json = []
    for event in event_list:
        event_dict = {
            "name": event.name,
            "start": event.start,
            "end": event.end,
            "geo": event.geo,
            "url": event.url,
            "location": event.location,
            "description": event.description}
        event_list_json.append(event_dict)
        with open(file_path, "w") as f: 
            json.dump(event_list_json, f)

event_list = get_ics_data()
jsonify_events(event_list)
    