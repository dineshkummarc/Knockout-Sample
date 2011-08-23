ko.mustacheTemplateEngine = function() {
  var templates = {};
  this['isTemplateRewritten'] = function(templateId) { return false };

  this['rewriteTemplate'] = function(templateId, func) {
    var template = $('#' + templateId);
    templates[templateId] = func(template.text());
  };

  this['createJavaScriptEvaluatorBlock'] = function(script) {
    return eval(script);
  };

  this['renderTemplate'] = function(templateId, data, options) {
    var html = Milk.render(templates[templateId], data).replace(/^\s+|\s+$/g, '');
    if (html.charAt(0) != '<') html = '<div>' + html + '</div>';
    return $(html).toArray();
  };
};

ko.mustacheTemplateEngine.prototype = new ko.templateEngine();
ko.setTemplateEngine(new ko.mustacheTemplateEngine());
