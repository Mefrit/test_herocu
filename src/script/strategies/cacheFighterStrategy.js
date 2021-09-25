define(["require", "exports", "../strategies/angryIfcan", "./securityArcher", "./goAvayIfManyEnemies"], function (require, exports, angryIfcan_1, securityArcher_1, goAvayIfManyEnemies_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.cacheArcherAI = exports.cacheFighterAI = void 0;
    exports.cacheFighterAI = {
        "SecurityArcher": securityArcher_1.SecurityArcher,
        "FightIfYouCan": angryIfcan_1.FightIfYouCan,
        "GoAwayIfManyEnemies": goAvayIfManyEnemies_1.GoAwayIfManyEnemies
    };
    exports.cacheArcherAI = {
        "AtackTheArcher": securityArcher_1.SecurityArcher,
        "FightIfYouCan": angryIfcan_1.FightIfYouCan,
        "GoAwayIfManyEnemies": goAvayIfManyEnemies_1.GoAwayIfManyEnemies
    };
});
