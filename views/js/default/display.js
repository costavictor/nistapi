function CardSection(title, content) {
    return '<h3 class="h5 card-title mt-3">' + title + '</h3>' + content;
}


function ParagraphCard(text, cssclass) {
    let css = '';

    if (cssclass != undefined)
        css = cssclass;

    return '<p class="card-text ' + css + ' ">' + text + '</p>';
}

function BreadCrumb(text) {
    return '<div class="breadcrumb">' + text + '</div>'
}

function CardBody(body) {
    return '<div class="row">' +
        '<div class="col-12">' +
        '<div class="card bg-primary border-light shadow-soft">' +
        '<div class="card-body">' +
        body +
        '</div>' +
        '</div>' +
        '</div>';
}


function Display(res) {
    if(res.data.length > 0){
        let timestamp = new Date(res.timestamp).toLocaleDateString('pt-BR');
        let date = timestamp.split('-');
        
        if(date != 'Invalid Date'){
            let displaydate = BreadCrumb("Data: " + date + ' Hora: ' + new Date(res.timestamp).toLocaleTimeString('pt-BR'));
            $(".panel-" + res.panel).append(displaydate);
        }
    
    
        $.each(res.data, function (j, d) {
            let body = '';
            let descriptiontext = '';
            $.each(d.description.description_data, function (k, descrip) {
                descriptiontext += ParagraphCard(descrip.value);
            });
    
            let impact = '';
    
            if (d.hasOwnProperty('impact')){
                impact = BreadCrumb(ParagraphCard("Complexidade do atack: " + d.impact.attackComplexity, "breadcrumb-item")) + 
                BreadCrumb(ParagraphCard("Vetor do atack: " + d.impact.attackVector, "breadcrumb-item")) +
                BreadCrumb(ParagraphCard("Pontuação base: " + d.impact.baseScore, "breadcrumb-item")) +
                BreadCrumb(ParagraphCard("Gravidade: " + d.impact.baseSeverity, "breadcrumb-item")) +
                BreadCrumb(ParagraphCard("Privilégios necessários: " + d.impact.privilegesRequired, "breadcrumb-item")) +
                BreadCrumb(ParagraphCard("Scope: " + d.impact.scope, "breadcrumb-item")) +
                BreadCrumb(ParagraphCard("Interação do usuário: " + d.impact.userInteraction, "breadcrumb-item"));
            }
                
            let references = '';
    
            $.each(d.references.reference_data, function (h, ref) {
                let tags = [];
                $.each(ref.tags, function (l, tag) {
                    tags.push(tag);
                })
                if (tags.length > 0)
                    references += BreadCrumb(ParagraphCard("URL: <a href='" + ref.url + "'>" + ref.url + "</a>", "breadcrumb-item") + ParagraphCard("Ref Source: " + ref.refsource, "breadcrumb-item") + ParagraphCard("Tags: " + tags.join(','), "breadcrumb-item"));
                else
                    references += BreadCrumb(ParagraphCard("URL: <a href='" + ref.url + "'>" + ref.url + "</a>", "breadcrumb-item" + ParagraphCard("Ref Source: " + ref.refsource, "breadcrumb-item")));
            });
    
            body += CardSection('Descrição', descriptiontext);    
            body += CardSection('Referências', references);
            if(impact != '')
                body += CardSection('Impacto', impact);
    
            $(".panel-" + res.panel).append(CardBody(body));
        });
        let btn = '<div>' +
                    '<button id="moreBtn" class="btn btn-large btn-block">' +
                        '<span class="mr-1"><span class="fas fa-plus"></span></span>' +
                        'Ver mais' +
                    '</button>' +
                  '</div>';
    
        $(".panel-" + res.panel).append(btn);
    }
    else{
        let element = CardBody(BreadCrumb('Nenhum resultado encontrado'));
        $(".panel-" + res.panel).append(element);
    }

    try{
        res.data = [];
    }
    catch(e){}
    
}

function CreateAccordion(name){
    let index = panels.length;

    let element = '<div class="accordion shadow-soft rounded" id="SearchAccordion">' + 
                    '<div class="card card-sm card-body bg-primary border-light">' +
                        '<a href="#panel-' + index + '" data-target="#panel-' + index + '" class="accordion-panel-header" data-toggle="collapse"' +
                            'role="button" aria-expanded="false" aria-controls="panel-' + index + '">' +
                            '<span class="h6 mb-0 font-weight-bold">' + name + '</span>' +
                            '<span class="icon"><span class="fas fa-plus"></span></span>' +
                        '</a>' +
                        '<!-- panel -->' +
                        '<div class="collapse panel-' + name + '" id="panel-' + index + '">' +
                      '</div>' +
                    '</div>' + 
                  '</div>';

    $(".search-div").append(element);
}