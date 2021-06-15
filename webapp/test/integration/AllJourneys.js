/*global QUnit*/

jQuery.sap.require("sap.ui.qunit.qunit-css");
jQuery.sap.require("sap.ui.thirdparty.qunit");
jQuery.sap.require("sap.ui.qunit.qunit-junit");
QUnit.config.autostart = false;

sap.ui.require([
	"sap/ui/test/Opa5",
	"mbis/Blackpool/test/integration/pages/Common",
	"sap/ui/test/opaQunit",
	"mbis/Blackpool/test/integration/pages/Worklist",
	"mbis/Blackpool/test/integration/pages/Object",
	"mbis/Blackpool/test/integration/pages/NotFound",
	"mbis/Blackpool/test/integration/pages/Browser",
	"mbis/Blackpool/test/integration/pages/App"
], function (Opa5, Common) {
	"use strict";
	Opa5.extendConfig({
		arrangements: new Common(),
		viewNamespace: "mbis.Blackpool.view."
	});

	sap.ui.require([
		"mbis/Blackpool/test/integration/WorklistJourney",
		"mbis/Blackpool/test/integration/ObjectJourney",
		"mbis/Blackpool/test/integration/NavigationJourney",
		"mbis/Blackpool/test/integration/NotFoundJourney"
	], function () {
		QUnit.start();
	});
});