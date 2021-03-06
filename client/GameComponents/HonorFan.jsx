import React from 'react';
import _ from 'underscore';

class HonorFan extends React.Component {
    constructor() {
        super();

        this.onButtonClick = this.onButtonClick.bind(this);
    }

    onButtonClick(event, command, arg, method) {
        event.preventDefault();

        if(this.props.onButtonClick) {
            this.props.onButtonClick(command, arg, method);
        }
    }

    onMouseOver(event, card) {
        if(card && this.props.onMouseOver) {
            this.props.onMouseOver(card);
        }
    }

    onMouseOut(event, card) {
        if(card && this.props.onMouseOut) {
            this.props.onMouseOut(card);
        }
    }

    getButtons() {
        var buttonIndex = 0;

        var buttons = _.map(this.props.buttons, button => {
            var option = (
                <button key={ button.command + buttonIndex.toString() } className='btn btn-primary'
                    onClick={ event => this.onButtonClick(event, button.command, button.arg, button.method) }
                    onMouseOver={ event => this.onMouseOver(event, button.card) } onMouseOut={ event => this.onMouseOut(event, button.card) }
                    disabled={ button.disabled }>{ button.text }</button>);

            buttonIndex++;

            return option;
        });

        return buttons;
    }

    render() {

        return (<div>
            <div className='honor-fan'>
                <img className='honor-fan-value' src={ '/img/honorfan-' + this.props.value + '.png' } />
            </div>
        </div>);
    }
}

HonorFan.displayName = 'HonorFan';
HonorFan.propTypes = {
    buttons: React.PropTypes.array,
    onButtonClick: React.PropTypes.func,
    onMouseOut: React.PropTypes.func,
    onMouseOver: React.PropTypes.func,
    socket: React.PropTypes.object,
    value: React.PropTypes.string
};

export default HonorFan;
