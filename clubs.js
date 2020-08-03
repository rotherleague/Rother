$(document).ready( function() {


    // add var "code"
    
    //2019
    //var code = '1hWUOoG_-EpOk0Nay3VBHzG-yJiwkRaLEl2OJLmDsXP0';
    //2020
    var code = '1jKbx-IpvuiYahIxUj_MXy85tdp-mrV0oB8g-BSejsYE';

    // loop through spreadsheet with Tabletop
    Tabletop.init({ 
        key: code,
        callback: showInfo,
        wanted: [ "clubs" ],
        debug: true ,
        simpleSheet: true,
        orderby: 'clubname',
        reverse: false 
    })
})
      

function showInfo(data, tabletop) {

        var cat = '';
        var cat_li = '';
        var list_li = '';
        var content_li = '';
        var nav_li = '';
        var navlist_li = '';

        var i = 4;

        /*
        $("#table_info").text("We found the tables " + tabletop.model_names.join(", "));

        $.each( tabletop.sheets(), function(i, sheet) {
        $("#table_info").append("<p>" + sheet.name + " has " + sheet.column_names.join(", ") + "</p>");
        });
        */

       $.each( tabletop.sheets("clubs").all(), function(i, clubs) {

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

        $.each( tabletop.sheets("clubs").all(), function(i, clubs) {

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


function titleCase(str){
   str = str.toLowerCase().split(' ');
   let final = [];

    for(let  word of str){
      final.push(word.charAt(0).toUpperCase()+ word.slice(1));
    }

  return final.join(' ')
}
