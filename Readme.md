# About this Repo


A microservicce based web application implementation to display the top 100 cryptocurrencies by Market Cap. 

This solution uses a docker-compose file to spin up the containers and facilitate networking among them.

</br>

## Containers
</br>
</br>

### node-coinmarketcap-mongo

fetches the listing from coinmarketcap and pushes it to mongo db.
</br>
</br>
### node-backend-ws-mongo

fetches the data from the mongo instance and communicates to the frontend over ws.
</br>
</br>
### angular-frontend + nginx

The frontend is exposed on port:8090 . nginx serves as the web server and also as a reverse proxy for the ws connection.
</br>
</br>
### Mongo
Stores the crypto listing. Because of the nature of the data, data isn't persisted over restarts. This isn't ideal for Production systems ofcourse.

</br>
</br>

### Mongo Express

For debugging purposes


</br>
</br>


## Usage
</br>

1. Create a file named .env in the repository and set the below environment variables

```bash
MONGO_INITDB_ROOT_USERNAME="root"
MONGO_INITDB_ROOT_PASSWORD="example"
ME_CONFIG_MONGODB_ADMINUSERNAME="root"
ME_CONFIG_MONGODB_ADMINPASSWORD="example"
ME_CONFIG_MONGODB_URL="mongodb://root:example@mongo:27017/"
DB_USER="genericuser"
DB_PASSWORD="somePassword"
CMC_API_KEY=<your api key here>
MONGO_CONN="mongo:27017"
DATA_REFRESH_INTERVAL_MS="300000"
```

2. Run the below command

```bash
docker-compose up --build
```

3. The application will start on http://localhost:8090