# About this Repo


A microservicce based web application implementation to display the top 100 cryptocurrencies by Market Cap. 

This solution uses a docker-compose file to spin up the containers and facilitate networking among them.

</br>

<img src=".Diagram.png">

## Containers
</br>
</br>

### 1. Mongo
Stores the crypto listing. Data persistance can be configured by making use of volumes. However the container is not persisting any data in this setup.

</br>
</br>

### 2. node-coinmarketcap-mongo

Fetches the listing from coinmarketcap and pushes it to mongo db.
</br>
</br>

### 3. node-backend-ws-mongo

Fetches the data from the mongo instance and communicates to the frontend over ws.
</br>
</br>

### 4. angular-frontend + nginx

The frontend is exposed on port:8090 . nginx serves as the web server and also as a reverse proxy for the ws connection.
</br>
</br>



### 5. Mongo Express

For debugging purposes


</br>
</br>


## Usage
</br>

1. Create a file named .env in the repository and set the below environment variables

```bash
MONGO_INITDB_ROOT_USERNAME=root
MONGO_INITDB_ROOT_PASSWORD=example
ME_CONFIG_MONGODB_ADMINUSERNAME=root
ME_CONFIG_MONGODB_ADMINPASSWORD=example
ME_CONFIG_MONGODB_URL=mongodb://root:example@mongo:27017/
DB_USER=genericuser
DB_PASSWORD=somePassword
CMC_API_KEY=<your api key here>
MONGO_CONN=mongo:27017
DATA_REFRESH_INTERVAL_MS=300000
```

2. Run the below command

```bash
docker-compose up --build -d
```

3. The application will start on http://localhost:8090

</br>

## Known Issues and fixes
</br>

1. The node-backend-ws-mongo would sometimes run before the mongo collection is updated. In order to avoid this, if the backend encounters the collection to be empty, it exits the program. Docker automatically restarts the program and this gives the node-coinmarketcap-mongo service enough time to do it's first update.

2. The frontend has a lot of scope of improvement . Perhaps sorting and filtering on the columns. Can also use a better data grid library. The current frontend is minimal. 

3. Mongo comes with an out of the box solution to watch out for changes in a collection called change streams. This however works only on either replica set or sharded clusters. It'd be cool to do this with change streams but creating a sharded cluster would be bit of an overkill on a single node mongo instance.


4. The mongo container doesn't have any volume mounted which means that data is not persisted anywhere. This is a conscious choice made because of the nature of the data.