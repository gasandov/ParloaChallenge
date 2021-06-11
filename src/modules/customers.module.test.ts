import { getInvitedCustomersList } from "./customers.module";
import { ICustomer } from "../types";

const customersData: ICustomer[] = [
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

describe("getInvitedCustomersList()", () => {
  test("should return an empty array when no data is provided", () => {
    const data: ICustomer[] = [];

    expect(getInvitedCustomersList(data, 100, "km")).toStrictEqual([]);
  });

  test("should return an empty array when no initial coordinates are provided", () => {
    delete process.env.PARLOA_COORD_LAT;

    expect(getInvitedCustomersList(customersData, 100, "km")).toStrictEqual([]);
  });

  test("should return an empty array when radius is less or equal than 0", () => {
    expect(getInvitedCustomersList(customersData, 0, "km")).toStrictEqual([]);
  });

  test("should return customers within range", () => {
    process.env.PARLOA_COORD_LAT = "52.493256"
    process.env.PARLOA_COORD_LONG = "13.446082"

    const expectedIDsOne: string[] = [
      "25de3804-ca98-463b-88e0-17d3ae8418dc"
    ];

    expect(getInvitedCustomersList(customersData, 216, "km")).toStrictEqual(expectedIDsOne);

    const expectedIDsTwo: string[] = [
      "6890001c-57d4-4289-ab95-09a15a4cc775",
      "25de3804-ca98-463b-88e0-17d3ae8418dc"
    ];

    expect(getInvitedCustomersList(customersData, 800, "km")).toStrictEqual(expectedIDsTwo);
  });
});