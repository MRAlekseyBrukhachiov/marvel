import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import { Helmet } from "react-helmet";

import useMarvelService from '../../services/MarvelService';
import setContent from "../../utils/setContent";
import AppBanner from "../appBanner/AppBanner";

import './singleComicPage.scss';

const SingleCharacterPage = () => {
    const {charId} = useParams();
    const [char, setChar] = useState(null);

    const {getCharacter, clearError, process, setProcess} = useMarvelService();

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

    return (
        <>
            <AppBanner/>
            {setContent(process, View, char)}
        </>
    )
}

const View = ({data}) => {

    const {name, description, thumbnail} = data;

    return (
        <div className="single-comic">
            <Helmet>
                <meta
                    name="description"
                    content={`${name} page`}
                />
                <title>{name}</title>
            </Helmet>
            <img src={thumbnail} alt={name} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{name}</h2>
                <p className="single-comic__descr">{description}</p>
            </div>
            <Link to="/" className="single-comic__back">Back to main page</Link>
        </div>
    )
}

export default SingleCharacterPage;