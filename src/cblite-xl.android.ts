import { Common } from './cblite-xl.common';
import * as application from "tns-core-modules/application";
import * as  utils from "tns-core-modules/utils/utils";

declare var com: any;
declare var java: any;
declare var android: any;


export class CbliteXl extends Common {

  private database: any;

  public constructor(databaseName: string) {
    super();

    const context = utils.ad.getApplicationContext();
    const config = new com.couchbase.lite.DatabaseConfiguration(context);

    try {
      this.database = new com.couchbase.lite.Database(databaseName, config);
    } catch (exception) {
      throw new Error(this.showErroMessage("Database creation error.", exception));
    }
  }

  public createDocument(data: Object, documentId?: string) {

    const mutableDocument = new com.couchbase.lite.MutableDocument(documentId);
    mutableDocument.setData(this.objectToMap(data));

    try {
      this.database.save(mutableDocument);
    } catch (exception) {
      throw new Error(this.showErroMessage("Document creation.", exception));
    }

    return mutableDocument.getId();
  }


  public deleteDocument(documentId: string) {

    const document: any = this.database.getDocument(documentId).toMutable();

    try {
      this.database.delete(document);
    }
    catch(exception) {
      throw new Error(this.showErroMessage("Document deletion with id " + documentId + ".", exception));
    }
  }

  public getDatabase() {
    return this.database;
  }

  public objectToMap(data: Object) {
    const gson = (new com.google.gson.GsonBuilder()).create();
    return gson.fromJson(JSON.stringify(data), (new java.util.HashMap).getClass());
  }

  public mapToJson(data: Object) {
    const gson = new com.google.gson.GsonBuilder().create();
    return gson.toJson(data);
  }

  public mapToObject(data: Object) {
    const gson = new com.google.gson.GsonBuilder().create();
    return JSON.parse(gson.toJson(data));
  }

  public getAll(query: any) {

    const ret = [];
    let allResults;

    try {
        allResults = query.execute().allResults();
    }
    catch (exception) {
      new Error(this.showErroMessage("Cannot execute query.", exception));
    }

    try {
       const size = allResults.size();

      for (let i = 0; i < size; i++) {
        ret.push(this.mapToObject(allResults.get(i).toMap()));
      }

      return ret;
    }
    catch (exception) {
       throw new Error(this.showErroMessage("Cannot fetch query results.", exception));
    }
  }

  public updateDocument(documentId, data) {

    const mutableDocument = new com.couchbase.lite.MutableDocument(documentId);
    mutableDocument.setData(this.objectToMap(data));

    try {
      this.database.save(mutableDocument);
    } catch (exception) {
      throw new Error(
        this.showErroMessage("Document update.", exception)
      );
    }
  }

  public getDocument(documentId) {
    try {
      const document: any = this.database.getDocument(documentId);
      return this.mapToObject(document.toMap());
    } catch (exception) {
      throw new Error(
        this.showErroMessage("Document fetch (" + documentId + ").", exception)
      );
    }
  }

  private showErroMessage(message, exception) {
    return "CbliteXl error: " + message + "\n" + exception.message;
  }

}

export const SelectResult = com.couchbase.lite.SelectResult;
export const Meta = com.couchbase.lite.Meta;
export const Expression = com.couchbase.lite.Expression;
export const QueryBuilder = com.couchbase.lite.QueryBuilder;
export const DataSource = com.couchbase.lite.DataSource;
export const Ordering = com.couchbase.lite.Ordering;
export const Join = com.couchbase.lite.Join;

