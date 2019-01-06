import { Observable } from "tns-core-modules/data/observable";

import {
  CbliteXl,
  SelectResult,
  Meta,
  Expression,
  QueryBuilder,
  DataSource,
  Ordering
} from "nativescript-cblite-xl";

export class HelloWorldModel extends Observable {
  public message: string;
  private cbliteXl: CbliteXl;

  constructor() {
    super();


    this.message = "nativescript-couchbaselite-xl plugin test";
    this.cbliteXl = new CbliteXl("testdatabase");

    this.cbliteXl = new CbliteXl("mydatabase");

    const tour = {
      type: "tour",
      data: { begin: 100000, end: 200000, id: 3, nested: { attr: 5 } }
    };

    let id = this.cbliteXl.createDocument(tour);

    tour.data.id = 4;
    this.cbliteXl.createDocument(tour);
    console.log("ID ", id);

    tour.data.id = 5;
    this.cbliteXl.createDocument(tour);

    tour.data.id = 6;
    this.cbliteXl.createDocument(tour);

    tour.data.id = 7;
    this.cbliteXl.createDocument(tour);

    tour.data.id = 18;
    this.cbliteXl.createDocument(tour);

    tour.data.id = 19;
    this.cbliteXl.createDocument(tour);

    tour.data.id = 21;
    tour.data.nested.attr = 5;
    id = this.cbliteXl.createDocument(tour);

    this.cbliteXl.deleteDocument(id);

    const query = QueryBuilder.select([SelectResult.all()])
      .from(DataSource.database(this.cbliteXl.getDatabase()))
      .where(
        Expression.property("type")
          .equalTo(Expression.string("tour"))
          .and(Expression.property("data.id").lessThanOrEqualTo(Expression.intValue(17)))
          .and(
            Expression.property("data.nested.attr").equalTo(
              Expression.intValue(5)
            )
          )
      )
      .orderBy([Ordering.property("data.id").descending()])
      .limit(Expression.intValue(1));

    const results = this.cbliteXl.getAll(query);

    // You should have only one result that match the above query
    results.forEach((result) => {
      console.log('Result', result);
    });
  }
}
