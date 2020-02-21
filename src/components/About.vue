<template lang="pug">
  div(class="about_page")
    router-link(tag="button" to="/" class="about_return_button")
    div(class="about_layout")
      section(class="about_facebook_section")
        div(class="about_facebook_qr_code")
        a(href="https://www.facebook.com/NCKUbikefestival/" target="_blank" id="facebook_link_button") Facebook粉絲專頁
      section(class="about_instagram_section")
        div(class="about_instagram_qr_code")
        a(href="https://www.instagram.com/nckubikefestival/" target="_blank" id="instagram_link_button") Instagram粉絲頁面
      section(class="about_website_section")
        div(class="about_website_qr_code")
        a(href="http://nckubikefestival.com/" target="_blank" id="website_link_button") 成大單車節官方網站
      section(class="about_sponsor_section")
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
  /*
    mobile layout css
  */
  @media only screen and (max-width: 551px) {
    .about_page {
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      justify-items: flex-start;
      height: 100vh;
      width: 100vw;
      background: #dad6b2;
      margin: 0;
      padding: 0;
      overflow: hidden;
    }

    .about_layout {
      display: grid;
      grid-template-rows: repeat(3, 1fr);
      grid-template-areas: "facebook"
        "instagram"
        "website";
      justify-content: center;
      align-content: center;
      align-items: center;

      width: 100vw;
      height: 100vh;
      box-sizing: border-box;

      margin: 5vw;
    }

    a {
      text-decoration: none;
      vertical-align: middle;

      box-sizing: border-box;

      background-color: #942323;

      outline: none;
      border: none;

      color: white;

      width: 60vw;
      height: 12vw;
      border-radius: 6vw;

      font-size: 5vw;
      line-height: 12vw;

      cursor: pointer;

      transition: filter .3s ease;

      &:hover {
        filter: brightness(150%);
      }
      &:active {
        filter: brightness(70%);
      }
    }

    .about_facebook_section {
      grid-area: facebook;

      display: grid;
      grid-template-rows: 3fr 1fr;
      grid-template-areas: "facebook_qrcode"
      "facebook_button";
      justify-items: center;
      justify-content: center;
      align-content: center;
      align-items: center;

      box-sizing: border-box;
      padding: 5vw;

      width: 100%;
      height: 100%;
    }

    .about_facebook_qr_code {
      grid-area: facebook_qrcode;

      background-image: url("../assets/about/nckubikefestival-facebook.svg");
      background-repeat: no-repeat;
      background-size: 150% 150%;
      background-position: 50% 50%;

      width: 30vw;
      height: 30vw;
    }

    #facebook_link_button {
      grid-area: facebook_button;
    }

    .about_instagram_section {
      grid-area: instagram;

      display: grid;
      grid-template-rows: 3fr 1fr;
      grid-template-areas: "instagram_qrcode"
      "instagram_button";
      justify-items: center;
      justify-content: center;
      align-content: center;
      align-items: center;

      box-sizing: border-box;
      padding: 5vw;

      width: 100%;
      height: 100%;
    }

    .about_instagram_qr_code {
      grid-area: instagram_qrcode;
      background-image: url("../assets/about/nckubikefestival-instagram.svg");
      background-repeat: no-repeat;
      background-size: 150% 150%;
      background-position: 50% 50%;
      width: 30vw;
      height: 30vw;
    }

    #instagram_link_button {
      grid-area: instagram_button;
    }

    .about_website_section {
      grid-area: website;

      display: grid;
      grid-template-rows: 3fr 1fr;
      grid-template-areas: "website_qrcode"
      "website_button";
      justify-items: center;
      justify-content: center;
      align-content: center;
      align-items: center;

      box-sizing: border-box;
      padding: 5vw;

      width: 100%;
      height: 100%;
    }

    .about_website_qr_code {
      grid-area: website_qrcode;
      background-image: url("../assets/about/nckubikefestival-website.svg");
      background-repeat: no-repeat;
      background-size: 150% 150%;
      background-position: 50% 50%;
      width: 30vw;
      height: 30vw;
    }

    #website_link_button {
      grid-area: website_button;
    }

    .about_return_button {
      position: absolute;
      right: 7vw;
      top: 7vw;

      width: 7.5vw;
      height: 7.5vw;
      background-color: transparent;
      background-image: url("../assets/exit.svg");
      background-repeat: no-repeat;
      background-size: 150% 150%;
      background-position: 50% 50%;

      outline: none;
      border: none;
      filter: brightness(120%);

      cursor: pointer;

      transition: filter .3s ease;

      &:hover {
        filter: brightness(130%);
      }
      &:active {
        filter: brightness(80%);
      }
    }
  }
  /*
    computer layout css
  */
  @media only screen and (min-width: 552px) {
    .about_page {
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      justify-items: flex-start;
      height: 100vh;
      width: 100vw;
      background: #dad6b2;
      margin: 0;
      padding: 0;
      overflow: hidden;
    }

    .about_layout {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: 2fr 1fr;
      grid-template-areas: "facebook instagram website"
        "sponsor sponsor sponsor";
      justify-content: center;
      align-content: center;
      align-items: center;

      width: 100vw;
      height: 100vh;
      box-sizing: border-box;

      padding: 5vw;
    }

    a {
      text-decoration: none;
      line-height: 3vw;
      vertical-align: middle;

      box-sizing: border-box;

      background-color: #942323;

      outline: none;
      border: none;
      border-radius: 2vw;

      color: white;
      font-size: 1vw;

      width: 12vw;
      height: 3vw;

      cursor: pointer;

      transition: filter .3s ease;

      &:hover {
        filter: brightness(150%);
      }
      &:active {
        filter: brightness(70%);
      }
    }

    .about_facebook_section {
      grid-area: facebook;

      display: grid;
      grid-template-rows: 3fr 1fr;
      grid-template-areas: "facebook_qrcode"
      "facebook_button";
      justify-items: center;
      justify-content: center;
      align-content: center;
      align-items: center;

      box-sizing: border-box;
      padding: 5vw;

      width: 100%;
      height: 100%;
    }

    .about_facebook_qr_code {
      grid-area: facebook_qrcode;

      background-image: url("../assets/about/nckubikefestival-facebook.svg");
      background-repeat: no-repeat;
      background-size: 150% 150%;
      background-position: 50% 50%;

      width: 20vw;
      height: 20vw;
    }

    .about_instagram_section {
      grid-area: instagram;

      display: grid;
      grid-template-rows: 3fr 1fr;
      grid-template-areas: "instagram_qrcode"
      "instagram_button";
      justify-items: center;
      justify-content: center;
      align-content: center;
      align-items: center;

      box-sizing: border-box;
      padding: 5vw;

      width: 100%;
      height: 100%;
    }

    .about_instagram_qr_code {
      grid-area: instagram_qrcode;
      background-image: url("../assets/about/nckubikefestival-instagram.svg");
      background-repeat: no-repeat;
      background-size: 150% 150%;
      background-position: 50% 50%;
      width: 20vw;
      height: 20vw;
    }

    .instagram_link_button {
      grid-area: instagram_button;
    }

    .about_website_section {
      grid-area: website;

      display: grid;
      grid-template-rows: 3fr 1fr;
      grid-template-areas: "website_qrcode"
      "website_button";
      justify-items: center;
      justify-content: center;
      align-content: center;
      align-items: center;

      box-sizing: border-box;
      padding: 5vw;

      width: 100%;
      height: 100%;
    }

    .about_website_qr_code {
      grid-area: website_qrcode;
      background-image: url("../assets/about/nckubikefestival-website.svg");
      background-repeat: no-repeat;
      background-size: 150% 150%;
      background-position: 50% 50%;
      width: 20vw;
      height: 20vw;
    }

    .website_link_button {
      grid-area: website_button;
    }

    .about_return_button {
      position: absolute;
      right: 4.2vw;
      top: 3.7vw;

      width: 2.5vw;
      height: 2.5vw;
      background-color: transparent;
      background-image: url("../assets/exit.svg");
      background-repeat: no-repeat;
      background-size: 150% 150%;
      background-position: 50% 50%;

      outline: none;
      border: none;
      filter: brightness(120%);

      cursor: pointer;

      transition: filter .3s ease;

      &:hover {
        filter: brightness(130%);
      }
      &:active {
        filter: brightness(80%);
      }
    }
  }
</style>
