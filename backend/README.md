# Backend Node Express API 

Retorna dados da api do NIST NVD

[Documentação da api do nist] (https://csrc.nist.gov/CSRC/media/Projects/National-Vulnerability-Database/documents/web%20service%20documentation/Automation%20Support%20for%20CVE%20Retrieval.pdf)

# POST requests para /api/nist/search

```/api/``` sendo o proxy_reverso do nginx apontando para o serviço backend

## O corpo da mensagem aceita os seguintes parâmetros em json

- ```name```
- ```page```

Name sendo a palavra chave de procura 
Page sendo a página (30 resultados por página)

# JSON Response

Dependendo da resposta da API do nist 3 tipos de json serão retornados:

```json
{
    'references': element.cve.references,
    'description': element.cve.description,
    'configurations': element.configurations,
    'impact': 
    {
        'attackComplexity': element.impact.baseMetricV3.cvssV3.attackComplexity,
        'privilegesRequired': element.impact.baseMetricV3.cvssV3.privilegesRequired,
        'userInteraction': element.impact.baseMetricV3.cvssV3.userInteraction,
        'baseSeverity': element.impact.baseMetricV3.cvssV3.baseSeverity,
        'baseScore': element.impact.baseMetricV3.cvssV3.baseScore,
        'attackVector': element.impact.baseMetricV3.cvssV3.attackVector,
        'scope': element.impact.baseMetricV3.cvssV3.scope,
    }
```

```json
{
    'references': element.cve.references,
    'description': element.cve.description,
    'configurations': element.configurations,
    'impact': 
    {
        'attackComplexity': element.impact.baseMetricV2.severity,
        'privilegesRequired': 'Não especificado',
        'userInteraction': Necessario OU Não necessário,
        'baseSeverity': element.impact.baseMetricV2.cvssV2.baseSeverity,
        'baseScore': element.impact.baseMetricV2.cvssV2.baseScore OU Não especificado,
        'attackVector': element.impact.baseMetricV2.cvssV2.accessVector,
        'scope': 'Não especificado',
    }
}
```

```json
{
    'references': element.cve.references,
    'description': element.cve.description,
    'configurations': element.configurations,
}
```

# Estrutura das pastas e arquivos

```
backend
│    app.js
│    package.json
│    README.md
│
├───api
│   │   routes.config.js
│   │
│   └───controllers
│   │       search.js
│   │
└───requests
    │   request.js
       
```






