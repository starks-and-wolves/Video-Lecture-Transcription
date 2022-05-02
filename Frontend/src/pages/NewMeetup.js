import NewMeetupForm from "../components/meetups/NewMeetupForm";
import ImageSlider from "../components/ImageSlider/ImageSlider";

function NewMeetupPage() {
  function addMeetupHandler(meetupData) {}

  return (
    <section>
      <h1>Edit Transcript for Individual Slides</h1>
      <NewMeetupForm onAddMeetup={addMeetupHandler} meetups={ImageSlider} />
    </section>
  );
}

export default NewMeetupPage;
