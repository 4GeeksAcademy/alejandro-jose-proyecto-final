import React, {useEffect, useContext} from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export function GameView() {
    const {theid}= useParams()
    const {store, actions} = useContext(Context)
    let {name,
        user_id,
        cover_image, 
        genre, 
        modes, 
        release_date, 
        system_requirements, 
        achievements, 
        rating, 
        players, 
        related_games, 
        language, 
        summary, 
        description, 
        trailer,
        additional_images
    } = store.singleGame


    useEffect(() => {
        actions.get_game(theid)
    }, [])

    useEffect(() => {
        if(!user_id) return
        actions.get_user(user_id)
    }, [user_id])

    function getUser() {

        return store.singleUser
    }

    return(
        <>
        <div className="container">
            <div className="row">
                <div className="d-flex justify-content-center">
                    <div>
                        <h1 className="d-flex justify-content-center">{name}</h1>  
                        <span>{genre}</span>  
                    </div>            
                </div>
                <div className="d-flex justify-content-center">
                     <img src={cover_image} className="w-25"/>
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
                        <p>Game modes: {modes}</p>
                        <p>Release date: {release_date}</p>
                        <p>PEGI: {rating}</p>
                        <p>Number of players: {players}</p>
                        <p>Achievements: {achievements}</p>
                        <p>Language: {language}</p>
                    </div>
                </div>
                <div className="d-flex justify-content-center">
                    <div>
                        <h1>Related Games</h1>
                        <p className="d-flex justify-content-center">{related_games}</p>
                    </div>
                </div>
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
                                        className="m-2"
                                        style={{ width: "150px", height: "100px", objectFit: "cover" }}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
            </div>
        </div>
        </>
    )
}