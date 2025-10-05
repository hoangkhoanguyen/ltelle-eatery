import React from "react";
import { Button } from "../../ui/button";
import Icon from "@/components/common/Icon";

const Note = () => {
  return (
    <div className="bg-web-secondary-2 lg:bg-web-background-1 rounded-lg p-5">
      <p className="text-web-h4-mobile lg:text-web-h4 text-web-content-2">
        Note (230/300)
      </p>
      <p className="text-web-body-mobile lg:text-web-body text-web-content-2 mb-2.5">
        Crisp romaine lettuce, parmesan cheese, croutons, and Caesar dressing,
        Fresh mozzarella, Crisp romaine lettuce, parmesan cheese, croutons,
        Crisp romaine lettuce, parmesan cheese, croutons MMM.
      </p>
      <Button
        startIcon={<Icon icon="ph:pen" />}
        variant={"secondary1"}
        className="text-web-background-1 text-web-button-mobile lg:text-web-button ms-auto rounded-full"
      >
        Fill in note
      </Button>
    </div>
  );
};

export default Note;
