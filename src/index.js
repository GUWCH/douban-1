// 搭建入口文件
import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {browerHistory} from 'react-router'
import {syncHistoryWithStore} from 'react-router-redux'

// 引入项目的相关配置
import configureStore from './store/configureStore'
import getRouter from './router'

// 引入公共的css样式
import './common/public.scss'

import fastClick from 'fastclick'
fastClick.attach(document.body)

const store = configureStore()
const history = syncHistoryWithStore(browerHistory, store)
const router = getRouter()

render(
    <Provider store={store}>
        {router}
    </Provider>,
    document.getElementById('root')
)

registerServiceWorker();
