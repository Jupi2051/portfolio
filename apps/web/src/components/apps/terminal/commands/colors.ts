import { CommandFunction } from "./types";

const colors: CommandFunction = (outputToTerminal) => {
  outputToTerminal("\x1b[36mCatppuccin Frappe Color Palette\x1b[0m");
  outputToTerminal("\x1b[90mhttps://catppuccin.com/palette/\x1b[0m");
  outputToTerminal("");

  // First row of colors
  outputToTerminal(
    "\x1b[48;2;242;213;207m  \x1b[0m\x1b[48;2;238;190;190m  \x1b[0m\x1b[48;2;244;184;228m  \x1b[0m\x1b[48;2;202;158;230m  \x1b[0m\x1b[48;2;231;130;132m  \x1b[0m\x1b[48;2;234;153;156m  \x1b[0m\x1b[48;2;239;159;118m  \x1b[0m\x1b[48;2;229;200;144m  \x1b[0m"
  );

  // Second row of colors
  outputToTerminal(
    "\x1b[48;2;166;209;137m  \x1b[0m\x1b[48;2;129;200;190m  \x1b[0m\x1b[48;2;153;209;219m  \x1b[0m\x1b[48;2;133;193;220m  \x1b[0m\x1b[48;2;140;170;238m  \x1b[0m\x1b[48;2;186;187;241m  \x1b[0m\x1b[48;2;198;208;245m  \x1b[0m\x1b[48;2;181;191;226m  \x1b[0m"
  );

  outputToTerminal("");
  outputToTerminal("\x1b[33mColor Names:\x1b[0m");
  outputToTerminal(
    "\x1b[38;2;242;213;207mRosewater\x1b[0m \x1b[38;2;238;190;190mFlamingo\x1b[0m \x1b[38;2;244;184;228mPink\x1b[0m \x1b[38;2;202;158;230mMauve\x1b[0m"
  );
  outputToTerminal(
    "\x1b[38;2;231;130;132mRed\x1b[0m \x1b[38;2;234;153;156mMaroon\x1b[0m \x1b[38;2;239;159;118mPeach\x1b[0m \x1b[38;2;229;200;144mYellow\x1b[0m"
  );
  outputToTerminal(
    "\x1b[38;2;166;209;137mGreen\x1b[0m \x1b[38;2;129;200;190mTeal\x1b[0m \x1b[38;2;153;209;219mSky\x1b[0m \x1b[38;2;133;193;220mSapphire\x1b[0m"
  );
  outputToTerminal(
    "\x1b[38;2;140;170;238mBlue\x1b[0m \x1b[38;2;186;187;241mLavender\x1b[0m \x1b[38;2;198;208;245mText\x1b[0m \x1b[38;2;181;191;226mSubtext1\x1b[0m"
  );
};

export default colors;
