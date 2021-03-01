import { Input } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { NextPage } from "next";
import React, { useState, useEffect } from "react";

const test: NextPage = () => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    console.log("aa");
  });

  return (
    <>
      <div>{count}</div>
      <Button color="inherit" variant="outlined">
        count
      </Button>
      <button
        onClick={() => {
          setCount((prev) => prev + 1);
        }}
      >
        +++
      </button>
      <Input
        value={count}
        onChange={(
          e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
        ) => {
          setCount(+e.target.value);
        }}
      />
    </>
  );
};

export default test;
