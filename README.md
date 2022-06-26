# Stock control
>
> - This project was created according to the challenge [Tech challenge](https://github.com/luizstacio/tech-challenge) by [Luiz Estácio](https://github.com/luizstacio).
> - The intention  of the project is to demonstrate the knowledge regarding ReactJS || NodeJS || JavasScript, creating a simple control stock.

## Requirements

To run the program on your computer, the following configurations / installations are required:
> - **Node** with version equal or higher than 12.16.1 - [Node Donwload](https://nodejs.org/pt-br/download/)
> - **Npm** with version equal or higher than 6.7.0 - [Npm Download](https://www.npmjs.com/package/download) or **Yarn** with version equal or higher than 1.22.0 [Yarn Download](https://classic.yarnpkg.com/en/docs/install/)
> - **PostgreSQL** with version equal to 9.6 - [PostgreSQL Download](https://www.postgresql.org/download/)
> - **Git** with version equal or higher than 2.25.1 - [Git Donwload](https://git-scm.com/downloads)

## Installation
> Clone this project in your computer with the command:
> ```
> 	git clone https://github.com/ViniciussMelo/stock-control.git
> ```
> Enter in the project's server folder with your command prompt:
> ```
> 	cd stock_control/server
> ```
> In the server folder on your command prompt, type the following command
> ```
> 	yarn install
>
> 	or
>
> 	npm install
> ```
> Now enter in the project's web with your command prompt:
> ```
> 	cd ../web
> ```
> In the web folder on your command prompt, type the following command:
> ```
> 	yarn install
>
> 	or
>
> 	nmp install
> ```
> Now, you must ensure that the database server, in this case, the PostgreSQL is connected.
> 
> After starting the database server, you need to create a database for the project and a .env file like the .env.example file.
> Done the previous steps, you need to create the database structure, so this, access your projct's server folder with your command prompt:
> ```
> 	cd stock_control/server
> ```
> and run this command:
> ```
> 	yarn knex:run
> ```
> and last:
> ```
> 	yarn knex:seed
> ```
> Now the structure are created and your database was populated with the seeds.

## Run
>
> After configuration the project and waited for the development dependencies to be installed, it is necessary to start the back-end and front-end as follow: 
>
> Access the project's web folder with your command prompt:
> ```
> 	cd stock-control/web
> ```
> and run this command: 
> ```
> 	yarn start
> ```
> In another command promt, access in the project's server folder:
> ```
> 	cd stock_control/api
> ```
> Now, run this command:
> ```
> 	yarn start
> ```
> The application will be running in your navigator, if this not ocurred automaticaly, open your navigator on this adress: http://localhost:3000/

## Functionalities

> This project aims to be: 
>
> - Automate the stock controls;

## Links

> Plannig:
> - [Trello](https://trello.com/b/fe4aJkm2/stock-control)

## Author
> - **Vinicius Spada Melo** - Software Developer - [Github](https://github.com/ViniciussMelo)

## Preview

![image](https://user-images.githubusercontent.com/25934151/99867112-6932f200-2b95-11eb-8ce2-b7bf06262ad0.png)
