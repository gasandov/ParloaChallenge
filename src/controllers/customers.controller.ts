import { Request, Response } from "express";

import { getInvitedCustomersList, getSortedCustomersList } from "../modules/customers.module";
import { ICustomer } from "../types";
import { extractDataFromFile } from "../utils";

type Params = {};
type Body = {};
type Query = {
  radius?: number;
  metricUnit?: string;
}
type Req = Request<Params, {}, Body, Query>;

export const invitedCustomers = (req: Req, res: Response) => {
  try {
    const data: (ICustomer | undefined)[] = extractDataFromFile("customers.txt");
    const { radius = 100, metricUnit = "km" } = req.query;
    const customers = getInvitedCustomersList(data, radius, metricUnit);
    const sortedCustomersList = getSortedCustomersList(customers);

    console.log(`Customers that goes to the party: `, sortedCustomersList);

    res.status(200).json({
      success: true,
      data: sortedCustomersList
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};