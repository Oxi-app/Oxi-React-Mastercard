// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Products, Points, Item, Fuel, Electricity, Transport, RawMaterials, Processes, Logistics, Basket, Materials } = initSchema(schema);

export {
  Products,
  Points,
  Item,
  Fuel,
  Electricity,
  Transport,
  RawMaterials,
  Processes,
  Logistics,
  Basket,
  Materials
};