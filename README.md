# Next.js Teslo Shop App

-   Descargar el proyecto

```
git clone git@github.com:cristianquaglio/teslo.git
```

-   Levantar la base de datos en Docker

```
docker-compose up -d
```

-   la URL de la base de datos es

```
mongodb://localhost:27017/teslodb
```

-   Configurar las variables de entorno

```
mv .env.template .env
```

-   Reconstruir los módulos de node y levantar Next

```
yarn
yarn dev
```

-   Llenar la base de datos con información de pruebas

```
    http://localhost:3000/api/seed
```

-   Ingresar a la app desde:

```
    http://localhost:3000
```
