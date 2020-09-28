function GetData(name, page) {
    return $.ajax({
        type: "POST",
        url: "/nist/search",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({'name' : name, 'page': page}),
        async: true,
        success: DataSuccess,
        error: DataError
    });
}

function DataSuccess(data){
    if(data != null | data != -1){
        Display(Format(data[0]));
    
        FinishLoading();
    } 
}

function DataError(jqXHR, textStatus, errorThrown) {
    console.error(jqXHR);
}