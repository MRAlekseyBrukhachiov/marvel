import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import useMarvelService from '../../services/MarvelService';
import setContent from '../../utils/setContent';

import './charInfo.scss';

const CharInfo = (props) => {

    const {charId} = props;
    
    const [char, setChar] = useState(null);

    const {getCharacter, clearError, process, setProcess} = useMarvelService();

    useEffect(() => updateChar(), []);

    useEffect(() => updateChar(), [charId]);

    const onCharLoaded = (char) => {
        setChar(char);
    }

    const updateChar = () => {
        if (!charId) {
            return;
        }

        clearError();
        getCharacter(charId)
            .then(onCharLoaded)
            .then(() => setProcess('confirmed'));
    }

    // const skeleton = char || loading || error ? null : <Skeleton/>;
    // const errorMessage = error ? <ErrorMessage/> : null;
    // const spinner = loading ? <Spinner/> : null;
    // const content = !(loading || error) && char ? <View char={char}/> : null;

    return (
        <div className="char__info">
            {/* {skeleton}
            {errorMessage}
            {spinner}
            {content} */}
            {setContent(process, View, char)}
        </div>
    ) 
}

const View = ({data}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = data;
    let styleImg = {'objectFit': 'cover'}
    if (thumbnail.indexOf('image_not_available') !== -1) {
        styleImg = {'objectFit': 'unset'}
    }

    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={styleImg}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length > 0 ? null : 'Empty'}
                {
                    comics.slice(0, 10).map((item, i) => {
                        return (
                            <li key={i} className="char__comics-item">
                                {item.name}
                            </li>
                        )
                    })
                }               
            </ul>
        </>
    )
}

// Проверка props на типы данных
CharInfo.propTypes = {
    charId: PropTypes.number
}

export default CharInfo;