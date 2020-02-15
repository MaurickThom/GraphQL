# **GraphQL**

## **¿Qué es?**

Es un lenguaje de consultas que permite saber como entregar y recibir datos de un servicio REST.

Esta tecnología que engloba dos elementos principales :

- El lenguaje de consulta para consumir servicios REST
- Es un conjunto de tecnologias que permiten la implementación de un servicio web que responda precisamente a las mismas consultas de GraphQL

![GraphQL](https://devopedia.org/images/article/147/8496.1558526064.jpg)

> La idea con GraphQL es que el cliente, ya sea una aplicación Web, móvil o
> cualquier otro que quiera acceder a nuestros datos, pueda acceder a los
> datos que realmente necesita usar, para tener consultas más optimas al
> servidor. Esto se diferencia mucho del modelo Rest donde los recursos a los
> que voy acceder están definidos por los endpoints que estoy consultando.

*Fuente [*EDTeam*](https://ed.team/blog/introduccion-graphql)*

Una gran ventaja de GraphQL es que no estamos amarrados a lo que el backend nos da al hacer
el request a un endpoint , ya que un cliente al no querer obtener toda la data solo le *`dice`*
mediante el query de graphql que datos quiere obtener.

![GraphQL 1](https://miro.medium.com/max/3132/1*hbheCx0tCzyFv9wGDGTVjA.png)

Al querer aprender mas sobre esta tecnología he encontrado muchos post y videos de personas comentando que graphql reemplazará a los servicios REST , y otro diciendo que cada uno tiene un objetivo diferente , y otros en la cual yo me siento identificado es que los dos se pueden complementar muy bien en todos los problemas donde tenga que ver el consumo de servicios REST.

## **Conclusiones**

**¿ Cuando usar GraphQL ?**
Si tenemos mas de un cliente (entiense a cliente como los tipos de dispositivos web,movil,servidores,etc)
Si tenemos muchos servicios (microservicios , distintas base de datos, muchos backend,etc)

**¿ Cuando no usar GraphQL ?**
API REST existente con cliente muy simple (ojo tambien se puede agregar una capa de graphql a este API REST)

## **Fuentes y/o Recursos**

- [GraphQL - 1](https://medium.com/@jmz12/que-es-graphql-bf835e55960)
- [GraphQL - 2](https://platzi.com/blog/introduccion-a-graphql/)
- [GraphQL - 3](https://ed.team/blog/introduccion-graphql)
- [See 12 factor app methodology](https://12factor.net/es/)
