# Frontend Nginx

Servidor ```localhost``` escutando na porta ```80```

## WebServer Urls:

- ``` / ``` servindo arquivos htlm em /usr/share/nginx/html
- ``` /imgs ``` servindo imagens em /data/imgs
- ``` /css ``` servindo arquivos css em /data/css
- ``` /js ``` servindo arquivos javascript em /data/js
- ``` /api/``` proxy reverso para o serviço backend

# nginx.conf

Load balancer para o servidor backend

```backend:8090```