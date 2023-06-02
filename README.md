# OTribe backend


## Prerequisites

- [Docker](https://docs.docker.com/):  20.10.17
- [Docker-compose](https://docs.docker.com/compose/install/): 2.6.1
- [Direnv](https://direnv.net/): 2.32.1

## Getting started

1. Edit environment
    
    ```bash
    # .envrc.example
    export DOCKER_FILE=docker-compose.yml # file docker
    export DOCKER_REGISTRY_USER=<username> # docker credential
    export DOCKER_REGISTRY_PASSWORD=<password>
    export DOCKER_REGISTRY_URL=<registry-url>
    ```
    
2. Setup package and environment
    
    ```bash
    make bootstrap
    ```
    
3. Run 
    
    ```bash
    make dev_up
    ```
    
4. Down
    
    ```bash
    make down
    ```
    

## Database migration

1. Migrate scheme
    
    ```bash
    make dbmigrate-run
    ```
    
2. Create file migration
    
    ```bash
    make name=<name-migration> dbmigrate-create 
    ```
    
3. Rollback
    
    ```bash
    make dbmigrate-down
    ```
    

If you access to and found like …

```bash
// 20220830154559
// http://localhost:3000/health

{
  "status": "ok",
  "info": {
    "database": {
      "status": "up"
    }
  },
  "error": {
    
  },
  "details": {
    "database": {
      "status": "up"
    }
  }
}
```

... then congratulations. Server is ready to go ✨

## Documentation

1. Collab
    - [Link](https://collab.geekup.vn/books/th%E1%BA%A7n-n%C3%B4ng-10-pb)
2. Api spec
    - Swagger: `http(s)://<base_url>/documentation`
3. Development
    - [Link](./docs/development.md)
4. Setup UAT environment
    - TBD
5. Setup Production environment
    - TBD
6. Technical stack
    - [Link](./docs/technical-stack.md)
7. Folder structure
    - [Link](./docs/folder-structure.md)

## Database ui
- Adminer: http(s)://localhost:8080

## Mock tool
- Mockoon: http(s)://localhost:3001

## Build

1. Build:
    
    ```bash
    make build
    ```
    
    And you will see the generated file in `dist` that ready to be served
    
2. Build image:
    
    ```bash
    make name=<image-name> build-image 
    ```

## Reference

1. [*https://nestjs.com/*](https://nestjs.com/)
2. [*https://www.docker.com/*](https://www.docker.com/)
3. [*https://medium.com/mobilepeople/backend-for-frontend-pattern-why-you-need-to-know-it-46f94ce420b0*](https://medium.com/mobilepeople/backend-for-frontend-pattern-why-you-need-to-know-it-46f94ce420b0)
4. [*https://docs.microsoft.com/en-us/azure/architecture/patterns/backends-for-frontends*](https://docs.microsoft.com/en-us/azure/architecture/patterns/backends-for-frontends)
5. [*https://identityserver4.readthedocs.io/en/latest/*](https://identityserver4.readthedocs.io/en/latest/)
