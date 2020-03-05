const DrawCard = require('../../drawcard.js');
const { CardTypes } = require('../../Constants');

class ShiotomeEncampment extends DrawCard {
    setupCardAbilities(ability) {
        this.action({
            title: 'Ready a Cavalry character',
            condition: context =>
                Object.values(this.game.rings).some(
                    ring =>
                        ring.isConsideredClaimed(context.player) &&
                        ring.isConflictType('military')
                ),
            target: {
                cardType: CardTypes.Character,
                cardCondition: card => card.hasTrait('cavalry'),
                gameAction: ability.actions.ready()
            }
        });
    }
}

ShiotomeEncampment.id = 'shiotome-encampment';

module.exports = ShiotomeEncampment;
