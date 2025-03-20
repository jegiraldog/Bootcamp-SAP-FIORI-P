sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "com/bootcamp/sapui5/freestyle/utils/HomeHelper",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/FilterType",
    "sap/ui/model/Filter",
    "com/bootcamp/sapui5/freestyle/model/formatter",

], (Controller, HomeHelper, FilterOperator, FilterType, Filter, formatter) => {
    "use strict";

    return Controller.extend("com.bootcamp.sapui5.freestyle.controller.Home", {

        formatter: formatter,

        onInit() {
            this.oRouter = this.getOwnerComponent().getRouter();
            //this.onSearch([]);
        },

        onPress: async function (oEvent) {
            let oFilter = [];
            //let sValue = this.byId("idLabel1").getValue();
            //let sValueCombo = this.byId("comboboxID").getSelectedKey();

            let oTable = this.getView().byId("idProductsTable");
            let oBinding = oTable.getBinding("items");

            let values = this.getOwnerComponent().getModel("LocalDataModel").getData();

            if(values.valueInput){
                oFilter.push(new Filter("ProductName", FilterOperator.Contains, values.valueInput));
            }      
            
            if(values.selectedKey){
                oFilter.push(new Filter("CategoryID", FilterOperator.EQ, values.selectedKey));
            }          

            if(values.selectedKeyMulti.length > 0){

                values.selectedKeyMulti.forEach(element => {
                    oFilter.push(new Filter("CategoryID", FilterOperator.EQ, element)); 
                });

            }
            
            //En esta parte Se debe leer modelo local donde han almacenado los token
            // if(values.selectedItem){
            //     oFilter.push(new Filter("SupplierID", FilterOperator.EQ, values.selectedItem));
            // }                     
           
            oBinding.filter(oFilter);
            //this.onSearch(oFilter)
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

        onSelectionChange: async function (oEvent) {

            // let oFilter = [];
            // let oSource = oEvent.getSource();
            // let oTable = this.getView().byId("idProductsTable")
            // let oBinding = oTable.getBinding("items");

            // if(oSource.getSelectedKey()){
            //     oFilter = new Filter("CategoryID", FilterOperator.EQ, oSource.getSelectedKey());               
            // } 
            // oBinding.filter(oFilter);               

        },       

        onChange: async function (oEvent) {
            // let oFilter = [];
            // let oSource = oEvent.getSource();
            // let oTable = this.getView().byId("idProductsTable");
            // let oBinding = oTable.getBinding("items");

            // if (oSource.getValue()) {
            //     oFilter = new Filter("ProductName", FilterOperator.Contains, oSource.getValue());
            // }

            // oBinding.filter(oFilter);
        }


    });
});