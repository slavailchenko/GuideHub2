(function(){
    'use strict',
    app.controller('Swiss', ['$scope','$location', '$rootScope', function($scope, $location, $rootScope){
        $scope.canton = {
            genf: 'genf',
            wo: 'wo',
            nevshtall: 'nevshtall',
            friburg: 'friburg',
            walle: 'walle',
            bern: 'bern',
            ura: 'ura',
            zoloturn: 'zoloturn',
            basel: 'basel',
            tichino: 'tichino',
            graubunden: 'graubunden',
            sanktGallen: 'sanktGallen',
            aarau: 'aarau',
            turgau: 'turgau',
            zurich: 'zurich',
            luzern: 'luzern',
            obvalden: 'obvalden', 
            nidvalden: 'nidvalden',
            uri: "uri",
            zug: 'zug',
            shwich: 'shwich',
            glarus: 'glarus',
            appencel_aus: 'appencel_aus',
            appencel_ine: 'appencel_ine',
            shavhauzen: 'shavhauzen',
            genf_lake: 'genf_lake',
            nevshtall_lake: 'nevshtall_lake',
            luzern_lake: 'luzern_lake',
            zurich_lake: 'zurich_lake'
        }
        $scope.showArticle = function(city){
            $scope.canton = {
                genf: 'genf_cl',
                wo: 'wo_cl',
                nevshtall: 'nevshtall_cl',
                friburg: 'friburg_cl',
                walle: 'walle_cl',
                bern: 'bern_cl',
                ura: 'ura_cl',
                zoloturn: 'zoloturn_cl',
                basel: 'basel_cl',
                tichino: 'tichino_cl',
                graubunden: 'graubunden_cl',
                sanktGallen: 'sanktGallen_cl',
                aarau: 'aarau_cl',
                turgau: 'turgau_cl',
                zurich: 'zurich_cl',
                luzern: 'luzern_cl',
                obvalden: 'obvalden_cl', 
                nidvalden: 'nidvalden_cl',
                uri: "uri_cl",
                zug: 'zug_cl',
                shwich: 'shwich_cl',
                glarus: 'glarus_cl',
                appencel_aus: 'appencel_aus_cl',
                appencel_ine: 'appencel_ine_cl',
                shavhauzen: 'shavhauzen_cl',
                genf_lake: 'genf_lake_cl',
                nevshtall_lake: 'nevshtall_lake_cl',
                luzern_lake: 'luzern_lake_cl',
                zurich_lake: 'zurich_lake_cl'
            }
            $rootScope.path = city
            setTimeout(function(){         
                $scope.$apply($location.path($location.path() + '/' + city))
            }, 2000)
        }
    }])
})()