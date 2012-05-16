// Jquery load
SolrApp = function(renderViewConf) {
    var SolrApp = {};

    var defaultRenderViewConf = {   
	row_template: $("<td></td>"),
	search_result_table: $("<table><tbody></tbody></table>")
    };
    // To be able to reference search_result_table
    defaultRenderViewConf.search_results = $(defaultRenderViewConf.search_result_table).find("tbody")
    
    var renderViews = _.extend(defaultRenderViewConf, renderViewConf || {});

    var TestResult = Backbone.Model.extend({
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
	tagName: "tr", // HATE dom in code: this NEEDS to be done better. Also makes template incomplete

	render: function() {
	    // This is weird, why cant I have all HTML in the template?, see above
	    this.$el.html(this.template(this.model.toJSON()));
	    return this;
	}
    });
    
    var AppView = Backbone.View.extend({
	el: renderViews.search_result_table,
	
	addOne: function(testResult) {
	    // Mamma mia, open for injection attacks. Here so that tests can stub
	    var view = new SolrApp.TestResultView({model: testResult});
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
    SolrApp.init = function(newTestResults) {
	testResults.reset(newTestResults);
    }
    // UGGGLY. For test stubbing
    SolrApp.TestResultView = TestResultView;
    
    return SolrApp;
};
//.call(this);