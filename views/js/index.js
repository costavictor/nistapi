let panels = ['FortiGate', 'FortiManager', 'FortiAnalyzer'];
let result = [];

$(document).ready(function(){
    StartLoading();
    ResultInit();
    GetData('fortigate');
});

function DataSuccess(data){
    Format(data[0]);

    Display();

    FinishLoading();
}

function Format(data){
    $.each(data.result, function(index, d){
        let skip = true;
        let type = '';
        $.each(d.description.description_data, function(i, descrip){
            $.each(panels, function(p, panel){
                if(descrip.value.includes(panel)){
                    skip = false;
                    type = panel;    
                }
            });
        });

        if(!skip){
            $.each(result, function(j, r){
                if(r.panel == type) 
                    result[j].data.push(d);
            });
        }

    });
    console.log(result);
}

function Display(){
    $.each(result, function(i, r){
        $.each(r.data, function(j, d){
            let body = '';
            let descriptiontext = '';
            $.each(d.description.description_data, function(k, descrip){
                descriptiontext += ParagraphCard(descrip.value);
            });

            let impact = BreadCrumb(ParagraphCard("Complexidade do atack: " + d.impact.attackComplexity, "breadcrumb-item")) +
                         BreadCrumb(ParagraphCard("Vetor do atack: " + d.impact.attackVector, "breadcrumb-item")) + 
                         BreadCrumb(ParagraphCard("Pontuação base: " + d.impact.baseScore, "breadcrumb-item")) + 
                         BreadCrumb(ParagraphCard("Gravidade: " + d.impact.baseSeverity, "breadcrumb-item")) + 
                         BreadCrumb(ParagraphCard("Privilégios necessários: " + d.impact.privilegesRequired, "breadcrumb-item")) + 
                         BreadCrumb(ParagraphCard("Scope: " + d.impact.scope, "breadcrumb-item")) + 
                         BreadCrumb(ParagraphCard("Interação do usuário: " + d.impact.userInteraction, "breadcrumb-item"));

            let references = '';

            $.each(d.references.reference_data, function(h, ref){
                let tags = [];
                $.each(ref.tags, function(l, tag){
                    tags.push(tag);
                })
                if(tags.length > 0)
                  references += BreadCrumb(ParagraphCard("URL: <a href='" + ref.url + "'>" + ref.url + "</a>", "breadcrumb-item") + ParagraphCard("Ref Source: " + ref.refsource, "breadcrumb-item") + ParagraphCard("Tags: " + tags.join(','), "breadcrumb-item")); 
                else
                  references += BreadCrumb(ParagraphCard("URL: <a href='" + ref.url + "'>" + ref.url + "</a>", "breadcrumb-item" + ParagraphCard("Ref Source: " + ref.refsource, "breadcrumb-item")));
            });

            body += CardSection('Descrição', descriptiontext);
            body += CardSection('Impacto', impact);
            body += CardSection('Referências', references);

            $("#panel-" + i).append(CardBody(body));
        });
    });
}

function ResultInit(){
    $.each(panels, function(index,panel){
        result.push({
            panel: panel,
            data : []
        });
    })
}

function CardSection(title, content){
    return '<h3 class="h5 card-title mt-3">' + title + '</h3>' + content;
}


function ParagraphCard(text, cssclass){
    let css = '';
    
    if(cssclass != undefined)
        css = cssclass;

    return '<p class="card-text ' + css + ' ">' + text +'</p>';
}

function BreadCrumb(text){
    return '<div class="breadcrumb">' + text + '</div>'
}

function CardBody(body){
    return '<div class="row">' +
                '<div class="col-12">' +
                    '<div class="card bg-primary border-light shadow-soft">' +
                    '<div class="card-body">' +
                            body +
                    '</div>' +
                '</div>' +
            '</div>';
}