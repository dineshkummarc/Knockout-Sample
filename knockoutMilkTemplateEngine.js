ko.mustacheTemplateEngine = function() {
    this['renderTemplate'] = function(templateId, data, options) {
        var template = $('#' + templateId).text();
        var html = Milk.render(template, data);
        if (html.charAt(0) != '<') html = '<div>' + html + '</div>';
        return $(html);
    };

    this['isTemplateRewritten'] = function(templateId) { return true };
};

ko.mustacheTemplateEngine.prototype = new ko.templateEngine();
ko.setTemplateEngine(new ko.mustacheTemplateEngine());
