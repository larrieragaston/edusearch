# To run the react app, first change in package.jon the homepage variable to "/"

build:
    docker build . -t edusearch-web

run:
    docker run --name edusearch-web -p 3000:5000 -d edusearch-web

# Running with docker-compose

# build&run:
#     docker-compose up --build

# run:
#     docker-compose up