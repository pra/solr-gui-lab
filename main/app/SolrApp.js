// Jquery load
SolrApp = function(renderViewConf) {
    var root = this;

    var SolrApp = root.SolrApp = {};


    var defaultRenderViewConf = {
	row_template: $("<td></td>"),
	search_result_table: $("<table></table>"),
	search_results: $("<tbody></tbody>")
    };

    var renderViews = _.extend(defaultRenderViewConf, renderViewConf || {});

    var TestResult = Backbone.Model.extend({
	// Default attributes for the todo item.
	defaults: function() {
	    return {
		name: "Test name",
		count: 0
	    };
	}
    });

    var TestResultList = Backbone.Collection.extend({
	model: TestResult,
    });

    var testResults = new TestResultList;
    
    var html = $(renderViews.row_template).html();
    var TestResultView = Backbone.View.extend({
	template: _.template($(renderViews.row_template).html()),
	tagName: "tr", //this NEEDS to

	render: function() {
	    // This is weird, why cant I have all HTML in the template?
	    this.$el.html(this.template(this.model.toJSON()));
	    return this;
	}
    });
    
    var AppView = Backbone.View.extend({
	el: renderViews.search_result_table,
	
	addOne: function(testResult) {
	    var view = new TestResultView({model: testResult});
	    renderViews.search_results.append(view.render().el);
	},
	
	// Add all items in the **Todos** collection at once.
	addAll: function() {
	    testResults.each(this.addOne);
	}
    });
    
    var app = new AppView;

    //Export
    SolrApp.appView = app; 

    // Mock
    testResults.add([
	{name:"Test Name", count: 0},
	{name:"Test Name2", count: 2}
    ]);
    app.addAll();

    
    return SolrApp;
};
//.call(this);