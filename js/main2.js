$(document).ready(function () {  
    // Get json data    
    function loadSelectItems(select, items) {
        var options = '';
        $.each(items, function(key, value) {
            options += '<option value=' + value.disease + 'data-tokens=' + value.disease_tk + 'data-subtext=' + value.No + '>' + value.disease + '</option>';
        });
        select.empty();
        select.append(options);
        select.selectpicker('refresh');
    }

    const url = './disease.json';
    $.getJSON(url, function (items) {loadSelectItems($('#Diseases-sp'), items)});
    
    function get_drugs(select, items) {
        var options = '';
        $.each(items, function(key, value) {
            options += '<option value=' + value.drug + 'data-tokens=' + value. + 'data-subtext=' + value.No + '>' + value.drug +', '+ value.PA +' ' + value.corr + '</option>';
//             <option data-tokens="ketchup mustard">Hot Dog, Fries and a Soda</option>
//             data-tokens: 내부에서 값을 읽어오는 방식(띄어쓰기 > 언더바로 변경해야함)
//             data-subtext="Heinz" : subtext for PA
        });
        select.empty();
        select.append(options);
        select.selectpicker('refresh');
    }
    
    // Action for select disease
    $(function() {
        $('#Diseases-sp').on("changed.bs.select", function(e, clickedIndex) {
            const drug_json = './json/drug/drugs_' + this.value + '.json';
            $.getJSON(drug_json, function (items) {get_drugs($('#Drugs-sp'), items)});  
        });
    });

});