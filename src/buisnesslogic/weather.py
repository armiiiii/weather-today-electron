"""Will be called to bring the data about the weather in the city"""

import os
import sys

import requests
from dotenv import load_dotenv


def main(city: str, api_key: str) -> bytes:
    link = f"http://api.weatherapi.com/v1/current.json?key={api_key}&q={city}&aqi=no"
    resp = requests.get(link)
    print(resp.text)


if __name__ == "__main__":
    load_dotenv()
    main(sys.argv[1], os.getenv("WEATHER_API_KEY")) # sys.argv[1] == City name
     