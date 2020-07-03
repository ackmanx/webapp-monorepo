import React from 'react'
import ReactDOM from 'react-dom'
import {App} from './components/app/app'
import './index.css'
import {Provider} from 'react-redux'
import {applyMiddleware, combineReducers, createStore} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import {app, buffer, categories, entries} from './reducers'
import {Desktop, Mobile} from './components/responsive'

const initialState = {
    app: {
        currentCategoryId: 'ALL',
    },
    buffer: {
        hanzi: '',
        pinyin: '',
        english: '',
    },
}

const store = createStore(
    combineReducers({
        app,
        buffer,
        categories,
        entries,
    }),
    initialState,
    composeWithDevTools(applyMiddleware(thunk))
)

ReactDOM.render(
    <Provider store={store}>
        <div className='useless-div-because-redux-provider-requires-one-child'>
            <Mobile>
                <div className='small-view'>
                    <App isLargeView={false} />
                </div>
            </Mobile>
            <Desktop>
                <App isLargeView={true} />
            </Desktop>
        </div>
    </Provider>,
    document.getElementById('root')
)
