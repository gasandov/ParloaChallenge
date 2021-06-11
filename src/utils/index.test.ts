import {
  getRadians,
  convertDataToJSON,
  greateCircleDistance,
  getPlainStringFromUUID
} from ".";
import { ICoordinates, ICustomer } from "../types";

describe("convertDataToJSON()", () => {
  test("should parse data correctly to JSON", () => {
    const data: string[] = [
      "id: 6890001c-57d4-4289-ab95-09a15a4cc775, lat: 52.90932574, long:17.84508792, \r",
      "id: 25de3804-ca98-463b-88e0-17d3ae8418dc, lat: 51.37904454, long:16.02052927, \r"
    ];
    const expectedJSON: ICustomer[] = [
      {
        id: "6890001c-57d4-4289-ab95-09a15a4cc775",
        lat: 52.90932574,
        long: 17.84508792,
      },
      {
        id: "25de3804-ca98-463b-88e0-17d3ae8418dc",
        lat: 51.37904454,
        long: 16.02052927,
      },
    ];

    expect(convertDataToJSON(data)).toStrictEqual(expectedJSON);
  })


  test("should send an empty array with data is not provided", () => {
    const data: string[] = [];

    expect(convertDataToJSON(data)).toStrictEqual([]);
  });

  test("should throw an error with there is corrupted data", () => {
    const data: string[] = [
      'id: 51730bbd-9bce-4d28-ae30-580e2ddd1be8, lat: 50.43483821, long:11.96975958, \r',
      'id: 6890001c-57d4-4289-ab95-09a15a4cc775, \r'
    ];

    try {
      convertDataToJSON(data)
    } catch (error) {
      expect(error.message).toBe("There was an error while parsing provided data");
    }
  });
});

describe("greateCircleDistance()", () => {
  test("should get distance correctly", () => {
    const coordinates: ICoordinates = {
      lat1: 52.493256,
      lng1: 13.446082,
      lat2: 50.43483821,
      lng2: 11.96975958,
      metricUnit: "km"
    };

    expect(greateCircleDistance(coordinates)).toBe("250.68");
  });

  test("should return NaN when metric unit has not been contemplated", () => {
    const coordinates: ICoordinates = {
      lat1: 52.493256,
      lng1: 13.446082,
      lat2: 50.43483821,
      lng2: 11.96975958,
      metricUnit: "ft"
    };

    expect(greateCircleDistance(coordinates)).toBe("NaN");
  });
});

describe("getPlainStringFromUUID()", () => {
  test("should return a plain string when an UUID is provided", () => {
    expect(getPlainStringFromUUID("35430660-5708-4364-bc3b-ccd1129ea4ad")).toBe("3543066057084364bc3bccd1129ea4ad");
  });

  test("should string remain equal when value is not a UUID", () => {
    expect(getPlainStringFromUUID("otherThing")).toBe("otherThing");
  });
});

describe("getRadians()", () => {
  // TODO: Implement getRadius tests
});

describe("extractDataFromFile", () => {
  // TODO: Mock fs library
});