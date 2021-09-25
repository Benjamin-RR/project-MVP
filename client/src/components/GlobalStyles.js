import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    :root{
        /* --color-cadmium-red: #D80026;
        --color-alabama-crimson: linear-gradient(0deg, rgba(0,0,0,1) 30%, rgba(0,180,173,1) 50%, rgba(0,0,0,1) 70%);
        --color-orange: black;

        --color-selective-yellow: black;
        --color-desert-sand: #E3C4A6;
        --font-heading: 'Permanent Marker', Arial, Helvetica, sans-serif;
        --font-body: 'Kosugi', Arial, Helvetica, sans-serif;
        --padding-page: 24px;
        --neon:
        0 0 7px #fff,
        0 0 21px #fff,
        0 0 82px #0fa,
        0 0 151px #0fa;
        --neon-red: 
        0 0 7px #fff,
        0 0 21px #fff,
        0 0 82px #ff4d4d,
        0 0 151px #ff0000; */
    }

    html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed,
    figure, figcaption, footer, header, hgroup,
    menu, nav, output, ruby, section, summary,
    time, mark, audio, video {
        margin: 0;
        padding: 0;
        border: 0;
        color: black;
        box-sizing: border-box;
        font-size: 100%;
        vertical-align: baseline;
    }
    /* HTML5 display-role reset for older browsers */
    article, aside, details, figcaption, figure,
    footer, header, hgroup, menu, nav, section {
        display: block;
    }
    body {
        line-height: 1;
    }
    ol, ul {
        list-style: none;
    }
    blockquote, q {
        quotes: none;
    }
    blockquote:before, blockquote:after,
    q:before, q:after {
        content: '';
        content: none;
    }

    h1,
    h2,
    h3,
    label,
    button {
    color: #fff;
    font-family: var(--font-heading);
    /* text-shadow: var(--neon); */
    font-size: 32px;
    text-align: center;
    }
    p,
    a,
    li,
    blockquote,
    input {
    font-family: var(--font-body);
    }

    input {
        font-size: 24px;
        height: 42px;
        border: 2px solid var(--color-orange);
        border-radius: 4px;
        padding: 0 12px;
    }





`