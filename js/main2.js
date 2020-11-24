$(document).ready(function () {  
    // Get json data    
    function loadSelectItems(select, items) {
        var options = '';
        $.each(items, function(key, value) {
            options += '<option value=' + value.disease + '>' + value.disease + '</option>';
        });
        select.empty();
        select.append(options);
        select.selectpicker('refresh');
    }

    function get_drugs(select, items) {
        var options = '';
        $.each(items, function(key, value) {
            options += '<option value=' + value.drug + '>' + value.drug +', '+ value.PA +' ' + value.corr + '</option>';
        });
        select.empty();
        select.append(options);
        select.selectpicker('refresh');
    }
    const url = './disease.json';
    $.getJSON(url, function (items) {loadSelectItems($('#Diseases-sp'), items)});

    // Action for select disease
    $(function() {
        $('#Diseases-sp').on("changed.bs.select", function(e, clickedIndex) {
            const drug_json = './json/drug/drugs_"' + this.value + '".json';
            $.getJSON(drug_json, function (items) {get_drugs($('#Drugs-sp'), items)});  
        });
    });

});