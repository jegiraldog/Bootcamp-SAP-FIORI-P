sap.ui.define([
    "sap/ui/core/mvc/Controller",
    'sap/ui/model/Filter',
    'sap/ui/model/FilterOperator'       
],
function (Controller, Filter, FilterOperator) {
    "use strict";

    return Controller.extend("com.bootcamp.sapui5.smarcontrols.controller.Home", {
        onInit: function () {

        },

        onBeforeRebind: function(oEvent){
            let oParameters = oEvent.getParameter("bindingParams");
            oParameters.filters.push(new Filter("IsActiveEntity", FilterOperator.EQ, true));
        }

    });
});
