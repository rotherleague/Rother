
var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRF0IGMPN5alV0GPqtOE2QCJLgGb7X9QUFR6KiU--J61tKATgnOuo38kmueP5fWCVyDNz4jV4NMOjPo/pubhtml';

      function init() {
        Papa.parse(public_spreadsheet_url, {
          download: true,
          header: true,
          complete: showInfo
        })
      }

      window.addEventListener('DOMContentLoaded', init)



     function showInfo(results) {
       var data = results.data
       var result = [];
       var count = 1;
       // data comes through as a simple array since simpleSheet is turned on
       // alert("Successfully processed " + data.length + " rows!");
       // console.log(data);
		
	   // loop to get the data from JSON and write it to the div's with the id's database and quicksearch 
       $.each(data, function(i, v) {
         // Parses the resulting JSON into the individual squares for each row
         $container.append('<div id="element-item"><div class="category">' + v.Club_Name + '</div><div class="name">' + v.First_Name + '</div><div class="boldsubhed">' + v.Ground_Postcode + '</div><div class="boldsubhed">' + v.Ground_Name + '</div><div class="description">' + v.Last_Name + '</div><div class="readmore">' + v.Age_Group + '</div></div>');
         // Gets all unique filtercategory values and puts them into an array
         if ($.inArray(v.Filter_category, result) == -1) {
           result.push(v.Filter_category);
           // Creates the filter buttons
           $('#filter').append('<div id="' + v.Email + '" class="btn btn-default" data-value="choice' + count++ + '">' + v.Email + '</div>')
         }
       });
      
      
     }



 function showInfo2(results) {
        var data = results.data

        var cat = '';
        var cat_li = '';
        var list_li = '';
        var content_li = '';
        var nav_li = '';
        var navlist_li = '';

        var i = 4;

        /*
        $("#table_info").text("We found the tables " + data.model_names.join(", "));

        $.each( data.sheets(), function(i, sheet) {
        $("#table_info").append("<p>" + sheet.name + " has " + sheet.column_names.join(", ") + "</p>");
        });
        */
       $.each( data.sheets("clubs").all(), function(i, clubs) {

            nav_li = $('<div></div>');

            if (clubs.clubname != 'Name Of Club'){

                navlist_li = '<a href="#ref'+ clubs.clubname.replace(/\s/g,'-').toLowerCase() +'" class="nav-link">'+ clubs.clubname +'</a>';
          
            }
           
            if (clubs.visible.toLowerCase() === "show"){ 
                nav_li.append('<li class="list-group-item p-0">'+ navlist_li + '</li>');
            }    

                
             //Combine content
             nav_li.appendTo("#nav");

             navlist_li = '';

        });

        $.each( data.sheets("clubs").all(), function(i, clubs) {

            // Show category
            
            // link to the clubs
            list_li = $('<div></div>');

            

            if (clubs.clubname != 'Name Of Club'){

            
                if  (cat != clubs.clubname){
                    
                    cat_li = '<br><div class="list-group-item list-group-item-action active" id="ref'+ clubs.clubname.replace(/\s/g,'-').toLowerCase() +'">'+
                    '<div class="d-flex w-100 justify-content-between">'+
                            '<h1>' + clubs.clubname +'</h1>' +
                        '</div>' +
                    '</div>';
                }

                /*
                if (map.description != ''){
                    content_li ='<p class="mb-1">' +map.agegroupinwhichteamwillparticipatethisseason.replace(/\n/g, "<br />") + '</p>';
                }
                */

                //Manager Details
                content_li = content_li +'<strong>Club Secretary:</strong> ';
                
                if (clubs.firstname != ''){
                    content_li = content_li  + clubs.firstname + ' '+ clubs.lastname + '<br>';
                }

                // only show ticked items
                if (clubs.visible.toLowerCase() === "show"){
                    if (clubs.mobile != ''){
                        content_li = content_li +'<strong>Tel:</strong> <a href="tel:'+clubs.mobile.replace(" ", "")+'">' + clubs.mobile + '</a><br>';
                    }
                    if (clubs.email != ''){
                        content_li = content_li +'<strong>Email:</strong> <a href="mailto:'+clubs.email+'">' + clubs.email + '</a><br>';
                    }
                }

               

                //Combine content
                list_li.append('<div class="list-group-item list-group-item-action">'+ '<div  class="d-flex w-100 justify-content-between">'+ '<h5 class="mb-1">' + clubs.clubname  +'</h5></div>'+ content_li + '</div>');
                
                list_li.prepend(cat_li);

                list_li.appendTo("#clubs");

                
            }
    
            // Set current category for loop
            cat = clubs.clubname;
            cat_team = '';
            cat_li = '';
            content_li = '';

            
        });

}

     
/*
function init() {
    Tabletop.init( {        key: 'https://docs.google.com/spreadsheets/d/'+code+'/pubhtml',
                            callback: showInfo,
                            simpleSheet: false,
                            wanted: [ "clubs" ],
                            debug: true ,
                            simpleSheet: true,
                            orderby: 'clubname',
                            reverse: false } )
  }
*/    




function titleCase(str){
   str = str.toLowerCase().split(' ');
   let final = [];

    for(let  word of str){
      final.push(word.charAt(0).toUpperCase()+ word.slice(1));
    }

  return final.join(' ')
}
