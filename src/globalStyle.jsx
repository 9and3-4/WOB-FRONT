import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
    ${reset}
  :root {
    --MINT : #04BF8A;
    --PINK : #FF6482;
    --BLACK : #353535;
    --WHITE: #FFFFFF;
    --GRAY : #EEEEEE;
  }


  * {
      box-sizing: border-box;
    }

    .container {
        margin: 0 auto;
    }

`;

export default GlobalStyle;