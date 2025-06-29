#!/bin/bash

read -p "Do you want to run the Python script? (y/n): " user_response

if [[ "$user_response" == "y" || "$user_response" == "Y" ]]; then
    echo "Starting the Python script..."

    cd ~/myenv

    source bin/activate

    python3 script.py
elif [[ "$user_response" == "n" || "$user_response" == "N" ]]; then
    echo "Script will not be run. Exiting."
    exit 0
else
    echo "Invalid input. Please type 'y' or 'n'. Exiting."
    exit 1
fi



