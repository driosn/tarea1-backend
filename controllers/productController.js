const fs = require("fs");

exports.getAllProducts = (req, res) => {
  const products = JSON.parse(
    fs.readFileSync(`${__dirname}/../data/products.json`)
  );

  res.status(200).json({
    status: "success",
    timeOfRequest: req.requestTime,
    results: products.length,
    data: {
      products,
    },
  });
};

exports.addProduct = (req, res) => {
  const products = JSON.parse(
    fs.readFileSync(`${__dirname}/../data/products.json`)
  );
  products.push(req.body);
  fs.writeFileSync(`${__dirname}/data/products.json`, JSON.stringify(products));

  res.status(200).json({
    status: "success",
    data: {
      products,
    },
  });
};

exports.getProductById = (req, res) => {
  const products = JSON.parse(
    fs.readFileSync(`${__dirname}/../data/products.json`)
  );

  const foundProduct = products.find((p) => foundProductid == req.params.id);
  if (foundProduct) {
    res.status(200).json({
      status: "success",
      data: {
        product: foundProduct,
      },
    });
  } else {
    res.status(404).json({
      status: "not found",
    });
  }
}

exports.update = (req, res) => {
  const products = JSON.parse(
    fs.readFileSync(`${__dirname}/../data/products.json`)
  );

  const foundProduct = products.find((p) => p.id == req.params.id)
  if (foundProduct) {
    let newName;
    let newPrice;
    let newCategory;
    newName = req.body.name != null && req.body.name != undefined ? req.body.name : foundProduct.name;
    newPrice = req.body.price != null && req.body.price != undefined ? req.body.price : foundProduct.price;
    newCategory = req.body.category != null && req.body.category != undefined ? req.body.price : foundProduct.category;

    let newProduct = {
      id: foundProduct.id,
      name: newName,
      price: newPrice,
      category: newCategory,
    };

    const index = products.findIndex((prod) => prod.id === foundProduct.id);
    if (index !== -1) {
      products[index] = newProduct;
    }
    fs.writeFileSync(`${__dirname}/../data/products.json`, JSON.stringify(products));
    res.status(200).json({
      status: "put success",
      data: {
        product: products[index],
      },
    });
  } else {
    res.status(404).json({
      status: "not found",
    });
  }
}

exports.delete = (req, res) => {
  let products = JSON.parse(
    fs.readFileSync(`${__dirname}/../data/products.json`)
  );

  let foundProduct = products.find((p) => p.id == req.params.id)
  if (foundProduct) {
    products = products.filter(function (value, index, arr) {
      return value.id !== foundProduct.id;
    });
    fs.writeFileSync(`${__dirname}/../data/products.json`, JSON.stringify(products));
    res.status(200).json({
      status: "delete success",
      data: {
        product: foundProduct,
      },
    });
  } else {
    res.status(404).json({
      status: "not found",
    });
  }
};
