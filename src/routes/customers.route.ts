import { Router } from "express";

import { invitedCustomers } from "../controllers/customers.controller";

export const router: Router = Router();

router
  .route("/invite")
  .get(invitedCustomers);