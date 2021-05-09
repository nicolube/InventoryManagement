import Waterline from 'waterline'
const sailsDiskAdapter = require('sails-disk')
import * as fs from 'fs';
import userCollection from './models/user_model'
import session_keyCollection from './models/session_key_model'
import itemCollection from './models/item_model';
import sellerCollection from './models/seller_model';
import orderNoCollection from './models/order_no_model';

var waterline = new Waterline()

/*
var d={
  a: "asdf"
}

fs.writeFileSync("test.json", JSON.stringify(d))

JSON.parse(fs.readFileSync("test.json", "utf8"))
*/
var config = {
  adapters: {
    'disk': sailsDiskAdapter
  },

  datastores: {
    default: {
      adapter: 'disk'
    }
  }
};

waterline.registerModel(userCollection);
waterline.registerModel(session_keyCollection);
waterline.registerModel(itemCollection);
waterline.registerModel(sellerCollection);
waterline.registerModel(orderNoCollection);
export var models: any = null

export const initDB = async () => {
  await waterline.initialize(config, (err, ontology) => {
    if (err) {
      console.error(err);
      return;
    }
    models = ontology.collections
    console.log("DB init complete")
  });
}