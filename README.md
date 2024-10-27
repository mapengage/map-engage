<p align="center">
    <img src="https://github.com/user-attachments/assets/c261600f-2b7f-42ed-8de8-890a244d098e" alt="output" width="500" />
</p>




# Map Engage 
Map Engage is a Node.js application designed to put all the events on Niner Engage on a map for easy viewing access. You can also add events to your calendar and open the routing in Google Maps. 

![image](https://github.com/user-attachments/assets/e52cacfb-8200-4a2f-9ee8-eedb3e3ed622)
![image](https://github.com/user-attachments/assets/ea393c41-6a49-47fe-b4dd-7428469c349a)




## Table of Contents

- [Installation](#installation)
- [Running the Project](#running-the-project)
- [Usage](#usage)

## Installation

1. **Clone the Repository**

   Clone this repository to your local machine using:

   ```bash
   git clone https://github.com/mapengage/map-engage.git
   cd map-engage
   ```

2. **Install Npm, Node.js, and the dependencies**

   Make sure you have Node.js and npm installed. Install the required dependencies by running:

   ```bash
   npm install
   ```

3. **Install Python, and the dependencies**

   Make sure you have Python 3 installed. Install the required dependencies by running:

   For Windows:
   
   ```bash
   pip install -r requirements.txt
   ```

   For Unix-based Systems (Linux, MacOS):

   ```bash
   pip3 install -r requirements.txt
   ```

## Running the Project

Before starting the application, you need to load the NinerEngage events from their servers onto your computer.

### For Windows

Run the following command:

```bash
npm run loadevents
```

### For Unix-based Systems (Linux, MacOS)

Run the following command:

```bash
npm run loadevents_unix
```

## After loading events, you can start the application with:

```bash
npm start
```

It should start on localhost:3000.

## Usage

Navigate to http://localhost:3000/ and enjoy!
