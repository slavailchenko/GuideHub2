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
        $scope.hover = function(country){
            $scope.showDetails = true;
            let detail = {
                rus: 'Россия', 
                ukr: 'Украина',
                bel: 'Беларуссия',
                est: 'Эстония',
                lat: 'Латвия',
                lit: 'Литва',
                pol: 'Польша',
                mol: 'Молдавия',
                roma: 'Румыния',
                bulg: 'Болгария',
                serb: 'Сербия',
                gre: 'Греция',
                maked: 'Македония',
                slovak: 'Словакия',
                hung: 'Венгрия',
                cze: 'Чехия',
                aust: 'Австрия',
                slowenia: 'Словения',
                croat: 'Хорватия',
                BandG: 'Босния и Герцоговина',
                monte: 'Монтенеґро',
                alb: 'Албания',
                swiss: 'Швейцария',
                germ: 'Германия',
                nether: 'Голандия',
                belg: 'Бельгия',
                lux: 'Люксинбург',
                ital: 'Италия',
                fran: 'Франция',
                spain: 'Испания',
                port: 'Португалия',
                turck: 'Турция',
                fin: 'Финляндия',
                sveden: 'Швеция',
                norway: 'Норвегия',
                UK: 'Англия',
                irland: 'Ирландия'
               }; 
            $scope.detail = detail[country]
        }
        $scope.hoverOut = function(){
            $scope.showDetails = false;
        }
     }])
})()