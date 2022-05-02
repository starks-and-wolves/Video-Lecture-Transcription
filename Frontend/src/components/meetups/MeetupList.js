import MeetupItem from "./MeetupItem";
import classes from "./MeetupList.module.css";

function MeetupList(props) {
  return (
    <ul className={classes.list}>
      {props.meetups.map((meetup) => (
        <MeetupItem
          image={meetup.image}
          description={meetup.description}
        />
      ))}
    </ul>
  );
}

export default MeetupList;
