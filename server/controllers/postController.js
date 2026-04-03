import prisma from "../utils/prisma.js";

export const generatePost = async (req, res) => {
  try {
    const { prompt, orgName } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const fakeResult = {
      headline: "Study Social This Wednesday",
      subheadline: "Bring your friends, get work done, and hang out",
      cta: "Join us from 6–8 PM in FGH 300",
      caption:
        "Need a midweek reset? Come to our Study Social this Wednesday from 6–8 PM in FGH 300.",
      hashtags: ["#StudySocial", "#StudentLife", "#CampusEvents"],
      designStyle: "modern collegiate flyer",
    };

    const savedPost = await prisma.postRequest.create({
      data: {
        prompt,
        orgName,
        headline: fakeResult.headline,
        subheadline: fakeResult.subheadline,
        cta: fakeResult.cta,
        caption: fakeResult.caption,
        hashtags: fakeResult.hashtags,
        designStyle: fakeResult.designStyle,
      },
    });

    res.json(savedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to generate post" });
  }
};