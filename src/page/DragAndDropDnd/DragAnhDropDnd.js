import React, { useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import _ from 'lodash'

export default function DragAnhDropDnd() {

    const [state, setState] = useState({
        toDo: {
            id: `toDo`,
            items: [
                { id: `1`, taskName: 'Task 1' },
                { id: `2`, taskName: 'Task 2' },
                { id: `3`, taskName: 'Task 3' },
            ]
        },
        inProgress: {
            id: 'inProgress',
            items: [
                { id: `4`, taskName: 'Task 4' },
                { id: `5`, taskName: 'Task 5' },
                { id: `6`, taskName: 'Task 6' },
            ]
        },
        done: {
            id: 'done',
            items: [
                { id: `7`, taskName: 'Task 7' },
                { id: `8`, taskName: 'Task 8' },
                { id: `9`, taskName: 'Task 9' },
            ]
        }
    })

    const handleDragEnd = (res) => {
        let { destination, source } = res;
        console.log("destination", destination);
        console.log("source", source)
        console.log("state[source.droppableId]", state[source.droppableId])

        if (!destination) {
            return
        }

        if (destination.index === source.index && destination.droppableId === source.droppableId){
            return;
        }

        // Tạo ra task đang đc kéo
        let itemCopy = {...state[source.droppableId].items[source.index]};
        // console.log(itemCopy)



        // cột bắt đầu
        let index = state[source.droppableId].items.findIndex(item => item.id == itemCopy.id);

        state[source.droppableId].items.splice(index,1)

        // cột đến
        let dropDestination = state[destination.droppableId].items;
        dropDestination.splice(destination.index,0,itemCopy)


        console.log("dropDestination",dropDestination)

      

       setState(state)
     
    }


    return (
        <div className='container'>
            <h3 className='text-center display-4'>Demo DragAndDrop DND</h3>

            <DragDropContext onDragEnd={(res) => {
                handleDragEnd(res)
            }}>

                <div className='row'>
                    {_.map(state, (item, index) => {
                        // Hiển thị nội dung kéo thả
                        return <Droppable droppableId={item.id} key={index}>
                            {(provided) => {
                                return <div className='col-4'>

                                    <div className='bg-dark p-5'
                                        key={index}
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}>

                                        <h3 className='text-white text-center'>{item.id}</h3>
                                        {item.items.map((task, index) => {
                                            // Hiển thị nội dung được kéo thả
                                            return <Draggable key={task.id} index={index} draggableId={task.id}>
                                                {(provided) => {
                                                    return <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        className='mt-2 p-3 text-center bg-white'>{task.taskName}</div>
                                                }}
                                            </Draggable>
                                        })}
                                        {provided.placeholder}

                                    </div>
                                </div>
                            }}
                        </Droppable>
                    })}
                </div>
            </DragDropContext>
        </div>
    )
}

