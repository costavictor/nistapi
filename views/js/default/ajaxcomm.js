function GetData(name) {
    return $.ajax({
        type: "GET",
        url: "/nist/search",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({'name' : name}),
        success: DataSuccess,
        error: DataError
    });
}

function DataError(jqXHR, textStatus, errorThrown) {
    console.error(jqXHR);
}
