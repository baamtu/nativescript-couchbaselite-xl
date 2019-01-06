# Description
CbLiteXl is a plugin that allows access to the [couchbaselite](https://docs.couchbase.com/couchbase-lite/2.1/index.html)
Currently, the plugin is only available for android. However, we plan to implement the IOS version.


# Installation
To install the plugin you can do the following steps:
  * Go to your plugin's src directory. For instance
     ```
	cd nativescript-cblite-xl/src
     ```
  * Installe npm packages like this 
   ```
	npm install
   ```
  * Go to your plugin's publish directory. For instance 
    ```
      cd nativescript-cblite-xl/publish
     ```
  * Enter the following command

    ```
       ./pack.sh
    ```
  * Go to your nativescript project's root
  * Enter the following command:
    ```
      tns plugin add PATH_TO_YOUR_PLUGIN/publish/package/nativescript-cblite-xl-1.0.0.tgz
    ```
  * You should now be able to use your plugin after running ```tns run android ```



# How to use

Below some examples of how to use this plugin

## Import
To use the plugin in your code, you can import it like this:
```
import { CbliteXl } from "nativescript-cblite-xl";
```
In order to use all options allowed by this plugin, you can import all you need like this:

```
import {
  CbliteXl,
  SelectResult,
  Meta,
  Expression,
  QueryBuilder,
  DataSource,
  Ordering
} from "nativescript-cblite-xl";

```

##  Instanciation and database creation
You can instanciate the library and create database like that:
```
this.cbliteXl = new CbliteXl("testdatabase");
```

## Document creation

```
    let tour = {
      type: "tour",
      data: { begin: 100000, end: 200000, id: 3, nested: { attr: 5 } }
    };

    let documentId = this.cbliteXl.createDocument(tour);
    console.log("This is your documentId", documentId);	
```

## Document deletion

```
this.cbliteXl.deleteDocument(id);
```

## Querying
```
    let query = QueryBuilder.select([SelectResult.all()])
      .from(DataSource.database(this.cbliteXl.getDatabase()))
      .where(
        Expression.property("type")
          .equalTo(Expression.string("tour"))
          .and(Expression.property("data.id").lessThanOrEqualTo(Expression.intValue(18)))
          .and(
            Expression.property("data.nested.attr").equalTo(
              Expression.intValue(24)
            )
          )
      )
      .orderBy([Ordering.property("data.id").descending()])
      .limit(Expression.intValue(1));
      
      const results = this.cbliteXl.getAll(query);

      results.forEach((result) => {
        console.log('Result', result);
      });
```

## Going further
For more information about how to use couchbase-lite-android using this plugin:
you can read the documenation of the couchbase-lite-android lib here:
https://docs.couchbase.com/couchbase-lite/2.1/java.html#getting-started

