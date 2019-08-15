$(document).ready( function() {


    // add var "code"
    var code = '1Bu7pPIs72_I6ortPv-3APqOuSL3d4A8fRXOHyrnDdMY';

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

    // add var "code"
    var code = '1hWUOoG_-EpOk0Nay3VBHzG-yJiwkRaLEl2OJLmDsXP0';

    // loop through spreadsheet with Tabletop
    Tabletop.init({ 
        key: code,
        callback: showClubs,
        wanted: [ "clubs" ],
        debug: true ,
        simpleSheet: true,
        orderby: 'clubname',
        reverse: false 
    })

})

function showClubs(data, tabletop) {

    var nav_li = '';
    var navlist_li = '';

    $.each( tabletop.sheets("clubs").all(), function(i, clubs) {

        nav_li = $('<div></div>');

        if (clubs.clubname != 'Name of Club' || clubs.clubname != ''){
            navlist_li = '<a href="#ref-'+ clubs.clubname.replace(/\s/g,'-').toLowerCase() +'" class="nav-link">'+ clubs.clubname +'</a>'; 
        }

        if (clubs.visible.toLowerCase() === "show"){ 
            nav_li.append('<li class="list-group-item p-0">'+ navlist_li + '</li>');
        }    
        //Combine content
        nav_li.appendTo("#nav");

        navlist_li = '';

    });
}

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
                    
                    //if (clubs.visible.toLowerCase() === "show"){ 
                    
                        cat_li = '<br><div class="list-group-item list-group-item-action active" id="ref-'+ clubs.clubname.replace(/\s/g,'-').toLowerCase() +'">'+
                        '<div class="d-flex w-100 justify-content-between">'+
                                '<h1>' + clubs.clubname +'</h1>' +
                            '</div>' +
                        '</div>';
                    //}
                }
            

                
                /*
                if (map.description != ''){
                    content_li ='<p class="mb-1">' +map.agegroupinwhichteamwillparticipatethisseason.replace(/\n/g, "<br />") + '</p>';
                }
                */
                
                content_li = content_li = "<ul><li>";
                
                //Team Name
                if (clubs.teamname != ''){   
                    cat_team = ' - ' + clubs.teamname;
                }
                
                content_li = content_li  + "<strong>Team:</strong> ";
                content_li = content_li  + clubs.clubname + "-" + cat_team;
                
                content_li = content_li  + '</li>';
                content_li = content_li  + '<li>';
                
                //Kit Details
                content_li = content_li  + "<strong>Colours:</strong> ";
                
                if (clubs.hometop != ''){
                    content_li = content_li  + ''+ clubs.hometop;
                }
                if (clubs.homeshorts != ''){
                    content_li = content_li  + ' / '+ clubs.homeshorts;
                }
                /*
                if (clubs.homesocks != ''){
                    content_li = content_li  + '  / '+ clubs.homesocks;
                }
                */

                content_li = content_li  + '</li>';
                content_li = content_li  + '<li>';
                
                
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
                
                content_li = content_li  + '</li></ul>';
                content_li = content_li  + '<ul><li>';

                //Manager Details
                content_li = content_li +'<strong>Manager:</strong> ';
                
                 if (clubs.firstname != ''){
                    content_li = content_li  + clubs.firstname + ' '+ clubs.lastname + '<br>';
                }

                // only show ticked items
                if (clubs.visible.toLowerCase() === "show"){
                    if (clubs.phone != ''){
                        content_li = content_li  + '<li>';
                        content_li = content_li +'<strong>Tel:</strong> <a href="tel:'+clubs.phone.replace(" ", "")+'">' + clubs.phone + '</a><br>';
                        content_li = content_li  + '</li>';
                    }
                    if (clubs.email != ''){
                        content_li = content_li  + '<li>';
                        content_li = content_li +'<strong>Email:</strong> <a href="mailto:'+clubs.email+'">' + clubs.email + '</a><br>';
                        content_li = content_li  + '</li>';
                    }
                }

                

                content_li = content_li  + '</ul>';

               

                //Combine content
                list_li.append('<div class="list-group-item list-group-item-action">'+ '<div  class="d-flex w-100 justify-content-between">'+ '<h5 class="mb-1">' + clubs.clubname + cat_team +' <span class="badge badge-secondary">' + clubs.age + '</span></h5></div>'+ content_li + '</div>');
                
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
