This repo is part of a blog post series "[Authorization in microservices with Open Policy Agent, NodeJs, and ReactJs](https://pongzt.com/post/opa-intro/)"

## How to run

### OPA install via homebrew
```bash
brew install opa
```
### Build bundle-server
```bash
bundle-server/build.sh
```
### Run bundle-server
```bash
bundle-server/bundleServer.sh
```
### Run opa api server
```bash
api-server/apiServer.sh
```
### Run nodejs server
```bash
cd opa-nodejs \
&& npm i \
&& npm run dev
```