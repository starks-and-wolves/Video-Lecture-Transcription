import classes from "./NewMeetupItem.module.css";
import Card from "../ui/Card";
import { useRef } from "react";

function NewMeetupItem(props) {
  const descriptionInputRef = useRef();

  function submitHandler(event) {
    event.preventDefault();
    const enteredDescription = descriptionInputRef.current.value;

    props.onAddMeetup(enteredDescription);
  }

  return (
    <li className={classes.item}>
      <div className={classes.control}>
        <label htmlFor="image">Slide Image</label>
      </div>
      <div className={classes.image}>
        <img src={props.image} />
      </div>
      <br></br>
      <div className={classes.control}>
        <label htmlFor="description">Transcript for the Slide</label>
        <textarea id="description" required rows="8" ref={descriptionInputRef}>
          {props.description}
        </textarea>
      </div>
    </li>
  );
}

export default NewMeetupItem;
