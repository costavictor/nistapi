'use strict';

const url = 'https://services.nvd.nist.gov/rest/json/cves/',
    https = require('https');

const options = {
    hostname: 'services.nvd.nist.gov',
    port: 443,
    path: '/rest/json/cves/1.0?keyword=',
    method: 'GET',
}

module.exports = {
    getbyname: function (name, page) {
        let chunks = [];
        let startIndex = page * 30;

        if(startIndex > 1)
            startIndex -= 1;

        options.path = '/rest/json/cves/1.0?keyword=' + name + "&resultsPerPage=30&page=" + page + "&startIndex=" + startIndex;


        return new Promise(function (resolve, reject) {
            const req = https.request(options, (res) => {
                res.on('data', (d) => {
                    chunks.push(d);
                })
                res.on('end', () => {
                    let buffer = Buffer.concat(chunks);

                    let json = JSON.parse(JSON.stringify(buffer.toString()));
                    
                    resolve(FormatJSON(JSON.parse(json), name));

                });
            });

            req.on('error', (error) => {
                console.log("Não foi possível conectar com a API do NIST")
                console.error("Erro: " + error)
            });

            req.end();
        });
    }
}


function FormatJSON(json, name) {
    let data = [{ timestamp: '', result: [], panel: name }];

    if(json.totalResults > 0){
        data[0].timestamp = json.result.CVE_data_timestamp

        json.result.CVE_Items.forEach(element => {
            try {
                data[0].result.push({
                    'references': element.cve.references,
                    'description': element.cve.description,
                    'configurations': element.configurations,
                    'impact': {
                        'attackComplexity': element.impact.baseMetricV3.cvssV3.attackComplexity,
                        'privilegesRequired': element.impact.baseMetricV3.cvssV3.privilegesRequired,
                        'userInteraction': element.impact.baseMetricV3.cvssV3.userInteraction,
                        'baseSeverity': element.impact.baseMetricV3.cvssV3.baseSeverity,
                        'baseScore': element.impact.baseMetricV3.cvssV3.baseScore,
                        'attackVector': element.impact.baseMetricV3.cvssV3.attackVector,
                        'scope': element.impact.baseMetricV3.cvssV3.scope,
                    }
                });
            }
            catch (e) {
                try {
                    let userinteraction = '',
                        baseScore = '';
    
                    if (element.impact.baseMetricV2.userInteractionRequired)
                        userinteraction = 'Necessário';
                    else
                        userinteraction = 'Não é necessário';
    
                    if (element.impact.baseMetricV2.cvssV2.baseScore != undefined)
                        baseScore = element.impact.baseMetricV2.cvssV2.baseScore;
                    else
                        baseScore = 'Não especificado';
    
    
                    data[0].result.push({
                        'references': element.cve.references,
                        'description': element.cve.description,
                        'configurations': element.configurations,
                        'impact': {
                            'attackComplexity': element.impact.baseMetricV2.severity,
                            'privilegesRequired': 'Não especificado',
                            'userInteraction': userinteraction,
                            'baseSeverity': element.impact.baseMetricV2.cvssV2.baseSeverity,
                            'baseScore': baseScore,
                            'attackVector': element.impact.baseMetricV2.cvssV2.accessVector,
                            'scope': 'Não especificado',
                        }
                    });
                }
                catch (e) {
                    data[0].result.push({
                        'references': element.cve.references,
                        'description': element.cve.description,
                        'configurations': element.configurations,
                    });
                }
            }
        });
        return data;
    }
    else{
        data[0].result = 0;
        return data;
    }
    
}