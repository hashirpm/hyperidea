import { Idea } from "@/model/Idea";

type Props = {
  idea: Idea;
};

function IdeaCard(props: Props) {
  return (
    <div>
      <h1> {props.idea.title}</h1>

      <p>{props.idea.description}</p>
    </div>
  );
}

export { IdeaCard };
