import { Idea } from "@/model/Idea";
import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
} from "@nextui-org/react";

type Props = {
  idea: Idea;
};

function IdeaCard(props: Props) {
  return (
    <div>
      <Card className="max-w-[400px]">
        <CardHeader className="flex gap-3">
          <Image
            alt="nextui logo"
            height={40}
            radius="sm"
            src="/assets/hyperlane_logo.png"
            width={40}
          />
          <div className="flex flex-col">
            <p className="text-md">{props.idea.title}</p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <p>{props.idea.description}</p>
        </CardBody>
        <Divider />
      </Card>
      {/* <h1> {props.idea.title}</h1>

      <p>{props.idea.description}</p> */}
    </div>
  );
}

export { IdeaCard };
