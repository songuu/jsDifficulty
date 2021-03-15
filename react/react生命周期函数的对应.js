
import React, { useRef, useEffect } from "react";

// 使用useRef钩子在功能组件中模拟构造函数的方式：

function Component(props) {
    const willMount = useRef(true);
    if (willMount.current) {
        console.log('This runs only once before rendering the component.');
        willMount.current = false;
    }

    return (<h1>Meow world!</h1>);
}


// 生命周期函数
function RenderLog(props) {
    console.log('Render log: ' + props.children);
    return (<>{props.children}</>);
}

function Component1(props) {

    console.log('Body');
    const [count, setCount] = useState(0);
    const willMount = useRef(true);

    if (willMount.current) {
        console.log('First time load (it runs only once)');
        setCount(2);
        willMount.current = false;
    } else {
        console.log('Repeated load');
    }

    useEffect(() => {
        console.log('Component did mount (it runs only once)');
        return () => console.log('Component will unmount');
    }, []);

    useEffect(() => {
        console.log('Component did update');
    });

    useEffect(() => {
        console.log('Component will receive props');
    }, [count]);


    return (
        <>
            <h1>{count}</h1>
            <RenderLog>{count}</RenderLog>
        </>
    );
}