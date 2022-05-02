import classes from "./MeetupItem.module.css";
import Card from "../ui/Card";

function MeetupItem(props) {
  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.image}>
          <img src={props.image} />
        </div>
        <div className={classes.content}>
          <p>{props.description}</p>
        </div>
      </Card>
    </li>
  );
}

export default MeetupItem;
