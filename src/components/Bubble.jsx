import { useEffect, useRef } from "react";
import '../input.css';
import { initBubble, popBubble } from "../modules/physics";
import { setTaskToComplete } from "../modules/tasks";
import {APP_COLORS} from '../colors';

const Bubble = (props) => {

    let hovering = false;

    const bubble = useRef(null);
    useEffect(() => {
        bubble.current = initBubble(props.id, props.due, props.world); //assigns bubble DOM element to Matter body
        (function rerender() {
            bubble.current.render(hovering);
            requestAnimationFrame(rerender);
        })(); // self-invoking
    }, [props.id, props.due, props.world, hovering, bubble]);

    const color = props.color.toLowerCase();
    const backgroundColor = APP_COLORS[color] || 'grey';

    //let bubbleStyle = "rounded-full "; // circle
    //bubbleStyle += "bg-" + color + "-500 "; // color
    //bubbleStyle += "absolute flex items-center justify-center ";
    //bubbleStyle += "background:tomato";
    //console.log(bubbleStyle);

    const style = {
        'position': 'absolute',
        'background': backgroundColor,
        'cursor': 'move',
        'userSelect': 'none',
        'display': 'flex',
        'alignItems': 'center',
        'justifyContent': 'center',
        'borderRadius': '50%',
    }

    if (!['grey', 'black', 'purple', 'pink'].includes(color)) {
        style.color = APP_COLORS.grey;
    }

    const handlePop = () => {
        setTaskToComplete(props.id, props.color, props.title, props.due);
        popBubble(bubble.current, props.world);
    }

    let bubbleTitle;
    const setBubbleTitle = () => {
        if (props.title.length > 30) {
            bubbleTitle = props.title.substring(0, 15) + "...";
        }
        else {
            bubbleTitle = props.title;
        }
    }

    // have to do this so that the titles are properly set on first render
    setBubbleTitle();

    //called on mouse enter and leave
    const toggleHover = () => {
        hovering = !hovering;
        if (hovering) {
            let due =  props.due;
            const YMD = due.split("T")[0].split("-");
            //subtract 1 from month to ensure it fits 0-11 format
            const dueDate = new Date(YMD[0], YMD[1] - 1, YMD[2]);
            const now = new Date();
            const daysUntil = Math.round((dueDate - now) / (3600000 * 24)); // ms to days
            if (daysUntil === 1) {
                bubbleTitle = daysUntil + " day"
            }
            else {
                bubbleTitle = daysUntil + " days"
            }
        }
        else {
            setBubbleTitle();
        }
        document.getElementById(`title-${props.id}`).innerHTML = bubbleTitle;
    }


    //when we hover over it, can we make it expand
    //when mouse leaves, can we reduce its size
    return (
        <div id={props.id} style={style} onDoubleClick={() => handlePop()} onMouseEnter={() => toggleHover()} onMouseLeave={() => toggleHover()}>
            {/* `${y - currentDiam / 2}px`; */}
            <p id={`title-${props.id}`} className="text-center" title={props.title}>{bubbleTitle}</p>
        </div>
    );
}

export default Bubble;
