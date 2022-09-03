
var ourDiv = document.getElementById('results');

var clickCounter = 0;

var n = 0;

var dataset;




function fetchJSONFile(path, callback) {

    var httpRequest = new XMLHttpRequest();

    httpRequest.onreadystatechange = function () {
        if (httpRequest.readyState === 4) {
            if (httpRequest.status === 200) {
                var data = JSON.parse(httpRequest.responseText);
                if (callback) callback(data);
            }
        }
    };
    httpRequest.open('GET', path);
    httpRequest.send();
}

function dateString(date) {
    var d = date.substring(0, 10);

    return d;
}

// Initialize and add the map
function initMap() {
    // The location of Uluru
    const uluru = { lat: -25.344, lng: 131.031 };
    // The map, centered at Uluru
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 4,
        center: uluru,
    });
    // The marker, positioned at Uluru
    const marker = new google.maps.Marker({
        position: uluru,
        map: map,
    });
}

//   window.initMap = initMap;

function renderHtml(data, n) {
    // console.log("The value of n is: ", n);

    if (n == 2) {
        var htmlString = '';
        htmlString += `<table class="table table-bordered  m-3">
                            <tr>
                                <th scope="col">Sector</th> 
                                <th scope="col">Communtiy Name</th> 
                                <th scope="col">Group Category</th> 
                                <th scope="col">Category</th> 
                                <th scope="col">Resident Count</th> 
                                <th scope="col">Data</th> 
                                <th scope="col">Month</th> 
                                <th scope="col">Location</th> </tr>`;
        for (var i = 0; i < data.length; i++) {
            htmlString += '<tr>';
            htmlString += '<td>' + data[i].sector + '</td>';
            htmlString += '<td>' + data[i].community_name + '</td>';
            htmlString += '<td>' + data[i].group_category + '</td>';
            htmlString += '<td>' + data[i].category + '</td>';
            htmlString += '<td>' + data[i].resident_count + '</td>';
            htmlString += '<td>' + dateString(data[i].date) + '</td>';
            htmlString += '<td>' + data[i].month + '</td>';
            htmlString += '<td> <a href="https://maps.google.com/?q=' + data[i].geocoded_column.latitude + ',' + data[i].geocoded_column.longitude + '"> Click here </a> </td>';
            htmlString += '</tr>';
        }
        htmlString += '</tr> </table>';
    }
    if (n == 1) {
        // console.log("The value of n is:asdfjdl;sfk ");
        var htmlString = '';
        htmlString += `<table class="table table-bordered  m-3">
                            <tr>
                                <th scope="col">Start Date</th> 
                                <th style="width: 20%" scope="col">Incident Info</th> 
                                <th style="width: 20%" scope="col">Description</th>     
                                <th scope="col">Modified Date</th> 
                                <th scope="col">Quadrant</th> 
                                <th scope="col">Count</th> 
                                <th scope="col">Location</th> </tr>`;

        for (var i = 0; i < data.length; i++) {
            htmlString += '<tr>';
            htmlString += '<td>' + dateString(data[i].start_dt) + '</td>';
            htmlString += '<td>' + data[i].incident_info + '</td>';
            htmlString += '<td>' + data[i].description + '</td>';
            htmlString += '<td>' + dateString(data[i].modified_dt) + '</td>';
            htmlString += '<td>' + data[i].quadrant + '</td>';
            htmlString += '<td>' + data[i].count + '</td>';
            htmlString += '<td> <a href="https://maps.google.com/?q=' + data[i].latitude + ',' + data[i].longitude + '"> Click here </a> </td>';
            htmlString += '</tr>';
        }
        htmlString += '</tr> </table>';
    }
    if (n == 3) {
        var htmlString = '';

        htmlString += `<table class="table table-bordered  m-3">
                            <tr>
                                <th scope="col">Applied Date</th>     
                                <th style="width: 15%" scope="col">Permit Number</th> 
                                <th scope="col">Current Status</th> 
                                <th scope="col">Permit Type</th>              
                                <th style="width: 10%" scope="col">Description</th> 
                                <th scope="col">Contractor Name</th> 
                                <th scope="col">Community Name</th> 
                                <th scope="col">Estimated Cost</th> 
                                <th scope="col">Location</th> </tr>`;


        for (var i = 0; i < data.length; i++) {
            htmlString += '<tr>';
            htmlString += '<td>' + dateString(data[i].applieddate) + '</td>';
            htmlString += '<td>' + data[i].permitnum + '</td>';
            htmlString += '<td>' + data[i].statuscurrent + '</td>';
            htmlString += '<td>' + data[i].permittype + '</td>';
            htmlString += '<td>' + data[i].description + '</td>';
            htmlString += '<td>' + data[i].contractorname + '</td>';
            htmlString += '<td>' + data[i].communityname + '</td>';
            htmlString += '<td>' + data[i].estprojectcost + '</td>';
            htmlString += '<td> <a href="https://maps.google.com/?q=' + data[i].latitude + ',' + data[i].longitude + '"> Click here </a> </td>';
            htmlString += '</tr>';
        }
        htmlString += '</tr> </table>';
    }

    ourDiv.insertAdjacentHTML('afterbegin', htmlString);
};



