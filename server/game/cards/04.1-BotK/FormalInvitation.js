const DrawCard = require('../../drawcard.js');
const { CardTypes } = require('../../Constants');

class FormalInvitation extends DrawCard {
    setupCardAbilities(ability) {
        this.action({
            title: 'Move attached character into the conflict',
            condition: () => this.game.isDuringConflict('political'),
            gameAction: ability.actions.moveToConflict(context => ({ target: context.source.parent }))
        });
    }

    canAttach(card, context) {
        if(card.getType() === CardTypes.Character && card.getGlory() < 2) {
            return false;
        }

        return super.canAttach(card, context);
    }
}

FormalInvitation.id = 'formal-invitation';

module.exports = FormalInvitation;
