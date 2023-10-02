import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';

import useMarvelService from '../../services/MarvelService';
import setContent from "../../utils/setContent";
import AppBanner from "../appBanner/AppBanner";

import './singleComicPage.scss';

const SinglePage = ({Component, dataType}) => {
    const {id} = useParams();
    const [data, setData] = useState(null);

    const {getCharacter, getComics, clearError, process, setProcess} = useMarvelService();

    useEffect(() => updateData(), [id]);

    const onDataLoaded = (data) => {
        setData(data);
    }

    const updateData = () => {
        if (!id) {
            return;
        }

        clearError();
        switch (dataType) {
            case 'character':
                getCharacter(id)
                    .then(onDataLoaded)
                    .then(() => setProcess('confirmed'));
                break;
            case 'comic':
                getComics(id)
                    .then(onDataLoaded)
                    .then(() => setProcess('confirmed'));
                break;
        }
    }

    return (
        <>
            <AppBanner/>
            {setContent(process, Component, data)}
        </>
    )
}

export default SinglePage;