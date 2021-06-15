sap.ui.define([
	"mbis/Blackpool/controller/BaseController",
	"sap/ui/model/json/JSONModel"
], function(BaseController, JSONModel) {
	"use strict";

	return BaseController.extend("mbis.Blackpool.controller.Header", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf mbis.Blackpool.view.Header
		 */
		onInit: function() {

			var oData = {
				team: {
					name: "Blackpool",
					country: "England",
					league: "EFL League One",
					foundationYear: "1887",
					imageUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/d/df/Blackpool_FC_logo.svg/1200px-Blackpool_FC_logo.svg.png"
				}
			};
			var oModel = new JSONModel(oData);
			this.getView().setModel(oModel);
		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf mbis.Blackpool.view.Header
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf mbis.Blackpool.view.Header
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf mbis.Blackpool.view.Header
		 */
		//	onExit: function() {
		//
		//	}

	});

});