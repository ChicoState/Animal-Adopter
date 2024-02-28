# Animal-Adopter

## Steps to run the project

* Make sure your in the directory with the docker-compose.yaml file and that docker desktop is running.

* Run the command:
  # **docker compose build**

* This will generate the docker images.

* Next run the command:
  # **docker compose up**

* This will start up the container allowing you to go to the webpage on your browser.

* Type this into your browser to access the webpage:
  # **localhost:3000**

* To access the Django admin page, you need to create a user first.
* In order to do this stop the docker container and type this command in:
  # **docker compose run api python manage.py createsuperuser**

* It will prompt you to type in a username, email, and password.

* After you do that rerun the docker container using:
  # **docker compose up**

* Now you can access the Django admin page by typing this into your browser:
  # **127.0.0.1:8000/admin**
