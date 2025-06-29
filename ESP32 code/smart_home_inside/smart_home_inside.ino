#include <WiFi.h>
#include <PubSubClient.h>
#include <DHT11.h>

const char* ssid = "MIKO";
const char* password = "nizamettin99";
const char* mqtt_server = "52.164.218.228";
const int mqtt_port = 1883;

const char* inside_temperature_topic = "songuku/insidetemperature";
const char* inside_humidity_topic = "songuku/insidehumidity";

DHT11 dht11);
(4
WiFiClient espClient;
PubSubClient client(espClient);

const unsigned long PUBLISH_INTERVAL = 5000;
unsigned long lastPublishTime = 0;

void setup_wifi();
void reconnectMQTT();
void publishSensorData();


void setup() {
  Serial.begin(115200);
  dht11.setDelay(2000);
  setup_wifi();
  client.setServer(mqtt_server, mqtt_port);
  reconnectMQTT();
}

void loop() {
  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("WiFi connection lost. Reconnecting...");
    setup_wifi();
  }

  if (!client.connected()) {
    reconnectMQTT();
  }

  client.loop();

  if (millis() - lastPublishTime >= PUBLISH_INTERVAL) {
    publishSensorData();
    lastPublishTime = millis();
  }


void setup_wifi() {
  Serial.println("Connecting to WiFi...");
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("\nWiFi connected");
  Serial.print("IP Address: ");
  Serial.println(WiFi.localIP());
}

void reconnectMQTT() {
  while (!client.connected()) {
    Serial.println("Attempting MQTT connection...");

    if (client.connect("ESP32Client")) {
      Serial.println("Connected to MQTT broker");
    } else {
      Serial.print("Failed, MQTT State: ");
      Serial.print(client.state());
      Serial.println(". Trying again in 10 seconds...");
      delay(10000);
    }
  }
}

void publishSensorData() {
  int temperature = 0;
  int humidity = 0;

  int result = dht11.readTemperatureHumidity(temperature, humidity);

  if (result == 0) {
    Serial.print("Temperature: ");
    Serial.print(temperature);
    Serial.print(" °C\tHumidity: ");
    Serial.print(humidity);
    Serial.println(" %");

    char tempString[8];
    char humString[8];
    dtostrf(temperature, 1, 2, tempString);
    dtostrf(humidity, 1, 2, humString);

    if (!client.publish(inside_temperature_topic, tempString, true)) {
      Serial.println("Error: Failed to publish temperature data.");
    }

    if (!client.publish(inside_humidity_topic, humString, true)) {
      Serial.println("Error: Failed to publish humidity data.");
    }

  } else {
    Serial.println(DHT11::getErrorString(result));
  }
}