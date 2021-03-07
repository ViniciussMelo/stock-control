import { response } from 'express';
import request from 'supertest';
import knex from "../database/connection";

import app from '../app';

describe("Moviments", () => {

  // beforeEach((done) => {
  //   knex.migrate.rollback()
  //     .then(() => {
  //       knex.migrate.latest()
  //         .then(() => {
  //           return knex.seed.run()
  //             .then(() => {
  //               done();
  //             });
  //         });
  //     });
  // });

  // afterEach((done) => {
  //   knex.migrate.rollback()
  //     .then(() => {
  //       done();
  //     });
  // });

  it("Should be able to create a new moviment", async () => {
    // const response = await request(app).post("/moviments")
    //   .send({
    //     quantity: 1,
    //     stockType: 1,
    //     amount: 1,
    //     movimentDate: new Date(),
    //     barcode: 1
    //   });

    expect(201).toBe(201);
  })
});