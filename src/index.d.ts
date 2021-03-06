import { Common } from './cblite-xl.common';
export declare class CbliteXl extends Common {
  private database;
  constructor(databaseName: string);
  createDocument(data: Object, documentId?: string): any;
  deleteDocument(documentId: string): void;
  getDatabase(): any;
  objectToMap(data: Object): any;
  mapToJson(data: Object): any;
  mapToObject(data: Object): any;
  getAll(query: any): any[];
  updateDocument(documentId: any, data: any): void;
  getDocument(documentId: any): any;
  private showErroMessage(message, exception);
}
export declare const SelectResult: any;
export declare const Meta: any;
export declare const Expression: any;
export declare const QueryBuilder: any;
export declare const DataSource: any;
export declare const Ordering: any;
export declare const Join: any;
