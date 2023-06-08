import React from "react";

export default function Footer() {
  return (
    <footer className="footer">
      <p className="footer-info">© 2023 Podcast Planet Capstone Project.</p>
      <p className="footer-extra">
        <a href="https://www.flaticon.com/free-icons/bass" title="bass icons">
          Bass icons created by Good Ware - Flaticon
        </a>
      </p>
      <p className="footer-extra">
        Meta Tag Image by{" "}
        <a href="https://unsplash.com/@mattbotsford?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
          {" "}
          Matt Botsford
        </a>{" "}
        on{" "}
        <a href="https://unsplash.com/s/photos/podcast?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
          Unsplash
        </a>
      </p>
      <p className="footer-extra">Icons made by <a href="https://www.flaticon.com/authors/nixxdsgn" title="Nixxdsgn"> Nixxdsgn </a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></p>
    </footer>
  );
}
