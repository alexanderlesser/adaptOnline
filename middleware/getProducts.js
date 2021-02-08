const api = require("../API/api");

module.exports = (req, res, next) => {
  async function test() {
    let page = 1; // vilken sida som ska hämtas

    const products = [];
    do {
      try {
        console.log("Processing page ", page);

        const response = await api.get(`products?page=${page}`, {
          per_page: 100, // 100 products per page
        });

        response.data.forEach((product) => {
          const { id, sku, name } = product; // plockar ut id, sku och namn
          products.push({ id, sku, name }); // pushar in i nya arrayen för att spara alla produkter
        });
        page++; // inkrementera för att öka sidoantalet för varje itteration
      } catch (err) {
        console.log("something went wrong", err);
      }
    } while (page < 4); // do while page is less than 4

    req.result = products;
    console.log("Done processing");
    next();
  }

  test();
};
