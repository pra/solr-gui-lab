// Jquery load
SolrApp = function(renderViewConf) {
    var SolrApp = {};

    var defaultRenderViewConf = {   
	row_template: $("<td></td>"),
	search_result_table: $("<table><tbody></tbody></table>")
    };
    defaultRenderViewConf.search_results = $(defaultRenderViewConf.search_result_table).find("tbody")
    
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
	
	addAll: function(testResults) {
	    testResults.each(this.addOne);
	}
    });

    
    var testResults = new TestResultList;
    var app = new AppView;
    testResults.bind("add", app.addAll, app);
    testResults.bind("reset", app.addAll, app);

    //Export
    SolrApp.appView = app;
    // UGGGLY
    SolrApp.TestResultView = TestResultView; 
    SolrApp.init = function(newTestResults) {
	testResults.reset(newTestResults);
    }
    //SolrApp.
    
    return SolrApp;
};
//.call(this);