import React from "react";
import ReactDOM from "react-dom";

/* 
    类组件实现
*/
class Counter extends React.Component {
    state = {
        count: 0,
        delay: 1000,
    };
    componentDidMount() {
        this.interval = setInterval(this.tick, this.state.delay);
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.delay !== this.state.delay) {
            clearInterval(this.interval);
            this.interval = setInterval(this.tick, this.state.delay);
        }
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }
    tick = () => {
        this.setState({
            count: this.state.count + 1
        });
    }
    handleDelayChange = (e) => {
        this.setState({ delay: Number(e.target.value) });
    }
    render() {
        return (
            <>
                <h1>{this.state.count}</h1>
                <input value={this.state.delay} onChange={this.handleDelayChange} />
            </>
        );
    }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Counter />, rootElement);



/* 
    函数式组件
*/
import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";

function Counter() {
    const [delay, setDelay] = useState(1000);
    const [count, setCount] = useState(0);

    // Increment the counter.
    useInterval(() => {
        setCount(count + 1);
    }, delay);

    // Make it faster every second!
    useInterval(() => {
        if (delay > 10) {
            setDelay(delay / 2);
        }
    }, 1000);

    function handleReset() {
        setDelay(1000);
    }

    return (
        <>
            <h1>Counter: {count}</h1>
            <h4>Delay: {delay}</h4>
            <button onClick={handleReset}>
                Reset delay
        </button>
        </>
    );
}

// 保持interval的唯一性
function useInterval(callback, delay) {
    const savedCallback = useRef();

    useEffect(() => {
        savedCallback.current = callback;
    });

    useEffect(() => {
        function tick() {
            savedCallback.current();
        }

        let id = setInterval(tick, delay);
        return () => clearInterval(id);
    }, [delay]);
}
