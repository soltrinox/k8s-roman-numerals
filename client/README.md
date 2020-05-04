# React client 

This client is used as a consumer and an input for the other services

## Development 

In order to run the `Dockerfile.dev` you need to execute 

```bash
# For building image from a specific file 
docker build -f Dockerfile.dev . -t client:dev


#The -it parameter and the port is needed in order the development server of react to run
docker run -it -p 3000:3000 client:dev

```