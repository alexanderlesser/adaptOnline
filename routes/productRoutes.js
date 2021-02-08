const { parse } = require("json2csv");
const fs = require("fs");
const getProducts = require("../middleware/getProducts");

module.exports = (app) => {
  app.get("/", (req, res) => {
    res.send(
      "PATHS: Visa alla producter: /api/products Ladda ner produkter till CSV fil: /api/products/download"
    );
  });
  app.get("/api/products/download", getProducts, (req, res) => {
    const fields = ["id", "name", "sku"]; // vilka fält som ska finnas i csv filen
    const opts = { fields }; // output fields
    try {
      console.log("Writing to file");
      const csv = parse(req.result, opts); // parsar result och opts
      res.send(csv);
      fs.writeFileSync("produkter.csv", csv); // skriver till csv fil
      console.log("DONE WITH FILEWRITER");
    } catch (err) {
      console.error(err);
    }
  });

  app.get("/api/products", getProducts, (req, res) => {
    console.log("Listing products");
    res.send(req.result);
  });
};
