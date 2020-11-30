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
    
    
    /* 대기 알람 기능 추가 */
    (function($) {
        showSwal = function(type) {
            'use strict';
            if (type === 'auto-close') {
                swal({
                    title: 'Wait a few seconds!',
                    text: 'We are fetching the result, please be patient. I will close in 2 seconds.',
                    timer: 3000,
                    button: false
                })
//                     .then(function() {},
//                     // handling the promise rejection
//                     function(dismiss) {
//                         if (dismiss === 'timer') {
//                             console.log('I was closed by the timer')
//                     }}
            }
            else{
                swal("Error occured !");
            }
        }
    })(jQuery);

    const url = 'json/disease.json';
    $.getJSON(url, function (items) {loadSelectItems($('#Diseases-sp'), items)});
    
    //////////////////////////////// Action for select disease
    $(function() {
        $('#Diseases-sp').on("changed.bs.select", function(e, clickedIndex) {
            const drug_json = 'json/drug/drugs_' + this.value + '.json';
            const protein_json = 'json/protein/drugs_' + this.value + '.json';
            
            
            showSwal('auto-close')
            
            setTimeout(function() {}, 100); // 3000ms(3초)가 경과하면 이 함수가 실행됩니다.
            
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
                    {"data": "corr",
                        "render": function(data, type, row, meta) {
                            return type === 'display' ?
                                '<progress value="' + data + '" max="1"></progress>' :
                                data;
                    }}
                ],
                "language": {
                    "emptyTable": "No table.",
                    "lengthMenu": "_MENU_ items / page",
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
                dom : 'lfrtip'
//                 buttons:[{
//                 }]
            });
            $('#DrugTB').DataTable().ajax.reload();
            
                /* Column별 검색기능 추가 */
            $('#DrugTB_filter').prepend('<select id="DrugTBselect"></select>');
            $('#DrugTB > thead > tr').children().each(function (indexInArray, valueOfElement) { 
                $('#DrugTBselect').append('<option>'+valueOfElement.innerHTML+'</option>');
            });

            $('#DrugTB_filter input').unbind().bind('keyup', function () {
                var colIndex = document.querySelector('#DrugTBselect').selectedIndex;
                table.column(colIndex).search(this.value).draw();
            });
            
            $('#ProteinTB').DataTable().destroy();
            var PRtable = $('#ProteinTB').DataTable({
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
                    {"data": "corr",
                        "render": function(data, type, row, meta) {
                            return type === 'display' ?
                                '<progress value="' + data + '" max="1"></progress>' :
                                data;
                    }}
                ],
                "language": {
                    "emptyTable": "No table.",
                    "lengthMenu": "_MENU_ items / page",
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
                dom : 'lfrtip'
//                 buttons:[{
//                 }]
            });
            $('#ProteinTB').DataTable().ajax.reload();
            
                    /* Column별 검색기능 추가 */
            $('#ProteinTB_filter').prepend('<select id="ProteinTBselect"></select>');
            $('#ProteinTB > thead > tr').children().each(function (indexInArray, valueOfElement) { 
                $('#ProteinTBselect').append('<option>'+valueOfElement.innerHTML+'</option>');
            });

            $('#ProteinTB_filter input').unbind().bind('keyup', function () {
                var colIndex = document.querySelector('#ProteinTBselect').selectedIndex;
                PRtable.column(colIndex).search(this.value).draw();
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
            {"data": "corr",
                "render": function(data, type, row, meta) {
                    return type === 'display' ?
                        '<progress value="' + data + '" max="1"></progress>' :
                        data;
            }}
        ],
        "language": {
            "emptyTable": "No table.",
            "lengthMenu": "_MENU_ items / page",
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
        dom : 'lfrtip'
//         buttons:[{
//         }]
    });


    
    
        /* Column별 검색기능 추가 */
    $('#DrugTB_filter').prepend('<select id="DrugTBselect"></select>');
    $('#DrugTB > thead > tr').children().each(function (indexInArray, valueOfElement) { 
        $('#DrugTBselect').append('<option>'+valueOfElement.innerHTML+'</option>');
    });
    
    $('#DrugTB_filter input').unbind().bind('keyup', function () {
        var colIndex = document.querySelector('#DrugTBselect').selectedIndex;
        table.column(colIndex).search(this.value).draw();
    });
    
    // ************* PROTEIN ***************
    var PRtable = $('#ProteinTB').DataTable({
        ajax: {
            'url':'json/protein/drugs_COVID_19.json', 
            'dataSrc':'',
            "scrollX": true
        },
        responsive: true,
        orderMulti: true,
        order : [[0, 'asc']],
        columns: [
            {"data": "No"},
            {"data": "item"},
            {"data": "corr",
                "render": function(data, type, row, meta) {
                    return type === 'display' ?
                        '<progress value="' + data + '" max="1"></progress>' :
                        data;
            }}
        ],
        "language": {
            "emptyTable": "No table.",
            "lengthMenu": "_MENU_ items / page",
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
        dom : 'lfrtip'
//         buttons:[{
//     	}]
    });
        /* Column별 검색기능 추가 */
    $('#ProteinTB_filter').prepend('<select id="ProteinTBselect"></select>');
    $('#ProteinTB > thead > tr').children().each(function (indexInArray, valueOfElement) { 
        $('#ProteinTBselect').append('<option>'+valueOfElement.innerHTML+'</option>');
    });
    
    $('#ProteinTB_filter input').unbind().bind('keyup', function () {
        var colIndex = document.querySelector('#ProteinTBselect').selectedIndex;
        PRtable.column(colIndex).search(this.value).draw();
    });
    
}); // Document end