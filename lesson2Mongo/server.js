const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test', {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

const Cat = mongoose.model('Cat', {
  name: String
});

const kitty = new Cat({
  name: 'Morris'
});

async function work() {
  await kitty.save();
  console.log('meow');
  let kitties = await Cat.find();
  console.log(kitties);
}

work();