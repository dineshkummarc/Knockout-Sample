var viewModel = {
  currentPage: ko.observable('index'),
  gists: ko.observableArray(),
  gist: { attributes: ko.observable({}) },
};

viewModel.gist.desc = ko.dependentObservable(function() {
  return this.attributes().description || 'Gist #' + this.attributes().id;
}, viewModel.gist);

function fetchGists() {
  $.ajax({
    url: 'https://api.github.com/gists',
    success: function(data) {
      viewModel.gists(data.map(function(gist) {
        gist.description = gist.description || 'Gist #' + gist.id;
        return gist;
      }));
    },
  });
}

function fetchGist(id) {
  $.ajax({
    url: 'https://api.github.com/gists/' + id,
    success: function(data) {
      data.files = $.map(data.files, function(value) { return value });
      viewModel.gist.attributes(data);
      viewModel.gist.attrs = data;
      ko.applyBindings(viewModel, $('#content > div')[0]);
    },
  });
}

function showIndex() {
  viewModel.currentPage('index');
}

function showGist(id) {
  viewModel.gist.attributes({});
  viewModel.currentPage('gist');
  fetchGist(id);
}

fetchGists();
setInterval(fetchGists, 60000);

ko.applyBindings(viewModel);
