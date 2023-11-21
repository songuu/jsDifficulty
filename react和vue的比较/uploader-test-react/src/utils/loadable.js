import React, { useEffect } from 'react'
import Loadable from 'react-loadable'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'


// 实现代码分割 路由懒加载
const useLoadingComponent = () => {
    useEffect(() => {
        NProgress.start()
        return () => {
            NProgress.done()
        }
    }, [])

    return <div />
}

export default (loader, loading = useLoadingComponent) => {
    return Loadable({
        loader,
        loading
    })
}
