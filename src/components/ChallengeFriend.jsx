import React from "react";

const ChallengeFriend = () => {
  const handleShare = () => {
    const link = `${window.location.origin}/score`;
    window.open(`https://api.whatsapp.com/send?text=Challenge me at ${link}`);
  };

  return (
    <div>
      <h1>Challenge a Friend</h1>
      <button onClick={handleShare}>Share on WhatsApp</button>
    </div>
  );
};

export default ChallengeFriend;