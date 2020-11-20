$(document).ready(function () {

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
const url = './disease.json';
$.getJSON(url, function (items) {loadSelectItems($('#Diseases-sp'), items)});
    
// Action for select disease
$(function() {
    $('#Diseases-sp').on("changed.bs.select", function(e, clickedIndex) {
        const drug_json = './drugs' + this.value + '.json';
        $.getJSON(url, function (items) {loadSelectItems($('#Drugs-sp'), items)});  
    });
});



//     var table = $('#DiseaseTB').DataTable({
//         ajax: {
//             'url':'disease.json', 
//             'dataSrc':''
//         },
//         responsive: true,
//         orderMulti: true,
//         order : [[1, 'desc']],
//         columns: [
//             {"data": "No"},
//             {"data": "disease"}
//         ],
//         "language": {
//             "emptyTable": "데이터가 없어요.",
//             "lengthMenu": "페이지당 _MENU_ 개씩 보기",
//             "info": "현재 _START_ - _END_ / _TOTAL_건",
//             "infoEmpty": "데이터 없음",
//             "infoFiltered": "( _MAX_건의 데이터에서 필터링됨 )",
//             "search": "에서 검색: ",
//             "zeroRecords": "일치하는 데이터가 없어요.",
//             "loadingRecords": "로딩중...",
//             "processing":     "잠시만 기다려 주세요...",
//             "paginate": {
//                 "next": "다음",
//                 "previous": "이전"
//             }
//         },
//         dom : 'Blfrtip',
//         buttons:[{
// 		}]
//     });
//     var table = $('#DrugTB').DataTable({
//         ajax: {
//             'url':'drug.json', 
//             'dataSrc':''
//         },
//         responsive: true,
//         orderMulti: true,
//         order : [[1, 'desc']],
//         columns: [
//             {"data": "No"},
//             {"data": "drug"}
//         ],
//         "language": {
//             "emptyTable": "데이터가 없어요.",
//             "lengthMenu": "페이지당 _MENU_ 개씩 보기",
//             "info": "현재 _START_ - _END_ / _TOTAL_건",
//             "infoEmpty": "데이터 없음",
//             "infoFiltered": "( _MAX_건의 데이터에서 필터링됨 )",
//             "search": "에서 검색: ",
//             "zeroRecords": "일치하는 데이터가 없어요.",
//             "loadingRecords": "로딩중...",
//             "processing":     "잠시만 기다려 주세요...",
//             "paginate": {
//                 "next": "다음",
//                 "previous": "이전"
//             }
//         },
//         dom : 'Blfrtip',
//         buttons:[{
// 		}]
//     });
//     var table = $('#ProteinTB').DataTable({
//         ajax: {
//             'url':'protein.json', 
//             'dataSrc':''
//         },
//         responsive: true,
//         orderMulti: true,
//         order : [[1, 'desc']],
//         columns: [
//             {"data": "No"},
//             {"data": "protein"}
//         ],
//         "language": {
//             "emptyTable": "데이터가 없어요.",
//             "lengthMenu": "페이지당 _MENU_ 개씩 보기",
//             "info": "현재 _START_ - _END_ / _TOTAL_건",
//             "infoEmpty": "데이터 없음",
//             "infoFiltered": "( _MAX_건의 데이터에서 필터링됨 )",
//             "search": "에서 검색: ",
//             "zeroRecords": "일치하는 데이터가 없어요.",
//             "loadingRecords": "로딩중...",
//             "processing":     "잠시만 기다려 주세요...",
//             "paginate": {
//                 "next": "다음",
//                 "previous": "이전"
//             }
//         },
//         dom : 'Blfrtip',
//         buttons:[{
// 		}]
//     });

    
    
    var table = $('#DiToDr').DataTable({
        ajax: {
            'url':'DIS_DRG_test.json', 
            //'type': 'POST',
            'dataSrc':''
        },
        responsive: true,
        orderMulti: true,
        order : [[1, 'desc']],
        columns: [
            {"data": "No"},
            {"data": "disease"},
            {"data": "drug"}, 
            {"data": "PA"}, 
            {"data": "corr"}, 
//             {"data": "date"},
//             {"data": "ip_address",
//                 "render": function(data, type, row){
//                     /*
//                      * 다른 column의 값을 다루고 싶을 땐
//                      * row['COLUMN명'] 으로 꺼내쓸 수 있다.
//                      */
//                     if(type=='display'){
//                         data = '<a href="'+ data + '">' + data + '</a>';
//                     }
//                     return data;
//             }},
//             {"data":"money"}
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
        /* Footer에 금액총합 구하기,
         * filtered data 총합만 계산하도록 함.*/
//         "footerCallback":function(){
//             var api = this.api(), data;
//             var result = 0;
//             api.column(7, {search:'applied'}).data().each(function(data,index){
//                 result += parseFloat(data);
//             });
//             $(api.column(3).footer()).html(result.toLocaleString()+'원');
//         },
        dom : 'Blfrtip',
        buttons:[{
			extend:'csvHtml5',
			text: 'Export CSV',
			footer: true,
			bom: true,
			className: 'exportCSV'
		}]
    });

    /* Column별 검색기능 추가 */
    $('#DiToDr_filter').prepend('<select id="select"></select>');
    $('#DiToDr > thead > tr').children().each(function (indexInArray, valueOfElement) { 
        $('#select').append('<option>'+valueOfElement.innerHTML+'</option>');
    });
    
    $('.dataTables_filter input').unbind().bind('keyup', function () {
        var colIndex = document.querySelector('#select').selectedIndex;
        table.column(colIndex).search(this.value).draw();
    });

//     /* 날짜검색 이벤트 리바인딩 */
//     $('#myTable_filter').prepend('<input type="text" id="toDate" placeholder="yyyy-MM-dd"> ');
//     $('#myTable_filter').prepend('<input type="text" id="fromDate" placeholder="yyyy-MM-dd">~');
//     $('#toDate, #fromDate').unbind().bind('keyup',function(){
//         table.draw();
//     }
//                                          )


});