$('select.q').on('change', function () {

    var selectedQuery = $(this).children("option:selected").val();

    if (selectedQuery == "no_value") {
        $('#dropdown1').prop('disabled', true);
        $('#search-input').prop('disabled', true);
        $('#search-input').prop('placeholder', "Select a parameter first");
    }
    else {
        $('#dropdown1').prop('disabled', false);
    }

    if (selectedQuery == "Crime_Stats") {
        n = 2;
        dataset = "https://data.calgary.ca/resource/848s-4m4z.json";
        $('#parameter1').val("community_name");
        $('#parameter1').text("Community Name");
        $('#parameter2').val("sector");
        $('#parameter2').text("Sector");

        $('#parameter3').val("group_category");
        $('#parameter3').text("Group Category");
        $('#parameter4').val("month");
        $('#parameter4').text("Month");
    }

    if (selectedQuery == "Traffic_Incidents") {
        n = 1;
        dataset = "https://data.calgary.ca/resource/35ra-9556.json";
        $('#parameter1').val("incident_info");
        $('#parameter1').text("Incident Info");
        $('#parameter2').val("quadrant");
        $('#parameter2').text("Quadrant");

        $('#parameter3').val("description");
        $('#parameter3').text("Description");
        $('#parameter4').val("start_dt");
        $('#parameter4').text("Start Date");
    }

    if (selectedQuery == "Building_Permits") {
        n = 3;
        dataset = "https://data.calgary.ca/resource/c2es-76ed.json";
        $('#parameter1').val("statuscurrent");
        $('#parameter1').text("Current Status");
        $('#parameter2').val("permittype");
        $('#parameter2').text("Permit Type");

        $('#parameter3').val("permitnum");
        $('#parameter3').text("Permit Number");
        $('#parameter4').val("communityname");
        $('#parameter4').text("Community Name");
    }

    $('#results').html('');


    fetchJSONFile(dataset, function (data) {
        renderHtml(data, n);
    });

    var selectedQuery = $(this).children("option:selected").val();

    // console.log(selectedQuery);
    if (selectedQuery == "no_val") {
        $('#search-input').prop('disabled', true);
        $('#search-input').prop('placeholder', "Select a parameter first");
    }
    else {
        $('#search-input').val('');
        $('#search-input').prop('disabled', false);
        $('#search-input').prop('placeholder', "Enter");

    }
});

$('select.q1').on('change', function () {
    $('#search-input').val('');
});


