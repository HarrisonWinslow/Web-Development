const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}));

// parse application/json
app.use(bodyParser.json());

let cart = [];
let products = [];
let id = 0;

app.post('/api/products', (req, res) => {
  id = id + 1;
  let item = {
    id: id.toString(),
    name: req.body.name,
    price: req.body.price
  };
  products.push(item);
  res.send(item);
});

app.get('/api/products', (req, res) => {
  res.send(products);
});

app.get('/api/products/:id', (req, res) => {
  let id = req.params.id;
  let productsMap = products.map(item => {
    return item.id;
  });
  let index = productsMap.indexOf(id);
  if (index === -1) {
    res.status(404)
      .send("Sorry, that item doesn't exist");
    return;
  }
  let item = products[index];
  res.send(item);
});

app.put('/api/products/:id', (req, res) => {
  let id = req.params.id;
  let itemsMap = products.map(item => {
    return item.id;
  });
  let index = itemsMap.indexOf(id);
  if (index === -1) {
    res.status(404)
      .send("Sorry, that item doesn't exist");
    return;
  }
  let item = products[index];
  item.name = req.body.name;
  item.price = req.body.price;
  res.send(item);
});

app.delete('/api/products/:id', (req, res) => {
  let id = req.params.id;
  let removeIndex = products.map(item => {
      return item.id;
    })
    .indexOf(id);
  if (removeIndex === -1) {
    res.status(404)
      .send("Sorry, that item doesn't exist");
    return;
  }
  products.splice(removeIndex, 1);
  res.sendStatus(200);
});



app.get('/api/cart', (req, res) => {
  res.send(cart);
});

app.post('/api/cart/:id', (req, res) => {
  id = req.params.id;
  let itemsMap = cart.map(item => {
    return item.id;
  });
  let index = itemsMap.indexOf(id);
  if (index === -1) {
    let item = {
      id: id,
      quantity: 1
    }
    cart.push(item);
    res.send(item);
  }
  else {
    let item = cart[index];
    item.quantity = item.quantity + 1;
    res.send(item);
  }
});

app.put('/api/cart/:id/:quantity', (req, res) => {
  let id = req.params.id;
  let itemsMap = cart.map(item => {
    return item.id;
  });
  let index = itemsMap.indexOf(id);
  if (index === -1) {
    res.status(404)
      .send("Sorry, that item doesn't exist");
    return;
  }
  let item = cart[index];
  item.quantity = req.params.quantity;
  if(parseInt(item.quantity) === 0){
    cart.splice(index, 1);
  }
  res.send(item);
});

app.delete('/api/cart/:id', (req, res) => {
  let id = req.params.id;
  let removeIndex = cart.map(item => {
      return item.id;
    })
    .indexOf(id);
  if (removeIndex === -1) {
    res.status(404)
      .send("Sorry, that item doesn't exist");
    return;
  }
  cart.splice(removeIndex, 1);
  res.sendStatus(200);
});



app.listen(3000, () => console.log('Server listening on port 3000!'));