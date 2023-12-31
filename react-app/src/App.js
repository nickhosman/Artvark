import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { authenticate } from "./store/session";
import Landing from "./components/Landing";
import Home from "./components/Home";
import UserPage from "./components/User/UserPage";
import Following from "./components/Following/Following";

function App() {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        dispatch(authenticate()).then(() => setIsLoaded(true));
    }, [dispatch]);

    return (
        <>
            {isLoaded && (
                <Switch>
                    <Route exact path="/">
                        <Landing />
                    </Route>
                    <Route exact path="/posts">
                        <Home isLikesPage={false} />
                    </Route>
                    <Route path="/posts/liked">
                        <Home isLikesPage={true} />
                    </Route>
                    <Route path="/posts/following">
                        <Following />
                    </Route>
                    <Route path="/:username">
                        <UserPage />
                    </Route>
                </Switch>
            )}
        </>
    );
}

export default App;
