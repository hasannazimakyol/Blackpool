sap.ui.define([
	"mbis/Blackpool/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	"mbis/Blackpool/model/formatter",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/core/Fragment",
	"sap/m/MessageToast"
], function(BaseController, JSONModel, formatter, Filter, FilterOperator, Fragment, MessageToast) {
	"use strict";

	return BaseController.extend("mbis.Blackpool.controller.PlayersList", {

		formatter: formatter,

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf mbis.Blackpool.view.PlayersList
		 */
		onInit: function() {

			var oViewModel = new JSONModel({
				currency: "EUR"
			});

			var oPositionModel = new JSONModel({
				Positions: [{
					id: 1,
					name: "1-Goalkeeper"
				}, {
					id: 2,
					name: "2-Defender"
				}, {
					id: 3,
					name: "3-Midfielder"
				}, {
					id: 4,
					name: "4-Forward"
				}]
			});

			this.getView().setModel(oViewModel, "view");
			this.getView().setModel(oPositionModel, "position");

			this.getView().setModel(new JSONModel(sap.ui.require.toUrl("mbis/Blackpool/model/Players.json")));
			this.getView().setModel(new JSONModel(sap.ui.require.toUrl("mbis/Blackpool/model/form.json")), "form");

			this.oStorage = jQuery.sap.storage(jQuery.sap.storage.Type.local); // if you want session log use 'Type.session'
			this.oStorage.get("localData");

			if (this.oStorage.get("localData")) {
				this.getView().setModel(new JSONModel(this.oStorage.get("localData")), "player");
			}

			this.updateIconBar();

		},

		updateIconBar: function() {
			var playersArray = this.getView().getModel("player") ? this.getView().getModel("player").getData().Players : null;
			if (playersArray) {
				var oIconModel = new JSONModel({
					countAll: playersArray.length,
					countGoalkeepers: playersArray.filter((obj) => obj.Position === "1-Goalkeeper").length,
					countDefenders: playersArray.filter((obj) => obj.Position === "2-Defender").length,
					countMidfielders: playersArray.filter((obj) => obj.Position === "3-Midfielder").length,
					countForwards: playersArray.filter((obj) => obj.Position === "4-Forward").length
				});
				this.getView().setModel(oIconModel, "icon");
				this.getView().byId("idIconTabBar").getModel("icon").refresh(true);
			}
		},

		validatePositionValue: function() {

			// this function gets the first textfield
			var namePositionField = this.getView().byId("myComboBox").getSelectedItem() ?
				this.getView().byId("myComboBox").getSelectedItem().getText() : null;
			var isViolation;

			//this function checks its value, you can insert more checks on the value
			if (!namePositionField) {
				isViolation = true;
				MessageToast.show("Please select a position.");
				// alert("Please select a position.");

			} else {
				isViolation = false;
			}
			return isViolation;
		},

		onFilterSelect: function(oEvent) {
			var oBinding = this.byId("teamTable").getBinding("items"),
				sKey = oEvent.getParameter("key"),
				// Array to combine filters
				aFilter = [];

			if (sKey === "1-Goalkeeper") {
				aFilter.push(new Filter("Position", FilterOperator.EQ, sKey));
			} else if (sKey === "2-Defender") {
				aFilter.push(new Filter("Position", FilterOperator.EQ, sKey));
			} else if (sKey === "3-Midfielder") {
				aFilter.push(new Filter("Position", FilterOperator.EQ, sKey));
			} else if (sKey === "4-Forward") {
				aFilter.push(new Filter("Position", FilterOperator.EQ, sKey));
			}

			oBinding.filter(aFilter);
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

			// var oPositionBox = this.getView().byId("myComboBox") || null;

			// if (oPositionBox) {
			// 	oPositionBox.setValue(null);
			// 	if (oPositionBox.getSelectedItem()) {
			// 		oPositionBox.getSelectedItem().setKey(null);
			// 		if (oPositionBox.getSelectedItem().getValue()) {
			// 			oPositionBox.getSelectedItem().setValue(null);
			// 		}
			// 	}
			// }

			// if(this.getView().byId("myComboBox").getSelectedItem()){

			// }

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
			var aData = oTable.getModel("player").getData().Players;
			var aSelectedPlayers = this.getView().byId("teamTable").getSelectedItems();

			for (var sPlayer = 0; sPlayer < aSelectedPlayers.length; sPlayer++) {
				var vId = aSelectedPlayers[sPlayer].getBindingContext("player").getProperty("Id");
				var indexSelectedPlayer = aData.map(function(x) {
					return x.Id;
				}).indexOf(vId);
				aData.splice(indexSelectedPlayer, 1);
			}

			var storageData = {
				Players: aData
			};

			this.getView().getModel("player").setData(storageData);

			this.oStorage.put("localData", storageData);

			// Reset table selection in UI5
			oTable.removeSelections(true);
			oTable.getModel("player").refresh(true);
			this.getView().setModel(this.getView().getModel("player"), "player");

			this.updateIconBar();

		},

		onSave: function() {

			var isVaolation = this.validatePositionValue();
			if (isVaolation) {
				this.onCloseDialog();
				return false;
			}

			var oFormModel = this.getView().getModel("form");
			var oFormData = oFormModel.getData();

			function compare_id(a, b) {
				// a should come before b in the sorted order
				if (a.Id < b.Id) {
					return -1;
					// a should come after b in the sorted order
				} else if (a.Id > b.Id) {
					return 1;
					// a and b are the same
				} else {
					return 0;
				}
			}

			var sortedPlayers = this.getView().getModel("player").getData().Players.sort(compare_id);
			var newId = sortedPlayers[sortedPlayers.length - 1].Id + 1;
			var newPosition = this.getView().byId("myComboBox").getSelectedItem() ?
				this.getView().byId("myComboBox").getSelectedItem().getText() : "Unspecified";

			this.newRecord = {};

			this.newRecord = {
				Id: newId,
				Image: oFormData.Image,
				Name: oFormData.Name,
				Surname: oFormData.Surname,
				BirthDate: oFormData.BirthDate,
				Country: oFormData.Country,
				MarketValue: oFormData.MarketValue,
				Position: newPosition
			};

			var playerModel = this.getView().getModel("player");
			playerModel.getData().Players.push(this.newRecord);
			this.getView().setModel(playerModel, "player");

			this.updateIconBar();

			this.oStorage.put("localData", playerModel.getData());

			this.getView().byId("teamTable").getModel("player").refresh(true);
			this.getView().byId("addDialog").close();

		},

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf mbis.Blackpool.view.PlayersList
		 */
		onBeforeRendering: function() {
			this.updateIconBar();
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