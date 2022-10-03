# FSD Take home challenge


# **_This is a fullstack activity feed / news feed application built using Django(rest framework) and react/nextjs. which is responsive and robust._**

`<!-- To run backend server -->`

1. (change directory to backend): `cd activityFeedBackend`.
2. (create virtual environment) : `python -m venv env`.
3. (activate virtual environment) : `source env/bin/activate`
4. (install all dependencies) : `python -m pip install -r requirements.txt`.
5. (make migration ready) : `python manage.py makemigrations`.
6. (preform django migration) : `python manage.py migrate`.
7. (run backend server) : `python manage.py runserver`.

swagger-open-api : `http://localhost:8000/swagger/`
redoc : `http://localhost:8000/redoc/`



`<!-- To run Frontend web application -->`

1. (change directory to frontend): `cd activity_feed_frontend/`,
2. (install all requires packages): `yarn install`.
<!-- 3. (create environment variable) : `touch .env.local`.
4. (add backend api url in .env.local)  :  
        `NEXT_PUBLIC_API_URL = http://localhost:8000` -->
4. I pushed my .env.local file too . no need to create
3. (run frontend server) : `yarn dev`



`<!-- Running Backend Rest api with Docker -->`

0. (change directory to backend) - `cd activityFeedBackend`
1. (build docker image of django Backend) - `docker-compose build`
2. (Run Docker container) - `docker run -dp 8000:8000 activityfeedbackend:latest`





