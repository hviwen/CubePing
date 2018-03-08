import React, {PureComponent} from 'react'
import {BackHandler, StatusBar, ToastAndroid} from 'react-native'
import {
    StackNavigator,
    TabNavigator,
    TabBarBottom,
    addNavigationHelpers,
    NavigationActions,
} from 'react-navigation'
import {
    createReduxBoundAddListener,
    createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';

import {connect} from 'react-redux';

import * as color from './utils/colors';
import StartScene from './scene/start/StartPage';


import ItemCheckPage from './components/itemCheck/itemCheckPage';

const AppNavigator = StackNavigator(
    {
        Main: {screen: ItemCheckPage},

    },
    {
        headerMode: 'none',
        mode: 'modal',
        navigationOptions: {
            headerStyle: {backgroundColor: color.LINE_NOMAL_COLOR},
            headerBackTitle: null,
            //headerBackTitle: '返回',
            // headerTintColor: '#333333',
            headerTintColor: color.HANKINS_DARK,
            showIcon: true,
        },
    }
);

function getCurrentScreen(navigationState) {
    if (!navigationState) {
        return null
    }
    const route = navigationState.routes[navigationState.index];
    if (route.routes) {
        return getCurrentScreen(route)
    }
    return route.routeName
}

export const routerMiddleware = createReactNavigationReduxMiddleware(
    'root',
    state => state.router
);
const addListener = createReduxBoundAddListener('root');


@connect(({router}) => ({router}))
class Router extends PureComponent {
    constructor(props) {
        super(props)
        StatusBar.setBarStyle('light-content')
    }

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.backHandle)
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.backHandle)
    }

    backHandle = () => {
        const currentScreen = getCurrentScreen(this.props.router);

        if (currentScreen === 'SignInNavigator') {
            BackHandler.exitApp()
        } else if (currentScreen !== 'Home') {
            this.props.dispatch(NavigationActions.back())
            return true
        } else {
            if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
                return false
            }
            this.lastBackPressed = Date.now();
            ToastAndroid.show("再次点击退出应用", ToastAndroid.SHORT);
            return true
        }

        return false
    };

    render() {
        const currentScreen = getCurrentScreen(this.props.router);
        console.log("Router props ->", this.props);
        console.log("currentScreen ->", currentScreen);

        const {dispatch, router} = this.props;

        const navigation = addNavigationHelpers({
            dispatch,
            state: router,
            addListener,
        });
        return <AppNavigator navigation={navigation}/>
    }
}

export function routerReducer(state, action = {}) {
    return AppNavigator.router.getStateForAction(action, state)
}

export default Router