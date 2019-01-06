import { Common } from "./cblite-xl.common";
export declare class CbliteXl extends Common {
  constructor(databaseName: string);
  createDocument(data: Object, documentId?: string): any;
  deleteDocument(documentId: string): void;
  getDatabase(): any;
  objectToMap(data: Object): any;
  mapToJson(data: Object): any;
  mapToObject(data: Object): any;
  getAll(query: any): any[];
}
export declare const SelectResult: any;
export declare const Meta: any;
export declare const Expression: any;
export declare const QueryBuilder: any;
export declare const DataSource: any;
export declare const Ordering: any;
export declare const Join: any;
