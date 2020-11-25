$(document).ready(function () {  
    // Get json data    
    function loadSelectItems(select, items) {
        var options = '';
        $.each(items, function(key, value) {
            options += '<option value=' + value.disease + ' data-tokens=' + value.disease_tk + ' data-subtext=' + value.No + '>' + value.disease + '</option>';
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
            options += '<option value=' + value.drug + ' data-subtext=' + value.No + '>' + value.drug +', '+ value.PA +' ' + value.corr + '</option>';
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

    
    // ************* ABOUT DATATABLES ***************
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
        order : [[1, 'desc']],
        columns: [
            {"data": "No"},
            {"data": "item"},
            {"data": "PA"},
            {"data": "corr"}
        ],
        "language": {
            "emptyTable": "데이터가 없어요.",
            "lengthMenu": "페이지당 _MENU_ 개씩 보기",
            "info": "현재 _START_ - _END_ / _TOTAL_건",
            "infoEmpty": "데이터 없음",
            "infoFiltered": "( _MAX_건의 데이터에서 필터링됨 )",
            "search": "에서 검색: ",
            "zeroRecords": "일치하는 데이터가 없어요.",
            "loadingRecords": "로딩중...",
            "processing":     "잠시만 기다려 주세요...",
            "paginate": {
                "next": "다음",
                "previous": "이전"
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
        var colIndex = document.querySelector('#select').selectedIndex;
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
        order : [[1, 'desc']],
        columns: [
            {"data": "No"},
            {"data": "item"},
            {"data": "corr"}
        ],
        "language": {
            "emptyTable": "데이터가 없어요.",
            "lengthMenu": "페이지당 _MENU_ 개씩 보기",
            "info": "현재 _START_ - _END_ / _TOTAL_건",
            "infoEmpty": "데이터 없음",
            "infoFiltered": "( _MAX_건의 데이터에서 필터링됨 )",
            "search": "에서 검색: ",
            "zeroRecords": "일치하는 데이터가 없어요.",
            "loadingRecords": "로딩중...",
            "processing":     "잠시만 기다려 주세요...",
            "paginate": {
                "next": "다음",
                "previous": "이전"
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
        var colIndex = document.querySelector('#select').selectedIndex;
        table.column(colIndex).search(this.value).draw();
    });
});