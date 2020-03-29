import React, {Component} from 'react';
import {withTranslation} from 'react-i18next';

import './App.less';
import GeneralStage from "./components/GeneralStage/GeneralStage";
import LanguageSwitcher from "./components/LanguageSwitcher/LanguageSwitcher";

class App extends Component {

    constructor(props, context) {
        super(props, context);
        this.handleLanguage = this.handleLanguage.bind(this);
    }

    handleLanguage(evt, lan) {
        const {i18n} = this.props;
        if (i18n) {
            return i18n.changeLanguage(lan);
        }
    }

    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <span>Wedding Guests</span>
                    <LanguageSwitcher onClick={this.handleLanguage}/>
                </div>
                <GeneralStage {...this.props} />
            </div>
        );
    }
}

export default withTranslation('common')(App);
