const _ = require('underscore');

const Phase = require('./phase.js');
const SimpleStep = require('./simplestep.js');
const DynastyActionOrPassPrompt = require('./dynasty/dynastyactionorpassprompt.js');

/*
I Dynasty Phase
1.1 Dynasty phase begins.
1.2 Reveal facedown dynasty cards.
1.3 Collect fate.
1.4 SPECIAL ACTION WINDOW
    Players alternate playing cards from
    provinces and/or triggering Action abilities.
1.5 Dynasty phase ends.
 */

class DynastyPhase extends Phase {
    constructor(game) {
        super(game, 'dynasty');
        this.initialise([
            new SimpleStep(game, () => this.beginDynasty()),
            new SimpleStep(game, () => this.cyclePlayers()),
            new SimpleStep(game, () => this.dynastyActionOrPassStep())
        ]);
    }

    beginDynasty() {
        this.allPlayers = this.game.getPlayersInFirstPlayerOrder();
        this.remainingPlayers = this.allPlayers;

        _.each(this.allPlayers, player => {
            player.beginDynasty();
        });

    }

    cyclePlayers () {

        if(typeof this.currentPlayer === 'undefined') {
            //Get First Player
            this.currentPlayer = this.remainingPlayers.shift();
        }


    }

    dynastyActionOrPassStep() {

        if(this.currentPlayer.passedDynasty !== true) {

            if(this.currentPlayer.passedDynasty === false) {
                this.game.queueStep(new DynastyActionOrPassPrompt(this.game, this.currentPlayer));
            }

        }

    }

}

module.exports = DynastyPhase;
