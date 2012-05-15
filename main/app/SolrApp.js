// Jquery load
$(function() {
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
    
    var TestResultView = Backbone.View.extend({
	template: _.template($('#row-template').html()),
	tagName: "tr",

	render: function() {
	    // This is weird, why cant I have all HTML in the template?
	    this.$el.html(this.template(this.model.toJSON()));
	    return this;
	}
    });
    
    var AppView = Backbone.View.extend({
	el: $("#search-result-table"),
	
	addOne: function(testResult) {
	    var view = new TestResultView({model: testResult});
	    this.$("#search-results").append(view.render().el);
	},
	
	// Add all items in the **Todos** collection at once.
	addAll: function() {
	    testResults.each(this.addOne);
	}
    });
    
    var App = new AppView;
    // Mock
    testResults.add([
	{name:"Test Name", count: 0},
	{name:"Test Name2", count: 2}
    ]);
    App.addAll();
    
});