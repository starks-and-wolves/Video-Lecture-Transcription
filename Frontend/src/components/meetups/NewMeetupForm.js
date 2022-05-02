import classes from "./NewMeetupForm.module.css";
import NewMeetupItem from "./NewMeetupItem";

function NewMeetupForm(props) {
  function submitHandler(event) {}

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <ul className={classes.list}>
        {props.meetups.map((meetup) => (
          <NewMeetupItem
            image={meetup.image}
            description={meetup.description}
          />
        ))}
      </ul>
      <div className={classes.actions}>
        <button>Update</button>
      </div>
    </form>
  );
}

export default NewMeetupForm;
