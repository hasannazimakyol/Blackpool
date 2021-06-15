
        },
        onDelete: function() {

 

            var oTable2 = this.getView().byId("idPlayersTable");
            this.oModel2 = oTable2.getModel();
            var data = this.oModel2.getData();
            var aRows;
            if (data.Players) {
                aRows = data.Players;
            } else {
                aRows = data.data;
            }
            var aData = this.getView().byId("idPlayersTable").getModel("players").getData().Players;
            var aSelectedPlayers = this.getView().byId("idPlayersTable").getSelectedItems();
            for (var sqPlayer = 0; sqPlayer < aSelectedPlayers.length; sqPlayer++) {
                var vId = aSelectedPlayers[sqPlayer].getBindingContext("players").getProperty("Id");
                var indexSelectedPlayer = aData.map(function(x) {
                    return x.Id;
                }).indexOf(vId);
                aData.splice(indexSelectedPlayer, 1);

 

            }
            this.oModel2.setData({
                Players: aData
            });

 

            // Reset table selection in UI5
            oTable2.removeSelections(true);
            this.oModel2.refresh(true);
            this.getView().setModel(this.oModel2, "players");

 

            /*    aRows.sort(function(a, b) {
                    var x = a.Position.toLowerCase();
                    var y = b.Position.toLowerCase();
                    if (x < y) {
                        return -1;
                    }
                    if (x > y) {
                        return 1;
                    }
                    return 0;
                });*/

 

            // var aContexts = oTable2.getSelectedContexts();

 

            // for (var i = aContexts.length - 1; i >= 0; i--) {
            //     var oThisObj = aContexts[i].getObject();

 

            //     // oTable2.getSelectedIndex();
            //     // var oTable2 = oEvent.getSource().getParent().getParent();

 

            //     var index = $.map(aRows, function(obj, index) {
            //         if (obj === oThisObj) {
            //             return index;
            //         }
            //     });

 

            //     // The splice() method adds/removes items to/from an array
            //     // Here we are deleting the selected index row
            //     // https://www.w3schools.com/jsref/jsref_splice.asp

 

            //     aRows.splice(index, 1);
            // }

 

            // this.oModel2.setData({
            //     Players: aRows
            // });

 

            // // Reset table selection in UI5
            // oTable2.removeSelections(true);
            // this.oModel2.refresh(true);
            // this.getView().setModel(this.oModel2, "players");

 

        },










