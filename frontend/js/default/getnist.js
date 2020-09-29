let result = [];

$(document).ready(function () {
    StartLoading();
    ResultInit();

    $.each(panels, function(index, panel){
        GetData(panel,0);
    });
});

$("body").on('click', '#moreBtn', function(e){
    e.preventDefault();

    let index = $(this).parent().parent().attr('id').split('-')[1];
    let panel = result[index].panel;
    result[index].page +=  1;

    GetData(panel, result[index].page);

    $(this).remove();
});

$(".search-btn").click(function(e){
    e.preventDefault();

    let search = $('#searchInput').val().replaceAll(' ', '-');

    if(search != ''){
        result.push({
            timestamp: '',
            panel: search,
            data: [],
            page : 0
        });

        panels.push(search);

        CreateAccordion(search);
        GetData(search, 0);
    }
});


