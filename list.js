$(document).ready( function() {


    // add var "code"
    //var code = '1wbTu0rLPgSGyo17W-bBAmKZnkNpZ8LPDdWtOz_GLdCo';
    var code = '1Bu7pPIs72_I6ortPv-3APqOuSL3d4A8fRXOHyrnDdMY';

    // loop through spreadsheet with Tabletop
      Tabletop.init({ 
         key: code,
         callback: showInfo,
         wanted: [ "clubs" ],
         debug: true ,
         simpleSheet: true,
         orderby: 'clubname',
         reverse: false } )
      })
        

      function showInfo(data, tabletop) {

        var cat = '';
        var cat_li = '';
        var list_li = '';
        var content_li = '';

        var i = 4;

        /*
        $("#table_info").text("We found the tables " + tabletop.model_names.join(", "));

        $.each( tabletop.sheets(), function(i, sheet) {
        $("#table_info").append("<p>" + sheet.name + " has " + sheet.column_names.join(", ") + "</p>");
        });
        */

        $.each( tabletop.sheets("clubs").all(), function(i, clubs) {

            // Show category
            
            // link to the clubs
            list_li = $('<div></div>');

            

            if (clubs.clubname != 'Club Name'){

            
                if  (cat != clubs.clubname){
                    
                    if (clubs.teamname != ''){   
                        cat_team = ' - ' + titleCase(clubs.teamname);
                    }
                    
                    
                    cat_li = '<br><div class="list-group-item list-group-item-action active" id="ref'+ clubs.clubname +'">'+
                    '<div class="d-flex w-100 justify-content-between">'+
                            '<h1>' + titleCase(clubs.clubname) + cat_team +'</h1>' +
                        '</div>' +
                    '</div>';
                }
            

                
                /*
                if (map.description != ''){
                    content_li ='<p class="mb-1">' +map.agegroupinwhichteamwillparticipatethisseason.replace(/\n/g, "<br />") + '</p>';
                }
                */
                
                //Kit Details
                if (clubs.hometop != ''){
                    content_li = content_li  + '#'+ clubs.hometop;
                }
                if (clubs.homeshorts != ''){
                    content_li = content_li  + ', #'+ clubs.homeshorts;
                }
                if (clubs.homesocks != ''){
                    content_li = content_li  + ', #'+ clubs.homesocks;
                }

                content_li = content_li  + '<br>';
                

                //Manager Details
                content_li = content_li +'<strong>Manager:</strong> ';
                
                if (clubs.firstname != ''){
                    content_li = content_li  + clubs.firstname + ' '+ clubs.lastname + '<br>';
                }

                // only show ticked items
                if (clubs.visible.toLowerCase() === "show"){
                    if (clubs.phone != ''){
                        content_li = content_li +'<strong>Tel:</strong> <a href="tel:'+clubs.phone.replace(" ", "")+'">' + clubs.phone + '</a><br>';
                    }
                    if (clubs.email != ''){
                        content_li = content_li +'<strong>Email:</strong> <a href="mailto:'+clubs.email+'">' + clubs.email + '</a><br>';
                    }
                }

                //Ground Details
                content_li = content_li  + '<strong>Location:</strong>';
                if (clubs.groundname != ''){
                    content_li = content_li  + ' '+ clubs.groundname;
                }
                if (clubs.groundnumber != ''){
                    content_li = content_li  + ', '+ clubs.groundnumber;
                }
                if (clubs.postcode != ''){
                    content_li = content_li  + ', '+ clubs.postcode;
                }

                content_li = content_li  + '<br>';

                //Combine content
                list_li.append('<div class="list-group-item list-group-item-action">'+ '<div  class="d-flex w-100 justify-content-between">'+ '<h5 class="mb-1">' + clubs.clubname + ' <span class="badge badge-secondary">' + clubs.age + '</span></h5></div>'+ content_li + '</div>');
                
                list_li.prepend(cat_li);

                list_li.appendTo("#teams");

                
            }
    
            // Set current category for loop
            cat = clubs.clubname;
            cat_team = '';
            cat_li = '';
            content_li = '';

            
        })
      }


function titleCase(str){
   str = str.toLowerCase().split(' ');
   let final = [];

    for(let  word of str){
      final.push(word.charAt(0).toUpperCase()+ word.slice(1));
    }

  return final.join(' ')
}