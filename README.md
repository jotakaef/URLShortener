# URL Shortener - [Francisco Vasconcelos](https://www.linkedin.com/in/francisco-vasconcelos-201b723/)

## Requiments

> We want you to build a simple URL Shortener. Essentially, a very simple webpage, that will receive a URL input, and will return a reduced version of it. This shortened URL will point back to the URL Shortner service. If user tries to load this shortened URL, it will have to redirect the user to its original long URL, previously registered. The Shortened URL should be available for 30 days.

## About the solution

For the solution, I've decided to create a backend using Spring Boot and a frontend with React and also I will use PostgreSQL as a database. 

I create a simple interface with a login page using JWT. The default user/password is admin/admin.

The user has an interface to create the shortened URL he also can see all his shortened URL on the webpage. When the user tries to use the Shortened URL he sees a redirection page that can both have a timer/redirection event or an error message (URL not found/expired).

## Pre-requisites

Install [Java JDK 8+](https://www.oracle.com/java/technologies/javase-jdk8-downloads.html), and add the environment variable JAVA_HOME.

Install the latest [Maven](https://maven.apache.org/download.cgi?Preferred=ftp://apache.cs.utah.edu/apache.org/). It is recommended to set your Maven/bin folder on your Path.

Clone this repository.

Install [PostgreSQL](https://www.postgresql.org/download/), **the password for the user postgres should be "123456"**, next go to your PostgreSQL installation folder/bin (or use your preferred SQL Client):

```
# Connect to the database
psql -Upostgres -W
# Enter the password "123456" and then create the new DB
CREATE DATABASE fvenuitiurl; 
```

## How to Build

```
# Go to the root folder of the project, and run the command:
mvn clean install
```

1. If Node/npm isn't installed on the machine, Maven will do the installation.
2. Then "npm install" will be fired on the */frontend* folder. It may take a while until it finishes.
3. The executable JAR file will be generated and then copied to :

```
[project root]\target\FranciscoVasconcelosVenuitiUrlShortener-1.0-SNAPSHOT.jar
```

## Running the Application
### Backend
```
# On the \target folder:
java -jar FranciscoVasconcelosVenuitiUrlShortener-1.0-SNAPSHOT.jar
```

* It will be created a new Schema/table on your database.

The application will be available in [http://localhost:8080](HTTP://localhost:8080).

### Frontend
```
# In the \frontend folder:
npm start
```

* It will start the React application on port 4200.

The application will be available in [http://localhost:4200](HTTP://localhost:4200). (default user is admin/admin)

## Using the application

You can use the interface [http://localhost:4200](HTTP://localhost:4200) to save and access your shortened URL's or call directly the server [http://localhost:8080/yourShortenedURL](HTTP://localhost:8080/[yourShortenedURL]) to get the JSON response from the API for an existing Shortened URL.

**Enjoy!**


## License
[Apache License v2](https://www.apache.org/licenses/LICENSE-2.0)