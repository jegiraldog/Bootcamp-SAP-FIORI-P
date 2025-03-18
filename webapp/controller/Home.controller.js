sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "com/bootcamp/sapui5/freestyle/utils/HomeHelper",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/Filter"

], (Controller, HomeHelper, FilterOperator, Filter) => {
    "use strict";

    return Controller.extend("com.bootcamp.sapui5.freestyle.controller.Home", {
        onInit() {
            this.oRouter = this.getOwnerComponent().getRouter();

            //this.onSearch([]);
        },

        onPress: async function (oEvent) {
            let oFilter = [];
            let sValue = this.byId("idLabel1").getValue();

            if(sValue){
                oFilter = new Filter("ProductName", FilterOperator.Contains, sValue)
            }           
            
            this.onSearch(oFilter)
        },

        onSearch: async function(oFilter){
            let oDatos = await HomeHelper.getDataProducts([oFilter]);
            await HomeHelper.setProductModel(this, oDatos[0].results);            
        },

        onItemPress: function (oEvent) {
            let oSource = oEvent.getSource();

            let aDatos = oSource.getBindingContext().getObject();

            this.oRouter.navTo("detail", {
                ProductID: aDatos.ProductID
            });

        },

        onChange: async function (oEvent) {
            let oFilter = [];
            let oSource = oEvent.getSource();
            let oTable = this.getView().byId("idProductsTable");
            let oBinding = oTable.getBinding("items");

            if (oSource.getValue()) {
                oFilter = new Filter("ProductName", FilterOperator.Contains, oSource.getValue());
            }

            oBinding.filter(oFilter);
        }

    });
});