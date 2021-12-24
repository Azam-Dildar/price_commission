const chai = require("chai");
const chaiHttp = require("chai-http");
const { response } = require("express");
const server = require("./index");

chai.should();
chai.use(chaiHttp);
describe("Task API", () => {
  it("It should get all mobiles", (done) => {
    chai
      .request(server)
      .get("/api/price_comparison")
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});

describe("Task API by name", () => {
  it("It should get mobiles specific name", (done) => {
    const model = "Iphone x";
    chai
      .request(server)
      .get(`/api/price_comparison/model=${model}`)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});
