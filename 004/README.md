# **Difencias entre BuildSchema y GraphQLSchema**

BuildSchema ( que es un SDL , schema definition language ) , el tiempo al usar buildschema es mayor ya que
el paso adicional es convertirlo a GraphQLSchema , pero una de las ventajas es que con BuildSchema podemos usar
el lenguaje propio de GraphQL para definir los tipos, mutaciones, etc . Aquí es donde viene el problema y es los providers ya que dentro del lenguaje no tenemos como decirle como se comportará en forma de js (promesas y demas 
cosas que tiene js ), en cambio en GraphQLSchema si podemos agregarle una funcion con esas propiedades .
Y en el caso que se quiera tener un provider en forma de funcion de js dentro de BuildSchema este se tendrá que colocar de forma de argumento a la función graphql

Todas estas diferencias de cual es el mejor se solucionará con Apollo Graphql

```js
    // con BuildSchema
    // b_schema  : schema
    // b_root : provider del schema
    graphql(b_schema,'{hello}',b_root).then(response=>console.log(response))
```

## **Referencias**

[Difencias entre BuildSchema y GraphQLSchema](https://stackoverflow.com/questions/53984094/notable-differences-between-buildschema-and-graphqlschema)
