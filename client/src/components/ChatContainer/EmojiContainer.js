import React from "react";
import "emoji-mart/css/emoji-mart.css";
import data from "emoji-mart/data/twitter.json";
import { NimblePicker } from "emoji-mart";

const EmojiContainer = ({ styles, onselect, showNative }) => {
  return (
    <NimblePicker
      native={showNative}
      set="twitter"
      data={data}
      onSelect={(emoji) => onselect(emoji)}
      title="send an emoji..."
      emoji="point_up"
      style={styles}
      include={["recent", "smileys", "people"]}
    />
  );
};

export default EmojiContainer;


