import request from "supertest";

import { app } from "../../server";

describe("/invite", () => {
  describe("invitedCustomers()", () => {
    const getInvitedListPath = "/customers/invite";

    afterEach(() => {
      app.getMaxListeners()
    })

    test("should get status 200 and customer list", async () => {
      const response = await request(app).get(getInvitedListPath);

      expect(response.status).toBe(200);
      expect(response.body.sucess).not.toBe(true);
      expect(response.body.data).not.toBe([]);
      expect(response.body.data.length).toBe(19);
    });

    test("should get status a wider range of customers when radius is incremented", async () => {
      const response = await request(app).get(`${getInvitedListPath}?radius=250`);

      expect(response.status).toBe(200);
      expect(response.body.sucess).not.toBe(true);
      expect(response.body.data).not.toBe([]);
      expect(response.body.data.length).toBe(144);
    });

    test("should return an error when file cannot be readed", () => {
      // TODO: Spy on or mock fs library
    });
  });
});