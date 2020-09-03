function ResultInit() {
    $.each(panels, function (index, panel) {
        result.push({
            timestamp: '',
            panel: panel,
            data: [],
            page : 0
        });
    })
}

function Format(data) {
    let panelIndex;
    $.each(result, function (j, r) {
        if (r.panel == data.panel)
            panelIndex = j;
    });

    result[panelIndex].timestamp = data.timestamp; 

    $.each(data.result, function (index, d) {
        result[panelIndex].data.push(d);
    });

    return result[panelIndex];
}