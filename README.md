# Mombasa Ambassador

A crawler for [Mombasa!](https://github.com/emilews/mombasa).

## How to use
### **Note: you must be running Mongo before running the Mombasa Ambassador. 
### Manual without building:
Clone this repo and:
```
yarn install
```
Then:
```
node index.js
```
If on linux you can use something like [screen](https://www.gnu.org/software/screen/manual/screen.html) to run it in 
the background.

### Docker image:
You can do it yourself in the root of the repo with:
```
docker build -t mombasa-ambassador .
```
and run with:
```
docker run -d mombasa-ambassador
```
### DockerHub image:
Pull the image:
```
docker pull emilews/mombasa-ambassador
```
and run it in detached mode:
```
docker run -d emilews/mombasa-ambassador
```
## Donations

bitcoincash:qzd2qfp82ppxegg425f3masa5m0qq8mmaqt05h8q8r 