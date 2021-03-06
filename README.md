# aptly-web-ui
Simple web UI for aptly with no backend that connect directly to aptly.

It provides access to the following functions :
- Upload new packages and add to repos
- Migrate packages from one repo to another
- Show packages list
- Show a package's available versions, description, etc...
- Remove a package or copy to another repository.

It's under active development and any requests are welcomed.

## Look and feel

![web-ui home page](https://cloud.githubusercontent.com/assets/445200/20797691/33077d76-b7dc-11e6-8cdf-7f818c4eff70.png)

It should be mobile friendly but it's not the main concern right now so it must have some rough edges.

## Installation

Decompress the dist [archive](https://github.com/sdumetz/aptly-web-ui/releases/latest) in aptly root folder (default to ~/.aptly/public). It should look like this :

    ~/.aptly/public
      - dists
      - pool
      - ui

Older releases are available on [github](https://github.com/sdumetz/aptly-web-ui/releases).

Latest commits on `master` branch should always be "usable". You can clone the repository and build it using nodejs (*>=6.0.0*):

```
git clone git@github.com:sdumetz/aptly-web-ui.git
npm install
./deploy.sh
```
then extract `aptly-web-ui.tar.gz` to `~/.aptly/public`. All `deploy.sh` do is running `npm run build` and packaging the files.

### Configuration using nginx

Nginx config to serve apt repo + interface :
```
server {
  listen   80;
  root /var/aptly/.aptly/public;
  index index.html index.htm;

  access_log /var/log/nginx/packages.access.log  log_access;
  error_log /var/log/nginx/packages.error.log error;

  server_name my-domain.net;
  autoindex off;
  location / {
    try_files $uri $uri/;

    allow 192.168.1.0/24;
    deny all;
  }
  location /ui/ {
    try_files $uri $uri/ /ui/index.html;
    autoindex off;
  }
  location /dist/ {
    autoindex on;
  }
  location /pool/ {
    autoindex on;
  }
  location /api/ {
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $remote_addr;
    proxy_set_header Host $host;
    proxy_pass http://127.0.0.1:8080;
  }

}
```

Activate it and navigate to `your-domain.net/ui/`.

### Configuration using nodejs

You can use a nodejs service as a proxy between your frontend and aptly's API.

It's done setting some environment variables :

```
    export APTLY_WEB_UI_PROXY_API_URL=http://localhost:8080 #your aptly install
    export APTLY_WEB_UI_PORT=8081  #web ui port
    npm start
```

You can create a systemd service unit using `Environment=APTLY_WEB_UI_PROXY_API_URL=http://localhost:8080`.

The only facility provided by the proxy at the moment is [http basic auth](https://github.com/sdumetz/aptly-web-ui/commit/3a20f4fdde47edbf4cb57889f4b8c89b23b39440).

## Security

This solution is compatible with external auth methods like [oauth_proxy](https://github.com/bitly/oauth2_proxy). There is currently no read-only interface to serve to unauthorized users.

## Contribute

This is developped using React and React-router.

Currently very few routes are implemented. snapshot management would be nice but require some work to be done.


### BUGS

- Will always fetch packages list even if we go straight to a package's URL. (Maybe not a problem : Need to check load on aptly to generate large packages lists).


Original Author : [Sebastien DUMETZ](https://sdumetz.github.io).
