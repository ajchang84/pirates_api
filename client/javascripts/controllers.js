(function(){

  angular
    .module('piratesApp')
    .controller('PiratesController', PiratesController)
    .controller('NewPirateController', NewPirateController)
    .controller('ShowPirateController', ShowPirateController)
    .controller('EditPirateController', EditPirateController)

    function PiratesController(pirates){
      var vm = this;
      vm.pirates = pirates.data
    }

    function NewPirateController(PirateService, $location) {
      var vm = this;
      vm.pirate = {};

      vm.addPirate = function(newPirate) {
        var req = {
          pirate: newPirate
        }
        PirateService.createPirate(req).then(function(res){
          $location.path('/pirates');
        });
      }
    }

    function ShowPirateController(PirateService, $route) {
      var vm = this;
      vm.removePirate = function(id) {
        PirateService.deletePirate(id).then(function(res){
          $route.reload();
        });
      }
    }

    function EditPirateController(PirateService, $location, pirate) {
      var vm = this;
      vm.pirate = pirate.data;
      if (!vm.pirate) $location.path('/pirates');

      vm.editPirate = function(pirate) {
        var req = {
          pirate: pirate
        }
        PirateService.updatePirate(req).then(function(res){
          $location.path('/pirates');
        });
      }
    }

    PiratesController.$inject = ['pirates']
    NewPirateController.$inject = ['PirateService','$location']
    ShowPirateController.$inject = ['PirateService','$route']
    EditPirateController.$inject = ['PirateService','$location','pirate']


})()