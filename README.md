## Simple Node.js RestAPIs Server
## About The Project

This is a sample employee management system. Where you can add an employee, update his profile picture and get all the employees or all employees under the given position in the organogram.

### Module/ Dependencies list
* bcryptjs
* cluster
* cors
* express
* express-status-monitor
* jsonwebtoken
* multer
* mysql2
* sequelize
* winston

### Support of following features
* Signup
* Signin
* Update user profile picture
* Get organogram list
* Get all employee
* Get all the employee information under any given position in the organogram
* Password hashing
* Token base authentication
* Logging & monitoring
* Cloning strategy on a single server

### Prerequisite
* NodeJS
* MySQL Database

## Getting Started
### Easy installation in 3 steps
* Clone the repository
* Update the ./config/db.js
* Install NPM packages
  ```sh
  npm install
  ```

### To Run

You can run this app in two way. 
If you want to run this app in a single core, then run-
 ```sh
 node server.js
 ```
And if you want to scale up this app as much as possible in your matchine, then run -
```sh
node cluster.js
```
The server will start on http://localhost:3000

<b>NB:</b> After successfully run, please comment line number 22-25 in server.js

### API Doc
* Get position list<br>
    URL: http://localhost:3000/api/get/position<br>
    TYPE: GET
* Signup<br>
    URL: http://localhost:3000/api/auth/signup<br>
    TYPE: POST<br>
    DATA: {<br>
            "full_name": "Give your name",<br>
            "email": "user@email.address",<br>
            "password": "password",<br>
            "position": "Programmer"<br>
          }
* Signin<br>
    URL: http://localhost:3000/api/auth/signin<br>
    TYPE: POST<br>
    DATA: {<br>
            "email": "user@email.address",<br>
            "password": "password"<br>
          }
* Get all employee<br>
    URL: http://localhost:3000/api/get/all/employee<br>
    Authorization: Bearer Token<br>
    TYPE: GET
* Get all employee under any given position<br>
    URL: http://localhost:3000/api/get/employee_by_position?position_name=Programmer<br>
    Authorization: Bearer Token<br>
    TYPE: GET
* Get all employee under any given position<br>
    URL: http://localhost:3000/api/patch/user_img<br>
    Authorization: Bearer Token<br>
    TYPE: PATCH<br>
    FORM-DATA: {<br>
                "avatar": "user.img"<br>
               }
    
## Scalability strategy
The workload is the most popular reason we scale our applications, but it’s not the only one. We also scale our applications to increase their availability and tolerance to failure.

There are mainly three different things we can do to scale an application:
1. Cloning<br>
    The easiest thing to do to scale a big application is to clone it multiple times and have each cloned instance handle part of the workload (with a load balancer, for example). This does not cost a lot in terms of development time and it’s highly effective. This strategy is the minimum you should do and Node has the built-in module, named cluster, to make it easier for us to implement the cloning strategy on a single server.
2. Decomposing<br>
    We can also scale an application by decomposing it based on functionalities and services. This means having multiple applications with different code bases and sometimes with their own dedicated databases and User Interfaces.<br>

    This strategy is commonly associated with the term Microservice, where micro indicates that those services should be as small as possible, but in reality, the size of the service is not what’s important but rather the enforcement of loose coupling and high cohesion between services. The implementation of this strategy is often not easy and could result in long-term unexpected problems, but when done right the advantages are great.<br>
3. Splitting<br>
    We can also split the application into multiple instances where each instance is responsible for only a part of the application’s data. This strategy is often named horizontal partitioning, or sharding, in databases. Data partitioning requires a lookup step before each operation to determine which instance of the application to use. For example, maybe we want to partition our users based on their country or language. We need to do a lookup of that information first.<br><br><br>

Successfully scaling a big application should eventually implement all three strategies. Node makes it easy to do so but I am going to focus on the cloning strategy in this application and explore the built-in tools available in Node to implement it.<br>
### The Cluster Module
The cluster module can be used to enable load balancing over an environment’s multiple CPU cores. It’s based on the child process module fork method and it basically allows us to fork the main application process as many times as we have CPU cores. It will then take over and load balance all requests to the main process across all forked processes.<br>

The cluster module is Node’s helper for us to implement the cloning scalability strategy, but only on one machine. When we have a big machine with a lot of resources or when it’s easier and cheaper to add more resources to one machine rather than adding new machines, the cluster module is a great option for a really quick implementation of the cloning strategy.

### Load Balancing Result
I'm also attaching two result of my app, where I tested 4 API request with 10 vertual user. Here is the details of the test-
* Load testing script
Script is available in ./k6 script folder
* Single thread
https://app.k6.io/runs/public/45de30f439894665abfd3b6c1d2dd4b4
![alt text](https://github.com/mahfuzak08/nodeapi/blob/master/single.png,"Single")
* Multi thread
https://app.k6.io/runs/public/844636a422424ea99452a1dc844b63f9
![alt text](https://raw.githubusercontent.com/mahfuzak08/nodeapi/master/multi.png, "Multi")
