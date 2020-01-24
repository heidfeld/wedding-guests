import React from 'react';
import PropTypes from 'prop-types';

import './less/LanguageSwitcher.css';
import icon_pl from './icon/pl.png';
import icon_en from './icon/en.png';

const LanguageSwitcher = (props) => {

    const {languages, onClick} = props;

    const getLanguageIcon = (lan) => {
        if (lan === 'pl') {
            return icon_pl;
        } else if (lan === 'en') {
            return icon_en;
        } else {
            return icon_en;
        }
    };

    const renderLanguagePreview = (lan, idx) => {
        const languageIcon = getLanguageIcon(lan);
        return (
            <div key={`language-preview-${idx}`} onClick={(evt) => onClick(evt, lan)} className='LanguageButton'>
                <img src={languageIcon} className='LanguageIcon' alt='language-icon'/>
            </div>

        );
    };

    const renderPreviews = () => {
        return languages.map((lan, idx) => {
            return renderLanguagePreview(lan, idx);
        });
    };

    return (
        <div className='LanguageSwitcher'>
            {renderPreviews()}
        </div>
    );

};

LanguageSwitcher.defaultProps = {
    languages: ['pl', 'en']
};

LanguageSwitcher.propTypes = {
    languages: PropTypes.arrayOf(PropTypes.string),
    onClick: PropTypes.func.isRequired
};

export default LanguageSwitcher;