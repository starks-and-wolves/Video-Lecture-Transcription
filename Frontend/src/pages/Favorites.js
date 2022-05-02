import classes from "./Favorites.module.css";

function FavoritesPage() {
  return (
    <div className={classes.control}>
      <label>Full Transcript of the Video uploaded</label>
      <textarea required rows="30"></textarea>
    </div>
  );
}

export default FavoritesPage;
