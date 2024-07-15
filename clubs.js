var clubs_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR4VY_mJjSYwTf7n1xBWtsqvo3x4RIXErc4fhel4TRyEcAtG78pfsAfrLWTrXXTzigUJvT7nDUDWg0E/pubhtml';
var teams_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQE9OKbCoSfPuNGoCPiKzoMwlZHKt7T5fWDPDxfGVSOJkPpjVl7pPvTNh34TBDbe2h0MX7SVRpJvg5X/pubhtml';

function init() {
  Papa.parse(clubs_spreadsheet_url, {
    download: true,
    header: true,
    complete: function (clubsResults) {
      Papa.parse(teams_spreadsheet_url, {
        download: true,
        header: true,
        complete: function (teamsResults) {
          showInfo(clubsResults, teamsResults);
        }
      });
    }
  });
}

window.addEventListener('DOMContentLoaded', init);

function showInfo(clubsResults, teamsResults) {
  var clubsData = clubsResults.data;
  var teamsData = teamsResults.data;

  var $nav = $('#nav');
  var $clubs = $('#clubs');

  var cat = '';
  var content_li = '';

  $.each(clubsData, function (i, club) {
    if (club['Name Of Club'] !== 'Name Of Club') {
      var nav_li = $('<div></div>');
      var navlist_li = '';

      if (club['Visible'].toLowerCase() === 'show') {
        navlist_li = '<a href="#ref' + club['Name Of Club'].replace(/\s/g, '-').toLowerCase() + '" class="nav-link">' + club['Name Of Club'] + '</a>';
        nav_li.append('<li class="list-group-item p-0">' + navlist_li + '</li>');
        nav_li.appendTo($nav);
      }

      if (cat !== club['Name Of Club']) {
        var cat_li = '<br><div class="list-group-item list-group-item-action active" id="ref' + club['Name Of Club'].replace(/\s/g, '-').toLowerCase() + '">' +
          '<div class="d-flex w-100 justify-content-between">' +
          '<h1>' + club['Name Of Club'] + '</h1>' +
          '</div>' +
          '</div>';
        content_li += cat_li;
      }

      content_li += '<strong>Club Secretary:</strong> ' + club['First Name'] + ' ' + club['Surname'] + '<br>';
      if (club['Visible'].toLowerCase() === 'show') {
        if (club['Mobile']) {
          content_li += '<strong>Tel:</strong> <a href="tel:' + club['Mobile'].replace(/\s/g, '') + '">' + club['Mobile'] + '</a><br>';
        }
        if (club['Email']) {
          content_li += '<strong>Email:</strong> <a href="mailto:' + club['Email'] + '">' + club['Email'] + '</a><br>';
        }
      }

      // Add teams for this club
      content_li += '<h3>Teams</h3>';
      var teamsList = teamsData.filter(team => team['Club Name'] === club['Name Of Club']);
      if (teamsList.length > 0) {
        content_li += '<ul>';
        teamsList.forEach(team => {
          content_li += '<li>' + team['Name Of Team'] + ' (' + team['Age Group in which team will participate this season'] + ')</li>';
        });
        content_li += '</ul>';
      } else {
        content_li += '<p>No teams available</p>';
      }

      var list_li = $('<div></div>');
      list_li.append('<div class="list-group-item list-group-item-action"><div class="d-flex w-100 justify-content-between"><h5 class="mb-1">' + club['Name Of Club'] + '</h5></div>' + content_li + '</div>');
      list_li.prepend(cat_li);
      list_li.appendTo($clubs);

      cat = club['Name Of Club'];
      content_li = '';
    }
  });
}

function titleCase(str) {
  return str.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}
