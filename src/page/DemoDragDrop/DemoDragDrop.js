import React, { useRef, useState } from "react";
import './DemoDragProp.css'
import { animated, useSpring } from 'react-spring'


const defaultValue = [
    { id: 1, taskName: "Task 1" },
    { id: 2, taskName: "Task 2" },
    { id: 3, taskName: "Task 3" },
    { id: 4, taskName: "Task 4" },
    { id: 5, taskName: "Task 5" },
];

export default function DemoDragDrop() {
    const [taskList, setTaskList] = useState(defaultValue);
    const tagDrag = useRef({});
    const tagDragEnter = useRef({});

    // useSpring
    const [propsSpring, set] = useSpring(() => {
        return {
            from: {
                bottom: -25
            },
            to: {
                bottom: 0
            },
            config: {
                duration: 250
            },
            reset: true
        }
    })



    const handleDragStart = (e, item, index) => {
        // console.log('drag start', e.target);
        // console.log('item', item);
        // console.log('index', index);

        // lưu lại giá trị của task đang drag
        tagDrag.current = item;
        console.log('(tagDrag.current', tagDrag.current)
    }

    const handleDragEnter = (e, itemDragEnter, index) => {
        console.log('drag enter', itemDragEnter);
        set({ bottom: 0 })
        tagDragEnter.current = { ...itemDragEnter };

        let taskListUpdate = [...taskList];

        // Lấy ra index thằng đang kéo
        let indexDragTag = taskListUpdate.findIndex(task => task.id === tagDrag.current.id);

        // lấy index của thằng bị kéo wa
        let indexDragEnter = taskListUpdate.findIndex(task => task.id === itemDragEnter.id);

        // biến chứa giá trị thằng đang kéo
        let temp = taskListUpdate[indexDragTag];

        // lấy giá trị tại vi trí đang kéo gán = thằng kéo wa
        taskListUpdate[indexDragTag] = taskListUpdate[indexDragEnter];

        // lấy thằng kéo wa gắn = đang kéo
        taskListUpdate[indexDragEnter] = temp

        setTaskList(taskListUpdate)
    }

    // const handleDragOver = (e) => {
    //     console.log('drag over', e.target)
    // }

    // const handleDragEnd = (e) => {
    //     console.log('drag end', e.target)
    //     tagDrag.current = {};
    //     setTaskList([...taskList])
    // }

    // const handleDrop = (e) => {
    //     console.log('drop', e.target)
    // }

    return (
        <div className="container mt-3" onDragOver={(e) => {
            e.preventDefault();
        }} onDrop={(e) => {
            tagDrag.current = {};
            setTaskList([...taskList])
        }}>
            <div className="text-center display-4">Task List</div>
            <div className="row">
                <div className="col-2"></div>
                <div className="bg-dark p-5 col-8">
                    {taskList.map((item, index) => {

                        let cssDragTag = item.id === tagDrag.current.id ? 'dragTag' : ''

                        if (item.id === tagDragEnter.current.id) {
                            return <animated.div draggable="true"
                                style={{
                                    position: 'relative',
                                    bottom: propsSpring.bottom.interpolate(numBottom => `${numBottom}px`)
                                }}
                                onDragStart={(e) => {
                                    handleDragStart(e, item, index)
                                }}
                                onDragEnter={(e) => { handleDragEnter(e, item, index) }}
                                // onDragOver={handleDragOver}
                                // onDragEnd={handleDragEnd}
                                key={index}
                                className={`bg-success text-white p-4 mt-4`}
                            >
                                {item.taskName}

                            </animated.div>
                        }
                        return (
                            <div
                                draggable="true"
                                onDragStart={(e) => {
                                    handleDragStart(e, item, index)
                                }}
                                onDragEnter={(e) => { handleDragEnter(e, item, index) }}
                                // onDragOver={handleDragOver}
                                // onDragEnd={handleDragEnd}
                                key={index}
                                className={`bg-success text-white p-4 mt-1 ${cssDragTag}`}
                            >
                                {item.taskName}
                            </div>
                        );
                    })}
                </div>
                <div className="col-2 bg-primary" style={{ height: 500 }} >
                    111111111
        </div>
            </div>
        </div>
    );
}

// onDragOver={(e) =>{e.preventDefault()}} onDrop={(e) => {handleDrop(e)}}