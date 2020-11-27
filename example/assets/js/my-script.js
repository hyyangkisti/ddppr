$(document).ready(function () {  
    //////////////////////////////// Get json data for Disease list
    function loadSelectItems(select, items) {
        var options = '';
        $.each(items, function(key, value) {
            options += '<option value=' + value.disease_tk + ' data-tokens=' + value.disease + ' data-subtext=' + value.No + '>' + value.disease + '</option>';
        });
        select.empty();
        select.append(options);
        select.selectpicker('refresh');
    }

    const url = 'json/disease.json';
    $.getJSON(url, function (items) {loadSelectItems($('#Diseases-sp'), items)});
    
    
    //////////////////////////////// Action for select disease
    $(function() {
        $('#Diseases-sp').on("changed.bs.select", function(e, clickedIndex) {
            const drug_json = 'json/drug/drugs_' + this.value + '.json';
            const protein_json = 'json/protein/drugs_' + this.value + '.json';
            
            // ************* DRUG ***************
            $('#DrugTB').DataTable().destroy();
            var table = $('#DrugTB').DataTable({
                ajax: {
                    'url':drug_json, 
                    'dataSrc':''
                },
                responsive: true,
                orderMulti: true,
                order : [[0, 'asc']],
                columns: [
                    {"data": "No"},
                    {"data": "item"},
                    {"data": "PA"},
                    {"data": "corr"}
                ],
                "language": {
                    "emptyTable": "No table.",
                    "lengthMenu": "_MENU_ / page",
                    "info": "_START_ - _END_ / _TOTAL_ items",
                    "infoEmpty": "No data",
                    "infoFiltered": "(Filtered from _MAX_ )",
                    "search": "search: ",
                    "zeroRecords": "No matched.",
                    "loadingRecords": "Loading...",
                    "processing":     "Processing...",
                    "paginate": {
                        "next": "Next",
                        "previous": "Previous"
                    }
                },
                dom : 'Blfrtip',
                buttons:[{
                }]
            });
            $('#DrugTB').DataTable().ajax.reload();
            
                /* Column별 검색기능 추가 */
            $('#DrugTB_filter').prepend('<select id="DrugTBselect"></select>');
            $('#DrugTB > thead > tr').children().each(function (indexInArray, valueOfElement) { 
                $('#DrugTBselect').append('<option>'+valueOfElement.innerHTML+'</option>');
            });

            $('.dataTables_filter input').unbind().bind('keyup', function () {
                var colIndex = document.querySelector('#DrugTBselect').selectedIndex;
                table.column(colIndex).search(this.value).draw();
            });
            
            $('#ProteinTB').DataTable().destroy();
            var table = $('#ProteinTB').DataTable({
                ajax: {
                    'url':protein_json, 
                    'dataSrc':''
                },
                responsive: true,
                orderMulti: true,
                order : [[0, 'asc']],
                columns: [
                    {"data": "No"},
                    {"data": "item"},
                    {"data": "corr"}
                ],
                "language": {
                    "emptyTable": "No table.",
                    "lengthMenu": "_MENU_ / page",
                    "info": "_START_ - _END_ / _TOTAL_ items",
                    "infoEmpty": "No data",
                    "infoFiltered": "(Filtered from _MAX_ )",
                    "search": "search: ",
                    "zeroRecords": "No matched.",
                    "loadingRecords": "Loading...",
                    "processing":     "Processing...",
                    "paginate": {
                        "next": "Next",
                        "previous": "Previous"
                    }
                },
                dom : 'Blfrtip',
                buttons:[{
                }]
            });
            $('#DrugTB').DataTable().ajax.reload();
            
                    /* Column별 검색기능 추가 */
            $('#ProteinTB_filter').prepend('<select id="ProteinTBselect"></select>');
            $('#ProteinTB > thead > tr').children().each(function (indexInArray, valueOfElement) { 
                $('#ProteinTBselect').append('<option>'+valueOfElement.innerHTML+'</option>');
            });

            $('.dataTables_filter input').unbind().bind('keyup', function () {
                var colIndex = document.querySelector('#ProteinTBselect').selectedIndex;
                table.column(colIndex).search(this.value).draw();
            });


             
//             $.getJSON(drug_json, function (items) {get_drugs($('#Drugs-sp'), items)});  
         });
     });


    // ************* ABOUT DATATABLES ***************


    
//     $('#table').dataTable().fnClearTable(); 
//     $('#table').dataTable().fnAddData(data);
    
    $.fn.dataTable.ext.search.push(
        function(settings, data, dataIndex){
            var min = Date.parse($('#fromDate').val());
            var max = Date.parse($('#toDate').val());
            var targetDate = Date.parse(data[5]);
    
            if( (isNaN(min) && isNaN(max) ) || 
                (isNaN(min) && targetDate <= max )|| 
                ( min <= targetDate && isNaN(max) ) ||
                ( targetDate >= min && targetDate <= max) ){ 
                    return true;
            }
            return false;
        }
    )
    
    // ************* DRUG ***************
    var table = $('#DrugTB').DataTable({
        ajax: {
            'url':'json/drug/drugs_COVID_19.json', 
            'dataSrc':''
        },
        responsive: true,
        orderMulti: true,
        order : [[0, 'asc']],
        columns: [
            {"data": "No"},
            {"data": "item"},
            {"data": "PA"},
            {"data": "corr"}
        ],
        "language": {
            "emptyTable": "No table.",
            "lengthMenu": "_MENU_ / page",
            "info": "_START_ - _END_ / _TOTAL_ items",
            "infoEmpty": "No data",
            "infoFiltered": "(Filtered from _MAX_ )",
            "search": "search: ",
            "zeroRecords": "No matched.",
            "loadingRecords": "Loading...",
            "processing":     "Processing...",
            "paginate": {
                "next": "Next",
                "previous": "Previous"
            }
        },
        dom : 'Blfrtip',
        buttons:[{
        }]
    });


    
    
        /* Column별 검색기능 추가 */
    $('#DrugTB_filter').prepend('<select id="DrugTBselect"></select>');
    $('#DrugTB > thead > tr').children().each(function (indexInArray, valueOfElement) { 
        $('#DrugTBselect').append('<option>'+valueOfElement.innerHTML+'</option>');
    });
    
    $('.dataTables_filter input').unbind().bind('keyup', function () {
        var colIndex = document.querySelector('#DrugTBselect').selectedIndex;
        table.column(colIndex).search(this.value).draw();
    });
    
    // ************* PROTEIN ***************
    var table = $('#ProteinTB').DataTable({
        ajax: {
            'url':'json/protein/drugs_COVID_19.json', 
            'dataSrc':''
        },
        responsive: true,
        orderMulti: true,
        order : [[0, 'asc']],
        columns: [
            {"data": "No"},
            {"data": "item"},
            {"data": "corr"}
        ],
        "language": {
            "emptyTable": "No table.",
            "lengthMenu": "_MENU_ / page",
            "info": "_START_ - _END_ / _TOTAL_ items",
            "infoEmpty": "No data",
            "infoFiltered": "(Filtered from _MAX_ )",
            "search": "search: ",
            "zeroRecords": "No matched.",
            "loadingRecords": "Loading...",
            "processing":     "Processing...",
            "paginate": {
                "next": "Next",
                "previous": "Previous"
            }
        },
        dom : 'Blfrtip',
        buttons:[{
    	}]
    });
        /* Column별 검색기능 추가 */
    $('#ProteinTB_filter').prepend('<select id="ProteinTBselect"></select>');
    $('#ProteinTB > thead > tr').children().each(function (indexInArray, valueOfElement) { 
        $('#ProteinTBselect').append('<option>'+valueOfElement.innerHTML+'</option>');
    });
    
    $('.dataTables_filter input').unbind().bind('keyup', function () {
        var colIndex = document.querySelector('#ProteinTBselect').selectedIndex;
        table.column(colIndex).search(this.value).draw();
    });
});