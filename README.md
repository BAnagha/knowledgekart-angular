# KnowledgeKart Assignment

Ecommerce application

*Angular application can be packaged together with Spring boot to run as a single unit. However, some html/js dependencies are not loading when the application is run, causing separate start up for both the applications.*


## Running Spring Boot Backend Application
### System Requirements

* Needs Java 11 or above
* Needs Maven


### Start the application

If both Java and Maven are present, run the below commands.

```bash
mvn clean install 
```

```bash
mvn spring-boot:run
```
The application is deployed to AWS EBS.

## Running the Angular Application
### System Requirements

* Requires Node.js - v18.11.0
* This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.8.


### Start the application

If node is installed, run below command from path knowledgekart/src/main/frontend.
 
```bash
npm install
```

```bash
npm start
```

The application is currently pointing to AWS EBS backend instance.

Application can be accessed at http://knowledgekartbackend-env.eba-dun3bitw.us-east-2.elasticbeanstalk.com/knowledgekart/swagger-ui/index.html

H2 Console can be accessed at http://knowledgekartbackend-env.eba-dun3bitw.us-east-2.elasticbeanstalk.com/knowledgekart/h2-console

Credential to login to database:
username: dbadmin
passwordl: password
datasource url: jdbc:h2:mem:knowledgekart


Seed data is already available on the instance from the testing.

### Login details:
 1. username ~ password
 2. auror ~ moody - ADMIN
 3. snape ~ severus
 4. azkaban ~ sirius

