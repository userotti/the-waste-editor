import React from 'react';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';


import AnimatingCanvasContainer from './components/AnimatingCanvasContainer'
import StaticCanvasContainer from './components/StaticCanvasContainer/staticCanvasContainer'
import ThreeJSCanvasContainer from './components/ThreeJSCanvasContainer'
import LoadingScreen from './components/LoadingScreen/loadingScreen'


// const RestrictedRoute = ({ component: Component, isLoggedIn, ...rest }) => (
//     <Route
//         {...rest}
//         render={props => isLoggedIn
//             ? <Component {...props} />
//             : <Redirect
//                 to={{
//                     pathname: '/login',
//                     state: { from: props.location },
//                 }}
//             />}
//         />
//     );

const PublicRoutes = ({ history }) => {

    return (
        <ConnectedRouter history={history}>
            <div>
                {/* <Route exact path="/" render={()=>{
                    return <Redirect to={{
                                pathname: '/home',
                            }}/>
                }}>
                </Route> */}


                <Route exact path="/" component={LoadingScreen}/>
                <Route path="/lobby" component={LoadingScreen}/>
                <Route path="/static-canvas" component={StaticCanvasContainer}/>
                <Route path="/animating-canvas" component={AnimatingCanvasContainer}/>
                <Route path="/threejs-canvas" component={ThreeJSCanvasContainer}/>

                {/* <Route
                    exact
                    path={'/unrecognized-token'}
                    component={asyncComponent(() => import('./containers/Page/SMME/unrecognizedToken/unrecognizedToken'))}
                /> */}
                {/* <RestrictedRoute
                    path="/smme-workspace"
                    component={SMMEApp}
                    isLoggedIn={isLoggedIn}
                /> */}
            </div>
        </ConnectedRouter>
    );
};

export default PublicRoutes
