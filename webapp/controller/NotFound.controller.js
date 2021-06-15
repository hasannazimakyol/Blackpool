sap.ui.define([
		"mbis/Blackpool/controller/BaseController"
	], function (BaseController) {
		"use strict";

		return BaseController.extend("mbis.Blackpool.controller.NotFound", {

			/**
			 * Navigates to the worklist when the link is pressed
			 * @public
			 */
			onLinkPressed : function () {
				this.getRouter().navTo("worklist");
			}

		});

	}
);