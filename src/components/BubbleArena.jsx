import { useEffect, useRef, useState } from 'react';
import '../input.css';
import { initArena, updateEngine, updateYourMom } from '../modules/physics';
import { getAllBubbleLists, getBubblesFromList } from '../modules/tasks';
import AddBubbleForm from './AddBubbleForm';
import Bubble from './Bubble';

const BubbleArena = () => {

    const firstRender = useRef(true);
    const engine = useRef(initArena());
    const [bubblesJSX, setBubblesJSX] = useState([]);

    useEffect(() => {
        console.log('first render: ' + firstRender.current);
        const mapBubblesToJSX = async (world) => {
            let bubbles = [];
            let JSXbubbles = [];
            const bubbleLists = await getAllBubbleLists();
            console.log(bubbleLists);
            for (let i = 0; i < bubbleLists.length; i++) {
                console.log(bubbleLists[i].id);
                bubbles = await getBubblesFromList(bubbleLists[i].id);
                console.log(bubbles);
                bubbles.forEach((bubble) => {
                    bubble.color = bubbleLists[i].color
                    JSXbubbles.push(<Bubble key={bubble.id} id={bubble.id} title={bubble.title} due={bubble.due} color={bubble.color} world={world}/>)
                });
            }
            setBubblesJSX(JSXbubbles);
        }
        if (firstRender.current) {
            mapBubblesToJSX(engine.current.world);
            firstRender.current = false;
        }
        (function update() {
            updateEngine(engine.current);
            requestAnimationFrame(update);
            updateYourMom(); //dynamically center gravity src
        })();
    }, [bubblesJSX, setBubblesJSX]);

    return (
        <div id="bubbleArena" className="w-screen h-screen">
            <AddBubbleForm bubblesJSX={bubblesJSX} setBubblesJSX={setBubblesJSX} world={engine.current.world}/>
            <div>
                {bubblesJSX}
            </div>
        </div>
    )
}

export default BubbleArena;
