import { TwitterTimelineEmbed } from "react-twitter-embed";

const Twitter = () => {
  return (
    <TwitterTimelineEmbed
      sourceType="list"
      id="1326048465428729856"
      noFooter
      noBorder
      options={{ tweetLimit: 3 }}
    />
  );
};
export default Twitter;
