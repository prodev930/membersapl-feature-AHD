import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, View, Keyboard, Dimensions } from 'react-native';
import Composer from './Composer';
import Send from './Send';
import Actions from './Actions';
import Color from './Color';
import { StylePropType } from './utils';
const heigth = Dimensions.get('window').height
const styles = StyleSheet.create({
    container: {
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: Color.defaultColor,
        backgroundColor: Color.white,
        left: 0,
        right: 0,
    },
    primary: {
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
});
export default class InputToolbar extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            position: 'absolute',
            heightInput: 0,
        };
        this.keyboardWillShowListener = undefined;
        this.keyboardWillHideListener = undefined;
        this.keyboardWillShow = () => {
            if (this.state.position !== 'relative') {
                this.setState({
                    position: 'relative',
                });
            }
        };
        this.keyboardWillHide = () => {
            if (this.state.position !== 'absolute') {
                this.setState({
                    position: 'absolute',
                });
            }
        };
    }
    componentDidMount() {
        this.keyboardWillShowListener = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow);
        this.keyboardWillHideListener = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide);
    }
    componentWillUnmount() {
        if (this.keyboardWillShowListener) {
            this.keyboardWillShowListener.remove();
        }
        if (this.keyboardWillHideListener) {
            this.keyboardWillHideListener.remove();
        }
    }
    renderActions() {
        const { containerStyle, ...props } = this.props;
        if (this.props.renderActions) {
            return this.props.renderActions(props);
        }
        else if (this.props.onPressActionButton) {
            return <Actions {...props} />;
        }
        return null;
    }
    renderActionsRight() {
        const { containerStyle, ...props } = this.props;
        if (this.props.renderActionsRight) {
            return this.props.renderActionsRight(props);
        }
        else if (this.props.onPressActionButton) {
            return <Actions {...props} />;
        }
        return null;
    }
    renderSend() {
        if (this.props.renderSend) {
            return this.props.renderSend(this.props);
        }
        return <Send {...this.props} />;
    }
    renderComposer() {
        if (this.props.renderComposer) {
            return this.props.renderComposer(this.props);
        }
        return <Composer {...this.props} />;
    }
    renderAccessory() {
        if (this.props.renderAccessory) {
            return (<View style={[styles.accessory, this.props.accessoryStyle, { position: 'absolute' },
            { bottom: this.state.heightInput }]}>
                {this.props.renderAccessory(this.props)}
            </View>);
        }
        return null;
    }
    render() {
        return (
            <>
                <View style={[
                    styles.container,
                    { position: this.state.position },
                    { bottom: (this.state.position === 'relative' && heigth >= 812) ? 50 : 5 },
                    this.props.containerStyle,
                ]}>
                    {this.renderAccessory()}
                    <View style={[styles.primary, this.props.primaryStyle]}
                        onLayout={(event) => {
                            this.setState({ heightInput: event?.nativeEvent?.layout?.height })
                        }}
                    >
                        {this.renderActions()}
                        {this.renderComposer()}
                        {this.renderSend()}
                        {this.renderActionsRight()}
                    </View>
                </View>
            </>
        );
    }
}
InputToolbar.defaultProps = {
    renderAccessory: null,
    renderActions: null,
    renderActionsRight: null,
    renderSend: null,
    renderComposer: null,
    containerStyle: {},
    primaryStyle: {},
    accessoryStyle: {},
    onPressActionButton: () => { },
};
InputToolbar.propTypes = {
    renderAccessory: PropTypes.func,
    renderActions: PropTypes.func,
    renderActionsRight: PropTypes.func,
    renderSend: PropTypes.func,
    renderComposer: PropTypes.func,
    onPressActionButton: PropTypes.func,
    containerStyle: StylePropType,
    primaryStyle: StylePropType,
    accessoryStyle: StylePropType,
};
//# sourceMappingURL=InputToolbar.js.map