import React, { useState } from "react";

const Description = ({ description }) => {
  const [open, setopen] = useState(false);
  const handleClick = () => setopen((p) => !p);
  return (
    <div className="w-52">
      {!open && (
        <span className="w-52">
          {description?.substring(0, 50)}
          {description?.length > 55 && "..."}
        </span>
      )}
      {open && <span className="w-52">{description}</span>}
      {!open && description?.length > 55 && (
        <span
          className="cursor-pointer text-sm text-blue-800"
          onClick={handleClick}
        >
          <br />
          See More
        </span>
      )}
      {open && (
        <span
          className="cursor-pointer text-sm text-blue-800"
          onClick={handleClick}
        >
          <br />
          See Less
        </span>
      )}
    </div>
  );
};

export default Description;
