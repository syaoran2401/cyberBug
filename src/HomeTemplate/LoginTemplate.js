import React, { useEffect, useState } from 'react'
import { Route } from 'react-router-dom'
import { Layout } from 'antd';


const { Sider, Content } = Layout;

export default function LoginTemplate(props) {

    let { Component, ...resPropsRoute } = props;

    const [size, setSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    })

    useEffect(() => {
        window.onresize = () =>{
            setSize({
                width: window.innerWidth,
                height:window.innerHeight
            })
        }
    }, [])

    return (
        <>
            <Route {...resPropsRoute} render={(propsRoute) => {
                return <>
                    <Layout>
                        <Sider width={size.width/3} style={{ height:size.height, backgroundImage: 'url(https://picsum.photos/2000)', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
                        </Sider>
                        <Content >
                            <Component {...propsRoute} />
                        </Content>
                    </Layout>
                </>
            }} />
        </>
    )
}
