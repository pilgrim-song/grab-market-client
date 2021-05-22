import React from 'react';

function TimerComponent() {
    // 1. time에는 기본 값으로 0이 들어간다. ES6의 Destructuring이다
    const [time, setTime] = React.useState(0)
    console.log('Component 업데이트!');  // time이 업데이트될 때마다 계속 호출된다
    // function updateTime() {
    //     setTime(time+1);
    // }
    React.useEffect(function() {
        setTime(time+1);
    }, []);
    return (
        <div>
            <h3>{time}초</h3>
            {/* <button onClick={updateTime}>1씩 올려 주세요</button> */ }
            <button>1씩 올려 주세요</button>
        </div>
    )
}

export default TimerComponent;