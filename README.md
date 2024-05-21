### Routes:
- [x] Register a new User
- [x] Connect a User
- [x] View all User information
- [x] View all User tasks
- [x] View User information
- [x] Update User information
- [x] Delete User
- [x] View all the todos
- [x] View the todo
- [x] Create a todo
- [x] Update a todo
- [x] Delete a todo

---

## Install and Run the project
### Requirements
> - [NodeJS](https://nodejs.org/en/download/package-manager/)
> - [MySQL](https://dev.mysql.com/doc/mysql-installation-excerpt/5.7/en/) or [MariaDB](https://www.mariadbtutorial.com/getting-started/install-mariadb/)
> - [PhpMyAdmin](https://docs.phpmyadmin.net/en/latest/setup.html) (optional, if you want to view your database)

---

To use the EpyTodo, you need to install the dependencies and launch it locally on your PC.

*Clone the project:*
```
git clone git@github.com:noecrn/EpyTodo.git

cd EpyTodo
```

*Install all dependencies:*
```
npm install
```

*Run the database:*
```
cd phpMyAdmin-5.2.1-english

php -S localhost:8080 -t .
```

*Run the project:*
```
node index.js
```

---

## EpyTodo instructions routes

|Route              |Method|Protected|Description|
|:------------------|:-----|:--------|:----------|
|/register          |POST  |NO       |Register a new user|
|/login             |POST  |NO       |Connect a user|
|/user              |GET   |YES      |View all user information|
|/user/todos        |GET   |YES      |View all user tasks|
|/users/:id or :email|GET   |YES      |View user information|
|/users/:id          |PUT   |YES      |Update user information|
|/users/:id          |DELETE|YES      |Delete user|
|/todos              |GET   |YES      |View all the todo|
|/todos/:id          |GET   |YES      |View the todo|
|/todos              |POST  |YES      |Create a todo|
|/todos/:id          |PUT   |YES      |Update a todo|
|/todos/:id          |DELETE|YES      |Delete a todo|

- To access the protected routes, you need a token that can be retrieved via the ``/register`` and ``/login`` routes.<br>
