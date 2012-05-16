describe("SearchResultsView", function() {
    
    beforeEach(function() {
	this.view = solrApp.appView;
    });
    
    afterEach(function() {
	$('#search-result-table').remove();	
    });
    
    describe("Instantiation", function() {
	it("should find a table in the dom", function() {
	    expect(this.view.el.nodeName).toEqual("TABLE");
	});	
    });
 
    describe("Adding results", function() {
	beforeEach(function() {
	    this.resultView = new solrApp.TestResultView();
	    
	    //this.resultView.render = function() {
	//	this.el = document.createElement('tr');
	//	return this;
	  //  };

	  //  this.resultRenderSpy = sinon.spy(this.resultView, "render");

	    // BRAKING INTO THE MODULE!!!!
	    //this.resultViewStub = sinon.stub(window, "TestResultView")
	//	.returns(this.resultView);

	    this.appViewSpy = sinon.spy(this.view, "addOne");

	    this.test1 = new Backbone.Model({name:"Test Name", count: 0});
	    this.test2 = new Backbone.Model({name:"Test Name 2", count: 2});
	    this.test3 = new Backbone.Model({name:"Test Name 3", count: 3});
	    solrApp.init([
		this.test1,
		this.test2,
		this.test3
            ]);
	});
	
	
	afterEach(function() {
	    $(this.view.el).find("tbody").empty();
	    this.appViewSpy.restore();
	});

	it("adds each testcase to the appview", function() {
	    expect(this.appViewSpy).toHaveBeenCalledThrice();
	    expect(this.appViewSpy).toHaveBeenCalledWith(this.test1);
	    expect(this.appViewSpy).toHaveBeenCalledWith(this.test2);
	    expect(this.appViewSpy).toHaveBeenCalledWith(this.test3);
	});
	/*
	it("creates a test result view for each test result", function() {
	    expect(this.resultViewStub).toHaveBeenCalledThrice();
	    expect(this.resultViewStub).toHaveBeenCalledWith({model:this.test1});
	    expect(this.resultViewStub).toHaveBeenCalledWith({model:this.test2});
	    expect(this.resultViewStub).toHaveBeenCalledWith({model:this.test3});
	});
	
	it("renders each result view", function() {
	    expect(this.resultRenderSpy).toHaveBeenCalledThrice();
	});
	*/
	it("appends the test result to the test results view", function() {
	    expect($(this.view.el).find("tr").length).toEqual(3);
	});
	
    });

});