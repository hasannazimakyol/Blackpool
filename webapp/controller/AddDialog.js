sap.ui.define([
	"sap/ui/base/ManagedObject",
	"sap/ui/core/Fragment"
], function(ManagedObject, Fragment) {
	"use strict";

	return ManagedObject.extend("mbis.Blackpool.controller.AddDialog", {

		constructor: function(oView) {
			this._oView = oView;
			
						// this.data = {
      //          Name: "sefa gürkan",
      //          Position: " "
               
      //      };
			
      //      var oModel = new sap.ui.model.json.JSONModel(this.data);
      //      this.getView().setModel(oModel);
			
		},

		exit: function() {
			delete this._oView;
		},

		open: function() {
			var oView = this._oView;
			
			

			//create dialog
			if (!this.pDialog) {
				var oFragmentController = {
					onCloseDialog: function() {
						oView.byId("addDialog").close();
					},
					onSave: function() {
						
					}
				};
				//load asynchronous XML fragment
				this.pDialog = Fragment.load({
					id: oView.getId(),
					name: "mbis.Blackpool.fragments.AddDialog",
					controller: oFragmentController
				}).then(function(oDialog) {
					//connect dialog to the root view of this component (models, lifecycle)
					oView.addDependent(oDialog);
					return oDialog;
				});
			}
			this.pDialog.then(function(oDialog) {
				oDialog.open();
			});
		},
		
		save: function() {
			

			
			
		}
	});
});