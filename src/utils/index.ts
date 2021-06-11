import fs from "fs";

import { ICustomer, ICoordinates } from "../types";

const PI = Math.PI;
const RADIUS_OF_EARTH = 6371e3;
const METRIC_UNITS: { [unit: string]: number } = {
  "km": 1000
}

export const extractDataFromFile = (fileName: string) => {
  const extractedData = fs.readFileSync(`./resources/${fileName}`).toString().split("\n");
  return convertDataToJSON(extractedData);
};

export const convertDataToJSON = (data: string[]): (ICustomer | undefined)[] => {
  try {
    const jsonData = data.map(element => {
      if (element) {
        const [id, lat, long] = element.split(",");
        const [, keytoTrimm] = id.split(":");
        const [, latValue] = lat.split(":");
        const [, longValue] = long.split(":");
        const key = keytoTrimm.trim();

        const customer: ICustomer = { id: key, lat: +latValue, long: +longValue };
        return customer;
      }
    });

    return jsonData;
  } catch (error) {
    throw new TypeError("There was an error while parsing provided data");
  }
};

export const greateCircleDistance = ({ lat1, lat2, lng1, lng2, metricUnit }: ICoordinates) => {
  // a = square of half the chord length between points
  // c = angular distance in radians

  const φ1 = getRadians(lat1);
  const φ2 = getRadians(lat2);
  const Δφ = getRadians(lat2 - lat1);
  const Δλ = getRadians(lng2 - lng1);

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const d = RADIUS_OF_EARTH * c;

  return (d / METRIC_UNITS[metricUnit]).toFixed(2);
};

export const getRadians = (coordinate: number) => (coordinate * PI) / 180;

export const getPlainStringFromUUID = (uuid: string) => uuid.split("-").join("");