import paho.mqtt.client as mqtt
import firebase_admin
from firebase_admin import firestore, credentials
from datetime import datetime
import logging
import time
import signal
import sys
import geocoder
import pytz

# Broker details
MQTT_BROKER = "52.164.218.228"
MQTT_PORT_OUTSIDE = 1883  # Port for outside topics
MQTT_PORT_INSIDE = 1884   # Port for inside topics

# Topics for inside (port 1884)
MQTT_INSIDE_TEMPERATURE_TOPIC = "songuku/insidetemperature"
MQTT_INSIDE_HUMIDITY_TOPIC = "songuku/insidehumidity"

# Topics for outside (port 1883)
MQTT_OUTSIDE_TEMPERATURE_TOPIC = "songuku/outsidetemperature"
MQTT_OUTSIDE_HUMIDITY_TOPIC = "songuku/outsidehumidity"
MQTT_OUTSIDE_MOTION_TOPIC = "songuku/outsidemotion"

# Firebase credentials
FIREBASE_CREDENTIALS = "smartmonitoringsystem-8e77c-firebase-adminsdk-hu6uu-1331ff2ea7.json"

logging.basicConfig(
    format='%(asctime)s [%(levelname)s]: %(message)s',
    level=logging.INFO
)

try:
    cred = credentials.Certificate(FIREBASE_CREDENTIALS)
    firebase_admin.initialize_app(cred)
    db = firestore.client()
    logging.info("Firebase initialized successfully.")
except Exception as e:
    logging.error(f"Failed to initialize Firebase: {e}")
    sys.exit(1)

cached_location = None
last_geolocation_time = 0
GEOLOCATION_REFRESH_INTERVAL = 60 * 60

def get_geolocation():
    global cached_location, last_geolocation_time
    current_time = time.time()
    if cached_location is None or current_time - last_geolocation_time > GEOLOCATION_REFRESH_INTERVAL:
        logging.info("Fetching new geolocation data...")
        g = geocoder.ip('me')
        if g.ok:
            cached_location = g.latlng
            last_geolocation_time = current_time
            logging.info(f"New geolocation fetched: {cached_location}")
        else:
            logging.warning("Failed to fetch geolocation data. Using previous cached value.")
            cached_location = [None, None]
    return cached_location

def on_connect(client, userdata, flags, rc):
    if rc == 0:
        if client == client_inside:
            logging.info("Connected to MQTT broker on port 1884. Subscribing to inside topics...")
            client.subscribe(MQTT_INSIDE_TEMPERATURE_TOPIC)
            client.subscribe(MQTT_INSIDE_HUMIDITY_TOPIC)
        elif client == client_outside:
            logging.info("Connected to MQTT broker on port 1883. Subscribing to outside topics...")
            client.subscribe(MQTT_OUTSIDE_TEMPERATURE_TOPIC)
            client.subscribe(MQTT_OUTSIDE_HUMIDITY_TOPIC)
            client.subscribe(MQTT_OUTSIDE_MOTION_TOPIC)
    else:
        logging.error(f"Failed to connect to MQTT broker. Return code: {rc}")

def on_message(client, userdata, msg):
    try:
        payload = msg.payload.decode()
        topic = msg.topic

        local_timezone = pytz.timezone('Europe/Copenhagen')
        timestamp = datetime.now(local_timezone).strftime("%Y-%m-%d %H:%M:%S")
        log_message = f"\nTopic: {topic}\nData: {payload}\nTimestamp: {timestamp}"
        logging.info(log_message)

        location = get_geolocation()
        batch = db.batch()

        # Handling messages based on topics
        if topic == MQTT_INSIDE_TEMPERATURE_TOPIC:
            data = {"value": f"{float(payload)} °C", "timestamp": timestamp, "location": location}
            doc_ref = db.collection("insideTemperatureData").document()
            batch.set(doc_ref, data)
        elif topic == MQTT_INSIDE_HUMIDITY_TOPIC:
            data = {"value": f"{float(payload)} %", "timestamp": timestamp, "location": location}
            doc_ref = db.collection("insideHumidityData").document()
            batch.set(doc_ref, data)
        elif topic == MQTT_OUTSIDE_TEMPERATURE_TOPIC:
            data = {"value": f"{float(payload)} °C", "timestamp": timestamp, "location": location}
            doc_ref = db.collection("outsideTemperatureData").document()
            batch.set(doc_ref, data)
        elif topic == MQTT_OUTSIDE_HUMIDITY_TOPIC:
            data = {"value": f"{float(payload)} %", "timestamp": timestamp, "location": location}
            doc_ref = db.collection("outsideHumidityData").document()
            batch.set(doc_ref, data)
        elif topic == MQTT_OUTSIDE_MOTION_TOPIC:
            data = {"status": payload, "timestamp": timestamp, "location": location}
            doc_ref = db.collection("outsideMotionData").document()
            batch.set(doc_ref, data)

        batch.commit()
        logging.info("Data successfully written to Firestore.\n")

    except Exception as e:
        logging.error(f"Failed to process message: {e}")

def connect_mqtt(port):
    client = mqtt.Client()
    client.on_connect = on_connect
    client.on_message = on_message
    while True:
        try:
            client.connect(MQTT_BROKER, port, 60)
            logging.info(f"Connected to MQTT broker on port {port}.")
            return client
        except Exception as e:
            logging.error(f"Error connecting to MQTT broker on port {port}: {e}. Retrying in 5 seconds...")
            time.sleep(5)

def handle_signal(signal, frame):
    logging.info("Interrupt received, shutting down...")
    sys.exit(0)

signal.signal(signal.SIGINT, handle_signal)

if __name__ == "__main__":
    # Initialize clients for both ports
    client_outside = connect_mqtt(MQTT_PORT_OUTSIDE)
    client_inside = connect_mqtt(MQTT_PORT_INSIDE)

    # Start listening to both clients
    client_outside.loop_start()
    client_inside.loop_start()

    while True:
        try:
            time.sleep(1)
        except Exception as e:
            logging.error(f"Unexpected error: {e}")
            break
