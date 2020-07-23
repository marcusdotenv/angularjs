angular.module("listaBomba").controller("listaBombaController", function ($scope, $http) {
    $scope.coef;
    $scope.app = "Cadastro de Bomba";
    $scope.bombas = [];

    var carregarBomba = function () {
        $http.get("http://localhost:9595/api/bombas").then(sucessGET, errorGET)
    };
    function sucessGET(response) {
        $scope.bombas = response.data._embedded.bombas
    }
    function errorGET(error) {
        console.log(error)
    }
    $scope.adicionarBomba = function (bomba) {
        $http.post("http://localhost:9595/api/bombas", bomba).then(sucessPOST, errorPOST)
        delete $scope.bomba;
    };
    function sucessPOST(response) {
        carregarBomba();
        delete $scope.bomba;
    }
    function errorPOST(error) {
        console.log(error)
    }
    $scope.atualizarBombas = function (bombas, bomba) {
        $scope.bombas = bombas.filter(function (bomba2) {
            if (bomba2.selecionado) {
                $http.put(bomba2._links.bomba.href, bomba).then(sucessPOST, errorPOST)
                carregarBomba();
            }

        });
    };
    $scope.apagarBombas = function (bombas) {
        let arrayDelete = [];
        $scope.bombas = bombas.filter(function (bomba) {
            if (bomba.selecionado) {
                arrayDelete = [...arrayDelete, bomba]
                arrayDelete.map(bomba2 => {
                    $http.delete(bomba2._links.bomba.href).then(sucessPOST, errorPOST)
                })
                carregarBomba();
            };
        });
    };
    $scope.isBombaSelecionado = function (bombas) {
        return bombas.some(function (bomba) {
            return bomba.selecionado;
        });
    };
    $scope.passarBomba = function (bomba) {
        $scope.coef = bomba;
    }
    $scope.ordenarPor = function(campo){
        $scope.criterioDeOrdenacao = campo;
        $scope.direcaoDaOrdenacao = !$scope.direcaoDaOrdenacao;
    };
    carregarBomba();
});