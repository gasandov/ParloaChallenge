import { ICoordinates, ICustomer } from "../types";

import { greateCircleDistance, getPlainStringFromUUID } from "../utils/index";

export const getInvitedCustomersList = (data: (ICustomer | undefined)[], radius: number, metricUnit: string) => {
  const { PARLOA_COORD_LAT: parloaLat, PARLOA_COORD_LONG: parloaLong } = process.env;

  if (data?.length > 0 && parloaLat && parloaLong) {
    const customers: string[] = [];

    data.forEach(customer => {
      if (customer) {
        const { id, lat, long } = customer;
        const coordinates: ICoordinates = {
          lat1: +parloaLat,
          lng1: +parloaLong,
          lat2: lat,
          lng2: long,
          metricUnit
        };

        const distance = +greateCircleDistance(coordinates)

        if (distance <= radius) {
          customers.push(id);
        }
      }
    });

    return customers;
  }

  return [];
};

export const getSortedCustomersList = (customersIDsList: string[]) => {
  return customersIDsList.sort((a: string, b: string) => {
    const strA = getPlainStringFromUUID(a);
    const strB = getPlainStringFromUUID(b);

    if (strA > strB) {
      return 1;
    }

    return -1;
  });
}