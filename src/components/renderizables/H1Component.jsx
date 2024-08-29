/* import React, { useState } from 'react'; */
import { defaultProps } from "@blocknote/core";
import { createReactBlockSpec } from "@blocknote/react";
import { MdAccessibility } from "react-icons/md";

export const H1Editor = createReactBlockSpec(
  {
    type: "h1_test",      
    propSchema: {        
      textAlignment: defaultProps.textAlignment,
      textColor: defaultProps.textColor,
    },
    content: "inline",       
  },
  {
    render: (props) => {
      
      return (
        <div>
          <div
            className={
              "inline-content text-4xl font-bold outline-none focus:outline-none w-full"
            }
            ref={props.contentRef}
          />         
        </div>
      );
    },
  }
);
