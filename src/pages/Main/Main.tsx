import React from 'react';
import Quote from '../../components/Quote/Quote';

/**
 * Main Page for Quotly
 */
const Main = () => {
  return (
    <div>
      <Quote 
        text={`**Daniel zu domi:** "ich kann gerade nicht, meine Hände liegen da drüben"`}
        authorName="Daniel"
        authorAvatarUrl='https://xsgames.co/randomusers/avatar.php?g=male'
        dated="2021-08-26"
      />
    </div>
  );
};

export default Main;