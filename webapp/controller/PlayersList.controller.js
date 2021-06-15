sap.ui.define([
	"mbis/Blackpool/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	"mbis/Blackpool/model/formatter",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/core/Fragment"
], function(BaseController, JSONModel, formatter, Filter, FilterOperator, Fragment) {
	"use strict";

	return BaseController.extend("mbis.Blackpool.controller.PlayersList", {

		formatter: formatter,

		onInit: function() {
			var oViewModel = new JSONModel({
				currency: "EUR"
			});
			this.getView().setModel(oViewModel, "view");

			this.getView().setModel(new JSONModel(sap.ui.require.toUrl("mbis/Blackpool/model/Players.json")));
			this.getView().setModel(new JSONModel(sap.ui.require.toUrl("mbis/Blackpool/model/form.json")), "form");

			// if(!this.oStorage.getData("myLocalData").Players){
			// 	this.oStorage.put("myLocalData", new JSONModel(sap.ui.require.toUrl("mbis/Blackpool/model/Players.json")).getData());
			// }

			// this.newRecord = {
			// 	Name: "",
			// 	Surname: "",
			// 	BirthDate: "",
			// 	Country: "",
			// 	MarketValue: "",
			// 	Position: ""
			// };

			// this._oTable = this.byId("teamTable");
			// this._oTable.setModel(new JSONModel(oModel));
		},

		onFilterPlayers: function(oEvent) {

			// build filter array
			var aFilter = [];
			var sQuery = oEvent.getParameter("query");
			if (sQuery) {
				aFilter.push(new Filter("Name", FilterOperator.Contains, sQuery));
			}

			// filter binding
			var oTable = this.byId("teamTable");
			var oBinding = oTable.getBinding("items");
			oBinding.filter(aFilter);
		},

		onOpenAdd: function() {

			this.getView().getModel("form").setData({
				Image: "",
				Name: "",
				Surname: "",
				BirthDate: "",
				Country: "",
				MarketValue: "",
				Position: ""
			});

			var oView = this.getView();
			var oDialog = oView.byId("addDialog");
			// create dialog lazily
			if (!oDialog) {
				// create dialog via fragment factory
				oDialog = sap.ui.xmlfragment(oView.getId(), "mbis.Blackpool.fragments.AddDialog", this);
				oView.addDependent(oDialog);
			}

			oDialog.open();
		},

		onCloseDialog: function() {
			this.getView().byId("addDialog").close();
		},

		onDelete: function() {

			var oTable = this.getView().byId("teamTable");
			var aData = oTable.getModel().getData().Players;
			var aSelectedPlayers = this.getView().byId("teamTable").getSelectedItems();

			for (var sPlayer = 0; sPlayer < aSelectedPlayers.length; sPlayer++) {
				var vId = aSelectedPlayers[sPlayer].getBindingContext("player").getProperty("Id");
				var indexSelectedPlayer = aData.map(function(x) {
					return x.Id;
				}).indexOf(vId);
				aData.splice(indexSelectedPlayer, 1);
			}
			this.getView().getModel().setData({
				Players: aData
			});

			// Reset table selection in UI5
			oTable.removeSelections(true);
			oTable.getModel().refresh(true);
			this.getView().setModel(this.getView().getModel(), "player");

			// var oTable2 = this.getView().byId("teamTable");
			// this.oModel2 = oTable2.getModel();
			// var data = this.oModel2.getData();
			// var aRows;
			// if (data.Players) {
			// 	aRows = data.Players;
			// } else {
			// 	aRows = data.data;
			// }

			// aRows.sort(function(a, b) {
			// 	var x = a.Position.toLowerCase();
			// 	var y = b.Position.toLowerCase();
			// 	if (x < y) {
			// 		return -1;
			// 	}
			// 	if (x > y) {
			// 		return 1;
			// 	}
			// 	return 0;
			// });

			// var aContexts = oTable2.getSelectedContexts();

			// for (var i = aContexts.length - 1; i >= 0; i--) {
			// 	var oThisObj = aContexts[i].getObject();

			// 	var index = $.map(aRows, function(obj, index) {
			// 		if (obj == oThisObj) {
			// 			return index;
			// 		}
			// 	});

			// 	// The splice() method adds/removes items to/from an array
			// 	// Here we are deleting the selected index row
			// 	// https://www.w3schools.com/jsref/jsref_splice.asp

			// 	aRows.splice(index, 1);
			// }

			// this.oModel2.setData({
			// 	Players: aRows
			// });

			// Reset table selection in UI5
			// oTable2.removeSelections(true);
			// this.oModel2.refresh(true);
			// this.getView().setModel(this.oModel2, "player");
		},

		onSave: function() {

			// var oTable = this.getView().byId("teamTable");
			// var oModel = oTable.getModel();
			// var oTableData = oModel.getData();
			// delete oTableData.Players;
			// oTableData.Players.push(oTableData);

			// var oTable = this.getView().byId("teamTable");
			// var oModel = oTable.getModel();
			// var oTableData = oModel.getData();

			var oFormModel = this.getView().getModel("form");
			var oFormData = oFormModel.getData();
			var newId = this.getView().getModel().getData().Players.length + 1;

			this.newRecord = {
				Players: [{
					Id: newId,
					Image: oFormData.Image,
					Name: oFormData.Name,
					Surname: oFormData.Surname,
					BirthDate: oFormData.BirthDate,
					Country: oFormData.Country,
					MarketValue: oFormData.MarketValue,
					Position: oFormData.Position
				}]
			};

			// var playersString = "Players";
			// delete oFormData.Name;
			// delete oFormData.Surname;
			// delete oFormData.BirthDate;
			// delete oFormData.Country;
			// delete oFormData.MarketValue;
			// delete oFormData.Position;
			// var withoutPlayers = oTableData.filter(function(x) { return x !== playersString; });

			this.oModel = this.getView().getModel();
			this.oModel.getData().Players.push(this.newRecord.Players);
			this.getView().setModel(this.oModel, "player");

			// var sessionData = {

			// };

			// //Get Storage object to use
			// this.oStorage = jQuery.sap.storage(jQuery.sap.storage.Type.local);
			// //Get data from Storage
			// this.oStorage.get("myLocalData");
			// //Set data into Storage
			// this.oStorage.put("myLocalData", this.oModel.getData());
			// //Clear Storage
			// oStorage.clear();

			this.oStorage = jQuery.sap.storage(jQuery.sap.storage.Type.local);
			this.oStorage.get("players");
			this.oStorage.put("players", this.newRecord);


			this.getView().byId("teamTable").getModel().refresh(true);

			this.newRecord = {
				Players: [{
					Id: "",
					Image: "",
					Name: "",
					Surname: "",
					BirthDate: "",
					Country: "",
					MarketValue: "",
					Position: ""
				}]
			};

			this.getView().byId("addDialog").close();

		},

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf mbis.Blackpool.view.PlayersList
		 */
		//	onInit: function() {
		//
		//	},

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf mbis.Blackpool.view.PlayersList
		 */
		onBeforeRendering: function() {

		}

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf mbis.Blackpool.view.PlayersList
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf mbis.Blackpool.view.PlayersList
		 */
		//	onExit: function() {
		//
		//	}

	});

});