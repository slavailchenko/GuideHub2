(function(){
    'use strict'
    app.controller('Europe', [ '$scope', '$location', function($scope, $location){   
       $scope.class = {
        rus: 'rus', 
        ukr: 'ukr',
        bel: 'bel',
        est: 'est',
        lat: 'lat',
        lit: 'lit',
        pol: 'pol',
        mol: 'mol',
        roma: 'roma',
        bulg: 'bulg',
        serb: 'serb',
        gre: 'gre',
        maked: 'maked',
        slovak: 'slovak',
        hung: 'hung',
        cze: 'cze',
        aust: 'aust',
        slowenia: 'slowenia',
        croat: 'croat',
        BandG: 'BandG',
        monte: 'monte',
        alb: 'alb',
        swiss: 'swiss',
        germ: 'germ',
        nether: 'nether',
        belg: 'belg',
        lux: 'lux',
        ital: 'ital',
        fran: 'fran',
        spain: 'spain',
        port: 'port',
        turck: 'turck',
        fin: 'fin',
        sveden: 'sveden',
        norway: 'norway',
        UK: 'UK',
        irland: 'irland'
       }; 
        $scope.showCountry = function(country){
            $scope.class = {
                rus: 'rus_cl', 
                ukr: 'ukr_cl',
                bel: 'bel_cl',
                est: 'est_cl',
                lat: 'lat_cl',
                lit: 'lit_cl',
                pol: 'pol_cl',
                mol: 'mol_cl',
                roma: 'roma_cl',
                bulg: 'bulg_cl',
                serb: 'serb_cl',
                gre: 'gre_cl',
                maked: 'maked_cl',
                slovak: 'slovak_cl',
                hung: 'hung_cl',
                cze: 'cze_cl',
                aust: 'aust_cl',
                slowenia: 'slowenia_cl',
                croat: 'croat_cl',
                BandG: 'BandG_cl',
                monte: 'monte_cl',
                alb: 'alb_cl',
                swiss: 'swiss_cl',
                germ: 'germ_cl',
                nether: 'nether_cl',
                belg: 'belg_cl',
                lux: 'lux_cl',
                ital: 'ital_cl',
                fran: 'fran_cl',
                spain: 'spain_cl',
                port: 'port_cl',
                turck: 'turck_cl',
                fin: 'fin_cl',
                sveden: 'sveden_cl',
                norway: 'norway_cl',
                UK: 'UK_cl',
                irland: 'irland_cl'
               }
            setTimeout(function(){         
                $scope.$apply($location.path($location.path() + '/' + country))
            }, 2000)

        }
     }])
})()