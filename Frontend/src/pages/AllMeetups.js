import MeetupList from "../components/meetups/MeetupList";
import ImageSlider from "../components/ImageSlider/ImageSlider";

function AllMeetupsPage() {
  return (
    <section>
      <h1>Edited Transcripts for Individual Slides</h1>
      <MeetupList meetups={ImageSlider} />
    </section>
  );
}

export default AllMeetupsPage;
