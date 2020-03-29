import React from 'react';
import ReactDOM from 'react-dom';
import {I18nextProvider} from 'react-i18next';
import i18next from 'i18next';

import App from './App';
import './index.css';
import common_en from "./translations/en/common.json";
import common_pl from "./translations/pl/common.json";

i18next.init({
    interpolation: {escapeValue: false},
    lng: 'pl',
    resources: {
        en: { common: common_en },
        pl: { common: common_pl }
    }
}).then((a) => a);

ReactDOM.render(
    <I18nextProvider i18n={i18next}>
        <App/>
    </I18nextProvider>,
    document.getElementById('root')
);