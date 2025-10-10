import React, { FC, useEffect, useState } from "react";

const NoteEditor: FC<{ onSubmit(note: string): void; initNote: string }> = ({
  onSubmit,
  initNote,
}) => {
  const [note, setNote] = useState(initNote);

  useEffect(() => {
    setNote(initNote);
  }, [initNote]);

  return <div>NoteEditor</div>;
};

export default NoteEditor;
