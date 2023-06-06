import '../input.css';
import { addBubbleToTasks } from '../modules/tasks';
import Bubble from './Bubble';
import {APP_COLORS} from '../colors';

const AddBubbleForm = (props) => {
    const options = Object.keys(APP_COLORS);

    const toggleFormVisibility = () => {
        const form = document.getElementById('addBubbleForm');
        if (form.style.display === "block") {
            form.style.display = "none";
        }
        else {
            form.style.display = "block";
        }
    }

    const handleSubmit = async () => {
        const newTitle = document.getElementById('titleInput').value;
        const newDue = document.getElementById('dateInput').value;
        const newColor = document.getElementById('colorInput').value;
        console.log(newTitle + " " + newDue + " " + newColor);
        if (newTitle && newDue && newColor) {
            toggleFormVisibility();
            const newBubble = await addBubbleToTasks(newTitle, newDue, newColor, "needsAction");
            const newDOMBubble = <Bubble
                key={newBubble.id}
                id={newBubble.id}
                title={newTitle}
                due={newDue}
                color={newColor}
                world={props.world}
            />
            props.setBubblesJSX(props.bubblesJSX.concat([newDOMBubble]));
            console.log(props.bubblesJSX);
        }
        else {
            return;
        }
    }

    return (
        // make a flexible grid to hold the button and the form
        <div className='grid grid-flow-row absolute bottom-0 right-0 mx-3 my-11 z-50'>
            <div id='addBubbleForm' className="card w-96 bg-neutral shadow-xl hidden mb-2">
                <div className="card-body">
                    <label className="label">
                        <span className="label-text">Task Title</span>
                    </label>
                    <input id="titleInput" type="text" placeholder="Type here" className="input w-full max-w-xs" />
                    <label className="label">
                        <span className="label-text">Due Date</span>
                    </label>
                    <input id="dateInput" type="date" className="input w-full max-w-xs"></input>
                    <label className="label">
                        <span className="label-text">Color</span>
                    </label>
                    <select id="colorInput" className="select w-full max-w-xs">
                        {options.map(color => <option>{color}</option>)}
                    </select>
                    <button className="btn btn-success mt-6" onClick={() => handleSubmit()}>Create Bubble</button>
                </div>
            </div>

            <label id='addBubbleButton' tabIndex="0" className="btn btn-circle btn-lg place-self-end" onClick={() => toggleFormVisibility()}>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                </svg>
            </label>

        </div>
    );
}

export default AddBubbleForm;
