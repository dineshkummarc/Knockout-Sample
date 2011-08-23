var gists = ko.observableArray();

var updateGists = function() {
  $.ajax({
    url: 'https://api.github.com/gists',
    success: function(data) {
      gists(data.map(function(gist) {
        gist.description = gist.description || 'Gist #' + gist.id;
        return gist;
      }));
    },
  });
};

updateGists();
ko.applyBindings({ gists: gists }, $('#content ul')[0]);
