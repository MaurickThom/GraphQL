#

````sh
  >> npx nodemon
````

```javascript

 // GraphiQL

 //Query Variables

 {
   "id":"1"
 }

 // Input
  query{
    query($id:ID!){
      getCourseById(id:$id){
        id
        title
      }
      getAllCourses{
        views
        id
        title
      }
    }  
  }

  // Output
  {
    "data": {
      "getCourseById": {
        "id": "1",
        "title": "Curso de GraphQL"
      },
      "getAllCourses": [
        {
          "views": 1000,
          "id": "1",
          "title": "Curso de GraphQL"
        },
        {
          "views": 50000,
          "id": "2",
          "title": "Curso de JS"
        }
      ]
    }
  }
```
