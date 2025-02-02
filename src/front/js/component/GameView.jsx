import React, {useEffect, useContext, useState} from "react";
import { NavLink, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export function GameView() {
    const { theid } = useParams()
    const { store, actions } = useContext(Context)
    const [autoRelatedGames, setAutoRelatedGames] = useState()
    const [loading, setLoading] = useState(true)

    let { name,
        user_id,
        cover_image,
        genres,
        modes,
        release_date,
        system_requirements,
        achievements,
        rating,
        players,
        related_games,
        auto_related_games,
        language,
        summary,
        description,
        trailer,
        additional_images
    } = store.singleGame



  

    async function handleRelation() {
        
        let relatedGame1 = await actions.multiQueryGame(auto_related_games[0])
        let relatedGame2 = await actions.multiQueryGame(auto_related_games[1])
        let relatedGame3 = await actions.multiQueryGame(auto_related_games[2])
        // setAutoRelatedGames([relatedGame1, relatedGame2, relatedGame3])
        Promise.all([relatedGame1, relatedGame2, relatedGame3]).then((response) => {
            setAutoRelatedGames(response)
            setLoading(false)
        })
    }

    useEffect(() => {
        if (!user_id) return
        actions.getUser(user_id)
    }, [user_id])

    useEffect(() => {
        actions.getGame(theid)
    }, [])

    useEffect(() => {
        if (Object.keys(store.singleGame).length == 0) return
        handleRelation()
        // setTimeout(() => {
        //     setLoading(false)
        // }, 2000)
    }, [auto_related_games])
    return (
        <>
            {
                loading ?
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                :
            <div className="container">
                <div className="row">
                    <div className="d-flex justify-content-center">
                        <div>
                            <h1 className="d-flex justify-content-center">{name}</h1>
                            <span>{genres}</span>
                        </div>
                    </div>
                    <div className="d-flex justify-content-center">
                        <img src={cover_image} className="w-25" />
                    </div>
                    <div>
                        <p>A game by {store.singleUser.name}</p>
                    </div>
                    <div className="d-flex justify-content-center mt-2">
                        <iframe className="trailer" width="560" height="415" src={`https://www.youtube.com/embed/${trailer}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                    </div>
                    <div className="col-6 d-flex justify-content-center">
                        <p>{summary}</p>
                    </div>
                    <div className="col-6 d-flex justify-content-center">
                        <div>
                            <p>Game modes: {modes?.split(',').join(', ')}</p>
                            <p>Release date: {release_date}</p>
                            <p>PEGI: {rating}</p>
                            <p>Number of players: {players}</p>
                            <p>Achievements: {achievements}</p>
                            <p>Language: {language}</p>
                        </div>
                    </div>
                    <div className="d-flex justify-content-center">
                        <h1 onClick={() => handleRelation()}>Related Games</h1>
                    </div>

                    {
                        autoRelatedGames &&
                        <div className="d-flex gap-3 justify-content-center">
                            <div>
                                <img src={autoRelatedGames[0].cover.url}></img>
                                <p>{autoRelatedGames[0].name}</p>
                            </div>
                            <div>
                                <img src={autoRelatedGames[1].cover.url}></img>
                                <p>{autoRelatedGames[1].name}</p>
                            </div>
                            <div>
                                <img src={autoRelatedGames[2].cover.url}></img>
                                <p>{autoRelatedGames[2].name}</p>
                            </div>
                        </div>
                    }
                    <div className="d-flex justify-content-center">
                        {system_requirements}
                    </div>
                    {additional_images && additional_images.length > 0 && (
                        <div className="additional-images mt-4">
                            <h2>Additional Images</h2>
                            <div className="d-flex flex-wrap justify-content-center">
                                {additional_images.map((image, index) => (
                                    <img
                                        key={index}
                                        src={image}
                                        alt={`Additional image ${index + 1}`}
                                        className="m-2 hover-zoom"
                                        style={{ width: "150px", height: "100px", objectFit: "cover" }}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                <div>
                    <h1>Rate this game</h1>

                    <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
                        <input type="radio" className="btn-check" name="btnradio" id="btnradio1" autocomplete="off"/>
                        <label className="btn btn-outline-primary" for="btnradio1">1</label>
                        <input type="radio" className="btn-check" name="btnradio" id="btnradio2" autocomplete="off"/>
                        <label className="btn btn-outline-primary" for="btnradio2">2</label>
                        <input type="radio" className="btn-check" name="btnradio" id="btnradio3" autocomplete="off"/>
                        <label className="btn btn-outline-primary" for="btnradio3">3</label>
                        <input type="radio" className="btn-check" name="btnradio" id="btnradio4" autocomplete="off"/>
                        <label className="btn btn-outline-primary" for="btnradio4">4</label>
                        <input type="radio" className="btn-check" name="btnradio" id="btnradio5" autocomplete="off"/>
                        <label className="btn btn-outline-primary" for="btnradio5">5</label>
                        <input type="radio" className="btn-check" name="btnradio" id="btnradio6" autocomplete="off"/>
                        <label className="btn btn-outline-primary" for="btnradio6">6</label>
                        <input type="radio" className="btn-check" name="btnradio" id="btnradio6" autocomplete="off"/>
                        <label className="btn btn-outline-primary" for="btnradio6">6</label>
                        <input type="radio" className="btn-check" name="btnradio" id="btnradio7" autocomplete="off"/>
                        <label className="btn btn-outline-primary" for="btnradio7">7</label>
                        <input type="radio" className="btn-check" name="btnradio" id="btnradio8" autocomplete="off"/>
                        <label className="btn btn-outline-primary" for="btnradio8">8</label>
                        <input type="radio" className="btn-check" name="btnradio" id="btnradio9" autocomplete="off"/>
                        <label className="btn btn-outline-primary" for="btnradio9">9</label>
                        <input type="radio" className="btn-check" name="btnradio" id="btnradio10" autocomplete="off"/>
                        <label className="btn btn-outline-primary" for="btnradio10">10</label>
                    </div>
                    <input className="form-control" placeholder="Add a review..."></input>
                </div>
            </div>
            </div>
            }
        </>
    )
}