$('#search-input').keyup(function () {

    $('#results').html('');

    var searchField = $('#search-input').val();
    var expression = new RegExp(searchField, 'i');

    const searchParam = $('select#dropdown1').val();


    fetchJSONFile(dataset, function (data) {

        if (n == 2) {
            var outputString = '';

            outputString += `<table class="table table-bordered  m-3">
                                <tr>
                                    <th scope="col">Sector</th> 
                                    <th scope="col">Communtiy Name</th> 
                                    <th scope="col">Group Category</th> 
                                    <th scope="col">Category</th> 
                                    <th scope="col">Resident Count</th> 
                                    <th scope="col">Data</th> 
                                    <th scope="col">Month</th> 
                                    <th scope="col">Location</th> </tr>`;

            $.each(data, function (key, value) {

                // console.log(searchParam);

                switch (searchParam) {

                    case "community_name":

                        if (value.community_name.search(expression) != -1) {
                            outputString += '<tr>';
                            outputString += '<td>' + this.sector + '</td>';
                            outputString += '<td>' + this.community_name + '</td>';
                            outputString += '<td>' + this.group_category + '</td>';
                            outputString += '<td>' + this.category + '</td>';
                            outputString += '<td>' + this.resident_count + '</td>';
                            outputString += '<td>' + dateString(this.date) + '</td>';
                            outputString += '<td>' + this.month + '</td>';
                            outputString += '<td> <a href="https://maps.google.com/?q=' + this.geocoded_column.latitude + ',' + this.geocoded_column.longitude + '"> Click here </a> </td>';
                            outputString += '</tr>';
                        }
                        break;

                    case "sector":
                        if (value.sector.search(expression) != -1) {
                            outputString += '<tr>';
                            outputString += '<td>' + this.sector + '</td>';
                            outputString += '<td>' + this.community_name + '</td>';
                            outputString += '<td>' + this.group_category + '</td>';
                            outputString += '<td>' + this.category + '</td>';
                            outputString += '<td>' + this.resident_count + '</td>';
                            outputString += '<td>' + dateString(this.date) + '</td>';
                            outputString += '<td>' + this.month + '</td>';
                            outputString += '<td> <a href="https://maps.google.com/?q=' + this.geocoded_column.latitude + ',' + this.geocoded_column.longitude + '"> Click here </a> </td>';
                            outputString += '</tr>';

                        }
                        break;

                    case "group_category":
                        if (value.group_category.search(expression) != -1) {

                            outputString += '<tr>';
                            outputString += '<td>' + this.sector + '</td>';
                            outputString += '<td>' + this.community_name + '</td>';
                            outputString += '<td>' + this.group_category + '</td>';
                            outputString += '<td>' + this.category + '</td>';
                            outputString += '<td>' + this.resident_count + '</td>';
                            outputString += '<td>' + dateString(this.date) + '</td>';
                            outputString += '<td>' + this.month + '</td>';
                            outputString += '<td> <a href="https://maps.google.com/?q=' + this.geocoded_column.latitude + ',' + this.geocoded_column.longitude + '"> Click here </a> </td>';
                            outputString += '</tr>';

                        }
                        break;

                    case "month":
                        if (value.month.search(expression) != -1) {
                            outputString += '<tr>';
                            outputString += '<td>' + this.sector + '</td>';
                            outputString += '<td>' + this.community_name + '</td>';
                            outputString += '<td>' + this.group_category + '</td>';
                            outputString += '<td>' + this.category + '</td>';
                            outputString += '<td>' + this.resident_count + '</td>';
                            outputString += '<td>' + dateString(this.date) + '</td>';
                            outputString += '<td>' + this.month + '</td>';
                            outputString += '<td> <a href="https://maps.google.com/?q=' + this.geocoded_column.latitude + ',' + this.geocoded_column.longitude + '"> Click here </a> </td>';
                            outputString += '</tr>';
                        }
                        break;

                }

            });

            outputString += `          </tr> 
                                </table>`;
        }

        if (n == 1) {
            var outputString = '';

            outputString += `<table class="table table-bordered  m-3">
                     <tr>
                        <th scope="col">Start Date</th> 
                        <th style="width: 20%" scope="col">Incident Info</th> 
                        <th style="width: 20%" scope="col">Description</th>     
                        <th scope="col">Modified Date</th> 
                        <th scope="col">Quadrant</th> 
                        <th scope="col">Count</th> 
                        <th scope="col">Location</th> </tr>`;

            $.each(data, function (key, value) {

                // console.log(searchParam);

                switch (searchParam) {

                    case "incident_info":

                        if (value.incident_info.search(expression) != -1) {
                            outputString += '<tr>';
                            outputString += '<td>' + dateString(this.start_dt) + '</td>';
                            outputString += '<td>' + this.incident_info + '</td>';
                            outputString += '<td>' + this.description + '</td>';
                            outputString += '<td>' + dateString(this.modified_dt) + '</td>';
                            outputString += '<td>' + this.quadrant + '</td>';
                            outputString += '<td>' + this.count + '</td>';
                            outputString += '<td> <a href="https://maps.google.com/?q=' + this.latitude + ',' + this.longitude + '"> Click here </a> </td>';
                            outputString += '</tr>';
                        }
                        break;

                    case "quadrant":
                        if (value.quadrant.search(expression) != -1) {
                            outputString += '<tr>';
                            outputString += '<td>' + dateString(this.start_dt) + '</td>';
                            outputString += '<td>' + this.incident_info + '</td>';
                            outputString += '<td>' + this.description + '</td>';
                            outputString += '<td>' + dateString(this.modified_dt) + '</td>';
                            outputString += '<td>' + this.quadrant + '</td>';
                            outputString += '<td>' + this.count + '</td>';
                            outputString += '<td> <a href="https://maps.google.com/?q=' + this.latitude + ',' + this.longitude + '"> Click here </a> </td>';
                            outputString += '</tr>';

                        }
                        break;

                    case "description":
                        if (value.description.search(expression) != -1) {

                            outputString += '<tr>';
                            outputString += '<td>' + dateString(this.start_dt) + '</td>';
                            outputString += '<td>' + this.incident_info + '</td>';
                            outputString += '<td>' + this.description + '</td>';
                            outputString += '<td>' + dateString(this.modified_dt) + '</td>';
                            outputString += '<td>' + this.quadrant + '</td>';
                            outputString += '<td>' + this.count + '</td>';
                            outputString += '<td> <a href="https://maps.google.com/?q=' + this.latitude + ',' + this.longitude + '"> Click here </a> </td>';
                            outputString += '</tr>';

                        }
                        break;

                    case "start_dt":
                        if (value.start_dt.search(expression) != -1) {
                            outputString += '<tr>';
                            outputString += '<td>' + dateString(this.start_dt) + '</td>';
                            outputString += '<td>' + this.incident_info + '</td>';
                            outputString += '<td>' + this.description + '</td>';
                            outputString += '<td>' + dateString(this.modified_dt) + '</td>';
                            outputString += '<td>' + this.quadrant + '</td>';
                            outputString += '<td>' + this.count + '</td>';
                            outputString += '<td> <a href="https://maps.google.com/?q=' + this.latitude + ',' + this.longitude + '"> Click here </a> </td>';
                            outputString += '</tr>';
                        }
                        break;

                }

            });

            outputString += `          </tr> 
                            </table>`;
        }

        if (n == 3) {

            var outputString = '';
// console.log("ksdfalk");
            outputString += `<table class="table table-bordered  m-3">
                            <tr>
                                <th scope="col">Applied Date</th>     
                                <th style="width: 15%" scope="col">Permit Number</th> 
                                <th scope="col">Current Status</th> 
                                <th scope="col">Permit Type</th>              
                                <th style="width: 10%" scope="col">Description</th> 
                                <th scope="col">Contractor Name</th> 
                                <th scope="col">Community Name</th> 
                                <th scope="col">Estimated Cost</th> 
                                <th scope="col">Location</th> </tr>`;

            $.each(data, function (key, value) {
                // console.log(searchParam);

                switch (searchParam) {
                    
                    case "permitnum":

                        if (value.permitnum.search(expression) != -1) {
                            outputString += '<tr>';
                            outputString += '<td>' + dateString(this.applieddate) + '</td>';
                            outputString += '<td>' + this.permitnum + '</td>';
                            outputString += '<td>' + this.statuscurrent + '</td>';
                            outputString += '<td>' + this.permittype + '</td>';
                            outputString += '<td>' + this.description + '</td>';
                            outputString += '<td>' + this.contractorname + '</td>';
                            outputString += '<td>' + this.communityname + '</td>';
                            outputString += '<td>' + this.estprojectcost + '</td>';
                            outputString += '<td> <a href="https://maps.google.com/?q=' + this.latitude + ',' + this.longitude + '"> Click here </a> </td>';
                            outputString += '</tr>';
                        }
                        break;

                    case "statuscurrent":
                        if (value.statuscurrent.search(expression) != -1) {
                            outputString += '<tr>';
                            outputString += '<td>' + dateString(this.applieddate) + '</td>';
                            outputString += '<td>' + this.permitnum + '</td>';
                            outputString += '<td>' + this.statuscurrent + '</td>';
                            outputString += '<td>' + this.permittype + '</td>';
                            outputString += '<td>' + this.description + '</td>';
                            outputString += '<td>' + this.contractorname + '</td>';
                            outputString += '<td>' + this.communityname + '</td>';
                            outputString += '<td>' + this.estprojectcost + '</td>';
                            outputString += '<td> <a href="https://maps.google.com/?q=' + this.latitude + ',' + this.longitude + '"> Click here </a> </td>';
                            outputString += '</tr>';

                        }
                        break;

                    case "permittype":
                        if (value.permittype.search(expression) != -1) {

                            outputString += '<tr>';
                            outputString += '<td>' + dateString(this.applieddate) + '</td>';
                            outputString += '<td>' + this.permitnum + '</td>';
                            outputString += '<td>' + this.statuscurrent + '</td>';
                            outputString += '<td>' + this.permittype + '</td>';
                            outputString += '<td>' + this.description + '</td>';
                            outputString += '<td>' + this.contractorname + '</td>';
                            outputString += '<td>' + this.communityname + '</td>';
                            outputString += '<td>' + this.estprojectcost + '</td>';
                            outputString += '<td> <a href="https://maps.google.com/?q=' + this.latitude + ',' + this.longitude + '"> Click here </a> </td>';
                            outputString += '</tr>';

                        }
                        break;

                    case "communityname":
                        if (value.communityname.search(expression) != -1) {
                            outputString += '<tr>';
                            outputString += '<td>' + dateString(this.applieddate) + '</td>';
                            outputString += '<td>' + this.permitnum + '</td>';
                            outputString += '<td>' + this.statuscurrent + '</td>';
                            outputString += '<td>' + this.permittype + '</td>';
                            outputString += '<td>' + this.description + '</td>';
                            outputString += '<td>' + this.contractorname + '</td>';
                            outputString += '<td>' + this.communityname + '</td>';
                            outputString += '<td>' + this.estprojectcost + '</td>';
                            outputString += '<td> <a href="https://maps.google.com/?q=' + this.latitude + ',' + this.longitude + '"> Click here </a> </td>';
                            outputString += '</tr>';
                        }
                        break;

                }

            });

            outputString += `          </tr> 
                                        </table>`;
        }

        ourDiv.insertAdjacentHTML('afterbegin', outputString);



    });

});

