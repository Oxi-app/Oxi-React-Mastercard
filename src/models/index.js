// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Points, ExampleItem, Fuel, Electricity, Transport, RawMaterials, Processes, Logistics, Basket, Materials, Item } = initSchema(schema);

export {
  Points,
  ExampleItem,
  Fuel,
  Electricity,
  Transport,
  RawMaterials,
  Processes,
  Logistics,
  Basket,
  Materials,
  Item
};