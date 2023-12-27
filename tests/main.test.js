import { expect, test } from "vitest";
import request from "supertest";
import { subtract, sum, server } from "../src/main";

test("it should return 5 when adding 2 + 3", () => {
  expect(sum(2, 3)).equal(5);
});

test("it should return 3 when subtracting 5 - 2", () => {
  expect(subtract(5, 2)).equal(3);
});

// test("it should check response of /me handler", async () => {
//   const res = await request(server).get("/me");
//   expect(res.statusCode).toBe(200);
//   expect(res.headers["content-type"]).toBe("application/json");
//   expect(res.body.data).toBe("response from me endpoint");
// });

// test("it should check response of /you handler", async () => {
//   const res = await request(server).get("/you");
//   expect(res.statusCode).toBe(200);
//   expect(res.headers["content-type"]).toBe("application/json");
//   expect(res.body.data).toBe("response from you");
// });
